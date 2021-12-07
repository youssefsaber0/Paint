import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { EventHandler } from './ControlUnit/eventHandling/EventHandler';
import { ShapeFactory } from './Factories/ShapeFactory';
import { Canvas } from './structure/Canvas';
import { Mode} from './structure/enums/enums';
import {State} from './ControlUnit/State';
import { Style } from './ControlUnit/Style';
import { point } from './structure/drawables/path/point';
import { circle } from './structure/drawables/shapes/circle';
import { line } from './structure/drawables/shapes/line';
import { rectangle } from './structure/drawables/shapes/rectangle';
import { ShapeInfo } from './structure/drawables/shapes/ShapeInfo';
import { Drawer } from './structure/Drawer';
import { IDrawer } from './structure/IDrawer';

 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  /** Template reference to the canvas element */
  @ViewChild('canvas')
  canE!: ElementRef;

  
  title: string="my-paint";
  

  context!: CanvasRenderingContext2D;
  offsetx!: number;
  offsety!: number;
  Factory!: ShapeFactory;
  Drawer!: IDrawer;
  EHandler!:EventHandler;
  state!:State;
  style!:Style;
  Mode=Mode;

  constructor() {    
    this.Factory=new ShapeFactory();
    this.state=new State();
     this.state.width=1800;
    this.state.height=1800;
    this.Drawer= new Drawer(this.state.width,this.state.height,this.state.BackgroundColor);
    this.state.type="rectangle";
    this.style=new Style(2,false,true,"black","white");
    this.EHandler=new EventHandler();
    this.EHandler.InjectStatic(this.state,this.style,this.Drawer,this.Factory);    
  }
  public innerWidth: any;
  public innerHeight: any;
  ngOnInit() {
    
  }
  ngAfterViewInit() {
   
    // this.Factory=new ShapeFactory();
    this.UpdateCanvasSize();
    this.offsetx=(this.canE.nativeElement as HTMLCanvasElement).offsetLeft+2;
    this.offsety=(this.canE.nativeElement as HTMLCanvasElement).offsetTop+2;
    this.context = <CanvasRenderingContext2D>(this.canE.nativeElement as HTMLCanvasElement).getContext('2d');
    var C=new Canvas();
    this.EHandler.InjectView(this.context,this.offsetx,this.offsety);
    
    // this.canE.nativeElement.addEventListener('mousedown',MouseDown,false);
    // this.canE.nativeElement.addEventListener('mousemove',MouseMove,false);
    document.addEventListener('keydown',this.KeyDown.bind(this),false);
    let r=new rectangle();
    var c=new circle();
    var l=new line();
    let Si=new ShapeInfo(new point(20,30),new point(200,130),3,false,true,'black','blue');
    let Si2=new ShapeInfo(new point(30,40),new point(220,100),3,false,true,'black','blue');
    r.feedInfo(Si);
    c.feedInfo(Si2);
    l.feedInfo(Si);
    
    this.Drawer.getCanvas().AddShape(r);
    this.Drawer.getCanvas().AddShape(c);
    this.Drawer.getCanvas().AddShape(l);

    this.Drawer.DrawOnContext(this.context);
    
    // this.mode=Mode.Selecting;
    // this.type="path";
    // this.canvas=this.canE;
    // context.fillStyle = 'white';
    // context.fillRect(0,0,canvas.nativeElement.width,canvas.nativeElement.height);
  }
  UpdateCanvasSize() {
    (this.canE.nativeElement as HTMLCanvasElement).width=this.state.width;
    (this.canE.nativeElement as HTMLCanvasElement).height=this.state.height;
  }
  setMode(mde:string,vlue:string){
    if(mde==="Creating"){
     console.log("in if");
     this.state.mode =Mode.Creating;
     this.state.type=vlue;
   }
   else if(mde==="Selecting"){
     console.log('in select');
     this.state.mode=Mode.Selecting;
   }
 }


  //events:
  // setMode(mode:number,type?:string){
  //   switch(mode){
  //     case 0:
  //       this.state.mode=Mode.Creating;
  //       break;
  //     case 1:
  //       this.state.mode=Mode.Selecting;
  //       break;
  //     case 2:
  //       this.state.mode=Mode.Modifying;
  //       break;
  //   }
  //   this.state.mode=mode;
  //   if(type){
  //     this.state.type=type;
  //   }
  // }
  //canvas MouseEvents:
  //already connected with the canvas don't worry about it:
  Mouse(e:MouseEvent,type:number){
    switch(type){
      case 0:
        this.EHandler.MouseDown(e,window.scrollX,window.scrollY);
        break;
      case 1:
        this.EHandler.MouseMove(e,window.scrollX,window.scrollY,window.innerWidth,window.innerHeight);
        break;
      case 2:
        this.EHandler.MouseUp(e,window.scrollX,window.scrollY);
        break;
      default:
        throw Error("???");
    }
  }

  Resize(w:number,h:number){
    this.state.width=w;
    this.state.height=h;
    this.UpdateCanvasSize();
  }
  SetOcolor(color:string){
    this.style.Ocolor=color;
  }
  //delete key event
  KeyDown(e:KeyboardEvent){
    let keyName = e.key;
    if(e.key==='Delete'||e.key==="D"||e.key==="d"){
      if(this.state.selecting){
        console.log("delete"); 
        this.Drawer.getCanvas().RemoveShape(this.state.index);
        this.Drawer.DrawOnContext(this.context);
        this.state.selecting=false;
    }
  }
}

  //and so on ... (all u need to change is in the [this.State] object and the [this.Style] object just like i did above )

}
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
      this.innerWidth = window.scrollY;
      this.innerHeight = window.scrollX;

  }
  ngAfterViewInit() {
   
    // this.Factory=new ShapeFactory();
    (this.canE.nativeElement as HTMLCanvasElement).width=this.state.width;
    (this.canE.nativeElement as HTMLCanvasElement).height=this.state.height;
    this.offsetx=(this.canE.nativeElement as HTMLCanvasElement).offsetLeft+2;
    this.offsety=(this.canE.nativeElement as HTMLCanvasElement).offsetTop+2;
    this.context = <CanvasRenderingContext2D>(this.canE.nativeElement as HTMLCanvasElement).getContext('2d');
    var C=new Canvas();
    this.EHandler.InjectView(this.context,this.offsetx,this.offsety);
    
    // this.canE.nativeElement.addEventListener('mousedown',MouseDown,false);
    // this.canE.nativeElement.addEventListener('mousemove',MouseMove,false);
    // this.canE.nativeElement.addEventListener('mouseup',MouseUp,false);
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
  setMode(mode:number,type?:string){
    switch(mode){
      case 0:
        this.state.mode=Mode.Creating;
        break;
      case 1:
        this.state.mode=Mode.Selecting;
        break;
      case 2:
        this.state.mode=Mode.Modifying;
        break;
    }
    this.state.mode=mode;
    if(type){
      this.state.type=type;
    }
  }
  Mouse(e:MouseEvent,type:number){
    switch(type){
      case 0:
        console.log(window.scrollX);
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
}
  /**
   * Draws something using the context we obtained earlier on
  //  */
  // public update(startingX: number,startingY: number,endX: number,endY: number){
  //   //if(context==null){console.log("null context");return;}
  //   context.fillStyle = 'green';
  //   context.fillRect(0,0,canvas.nativeElement.width,canvas.nativeElement.height);
    
  //   context.beginPath();
  //   context.moveTo(startingX,startingY);
  //   context.lineTo(endX,endY);
  //   context.stroke();
  // }
  // private start(event: { clientX: number; clientY: number; }) {
  //     this.x=event.clientX-offsetx;
  //     this.y=event.clientY-offsety;
  //     //-(canvas.nativeElement as HTMLCanvasElement).offsetTop;
  //     console.log("start: ",this.x,this.y);
  //     this.drawing=true;
      
  //     // if(r.Contains(this.x-8,this.y-8,0)){
  //     //   console.log("yesss");
  //     // }
  //     // else{
  //     //   console.log("nope");
  //     // }
      
  //   }
  //   //call this method while editing or creating :
  //   private startDrawing(event: { clientX: number; clientY: number; }) {
  //     if(this.drawing){
        
  //       //  draw every thing except for the object being creeated or edited
  //       //  change the object's position
  //       //  draw this object
        
        
  //     }
      
  //   }
  //   private stopDrawing(event: { clientX: number; clientY: number; }) {
  //     if(this.drawing){
  //       console.log(event.clientX,event.clientY);
  //       this.drawing=false;
  //     }
  //   }
    
    
    
    
  // }
  
  // function draw(shape:drawable){
  //   if(shape&&context){
  //     shape.DrawOnContext(context);
  //   }
  // }


  /*import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
  
  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
  export class AppComponent implements AfterViewInit {
    @ViewChild('canvas')
    canvas!: ElementRef<HTMLCanvasElement>;
  
    context!: CanvasRenderingContext2D|null;
    constructor(){}
  
  
    ngAfterViewInit(): void {
      if(canvas==undefined){console.log("undefined canvas");return;}
      context = (canvas.nativeElement as HTMLCanvasElement).getContext('2d');    
      canvas.nativeElement.width=400;
      canvas.nativeElement.height=400;
    }
  }
  
  
  
  
  
  let drawing=false;
  var x=0;
  var y=0;
  //canvas.addEventListener('touchstart',start,false);
  //canvas.addEventListener('touchmove',startDrawing,false);
  
  canvas.addEventListener('mousedown',start,false);
  canvas.addEventListener('mousemove',startDrawing,false);
  canvas.addEventListener('mouseup',stopDrawing,false);
  
  function start(event: { clientX: number; clientY: number; }) {
    x=event.clientX;
    y=event.clientY;
    drawing=true;  
  }
  
  function update(startingX: number,startingY: number,endX: number,endY: number){
    if(context==null){console.log("null context");return;}
    context.fillStyle = 'green';
    context.fillRect(0,0,canvas.width,height);
    
    context.beginPath();
    context.moveTo(startingX,startingY);
    context.lineTo(endX,endY);
    context.stroke();
    }
  function startDrawing(context:CanvasRenderingContext2D,event: { clientX: number; clientY: number; }) {
    if(drawing){
      update(context,x,y,event.clientX,event.clientY);
    }
  
  }
  
  
  function stopDrawing(event: { clientX: number; clientY: number; }) {
    if(drawing){
      console.log(event.clientX,event.clientY);
      drawing=false;
    }
  }
  */
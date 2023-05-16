import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { last } from 'rxjs';
import { drawable } from './drawables/drawable';
import { path } from './drawables/path/path';
import { point } from './drawables/path/point';
import { circle } from './drawables/shapes/circle';
import { IShape } from './drawables/shapes/IShape';
import { line } from './drawables/shapes/line';
import { rectangle } from './drawables/shapes/rectangle';
import { ShapeFactory } from './ShapeFactory/ShapeFactory';
import { Canvas } from './structure/Canvas';
import { Drawing } from './structure/Drawing';
import { ICanvas } from './structure/ICanvas';
import { IDrawing } from './structure/IDrawing';
enum Mode{Creating,Selecting,Modifying}
enum SelectionMode{centre,firstpoint,secondpoint,edge}

var Factory:ShapeFactory;
var offsetx:number;
var offsety:number;
var context: CanvasRenderingContext2D;
var canvas:ElementRef;
var Drawer:IDrawing;
var width:number;
var height:number;
var BackgroundColor:string;
var mode:Mode;
var Smode:SelectionMode;
var type:string;
var current:drawable;
var selected:drawable;
var index:number;
var edge:number;
var drawing:boolean;
var selecting:boolean;
var tol:number = 6;
var x:number,y:number;

function MouseDown(e:MouseEvent){
  if(mode==Mode.Creating){
    drawing=true;
    current=Factory.Create(type,e.clientX-offsetx,e.clientY-offsety);
    current.DrawOnContext(context);
    Drawer.getCanvas().AddShape(current);
  }
  else if(mode==Mode.Modifying){

  }
  else if(mode==Mode.Selecting && selecting){
      highlight(selected,context,"selecting");
      mode=Mode.Modifying;
  }

}


function MouseMove(e: { clientX: number; clientY: number; }){
  if(mode==Mode.Creating&&drawing){
    if(!type.localeCompare("path")){
      (current as path).AddPoint(e.clientX-offsetx,e.clientY-offsety);
    }
    else{
      (current as IShape).moveSecondPoint(e.clientX-offsetx,e.clientY-offsety);
    }
    Drawer.DrawOnContext(context);
    console.log("moving");
  }
  else if(mode==Mode.Modifying){
    if(Smode==SelectionMode.centre){
      if(selected.type.localeCompare("line")==0){
        (selected as IShape).move(e.clientX-offsetx-x,e.clientY-offsety-y);
        x=e.clientX-offsetx;
        y=e.clientY-offsety;
      }
      else{
        (selected as IShape).move(e.clientX-offsetx,e.clientY-offsety);
      }
    }
    if(Smode==SelectionMode.firstpoint){
      (selected as IShape).moveFirstPoint(e.clientX-offsetx,e.clientY-offsety);
    }
    if(Smode==SelectionMode.secondpoint){
      (selected as IShape).moveSecondPoint(e.clientX-offsetx,e.clientY-offsety);
    }
    if(Smode==SelectionMode.edge){
      (selected as rectangle).moveEdge(edge,e.clientX-offsetx-x,e.clientY-offsety-y);
      x=e.clientX-offsetx;
      y=e.clientY-offsety;
    }
    Drawer.DrawOnContext(context);
    highlight(selected,context,"modifying");
    //highlight(selected,context,"selecting");
   
  }
  else if(mode==Mode.Selecting){
    var found=Drawer.getCanvas().getShape(e.clientX-offsetx,e.clientY-offsety,tol+4);
    if(found.length>0){
      var shape;
      var sure = false;
      var i=0;
      for(i;i<found.length&&!sure;i++){
        shape=found[i].shape;
        switch (shape.type){
          case "line":
            x=e.clientX-offsetx;y=e.clientY-offsety;
            if((selected as line).isNearFirstPoint(e.clientX-offsetx,e.clientY-offsety,tol)){
              Smode=SelectionMode.firstpoint;
              sure=true;
            }
            else if((selected as line).isNearSecondPoint(e.clientX-offsetx,e.clientY-offsety,tol)){
              Smode=SelectionMode.secondpoint;
              sure=true;
            }
            else{
              Smode=SelectionMode.centre;
              sure=true;
            }
            break;
            case "rectangle":
              if((shape as rectangle).isNearFirstPoint(e.clientX-offsetx,e.clientY-offsety,tol+3)){
                Smode=SelectionMode.firstpoint;
                sure=true;
            }
            else if((shape as rectangle).isNearSecondPoint(e.clientX-offsetx,e.clientY-offsety,tol+3)){
              Smode=SelectionMode.secondpoint;
              sure=true;            }
              else{
                var num=(shape as rectangle).isNearEdge(e.clientX-offsetx,e.clientY-offsety,tol);
                if(num!=-1){
                  x=e.clientX-offsetx;y=e.clientY-offsety;
                  Smode=SelectionMode.edge;
                  edge=num;
                  sure=true;
                }
                else if((shape as rectangle).isNearCentre(e.clientX-offsetx,e.clientY-offsety,tol+4)){
                  Smode=SelectionMode.centre;
                  sure=true;
                }
              }
              break;
              case "circle":
                if((shape as circle).isNearSecondPoint(e.clientX-offsetx,e.clientY-offsety,tol+3)){
                  Smode=SelectionMode.secondpoint;
                  sure=true;
                }
                else if((shape as circle).isNearFirstPoint(e.clientX-offsetx,e.clientY-offsety,tol+4)){
                  Smode=SelectionMode.firstpoint;
                  sure=true;
                }
                else if((shape as circle).isNearCentre(e.clientX-offsetx,e.clientY-offsety,tol+4)){
                  Smode=SelectionMode.centre;
                  console.error("center!");
                  sure=true;
                }
            break;
            case "path":
              sure=true;
              break;
          }
        }
        Drawer.DrawOnContext(context);
        for(var ind=0 ;ind<found.length;ind++){
          highlight(found[ind].shape,context,"hovering");
          highlight(found[ind].shape,context,"selecting");
          
        }
        if(sure){
          selecting=true;
          selected=found[i-1].shape;
          index=found[i-1].index;
        }
        else{
          selecting=false;
        }
    }
    else{
      Drawer.DrawOnContext(context);
      selecting=false;
    }
  }
}

function MouseUp(e:MouseEvent){
  if(mode==Mode.Creating && drawing){
    drawing=false;
  }
  else if(mode==Mode.Modifying){
    mode=Mode.Selecting;
    selecting=false;
  }
  else if(mode==Mode.Selecting ){
    //do nothing
  }
}
function highlight(current: drawable, context: CanvasRenderingContext2D,type:string) {
  var points:point[]=[];
  var i=0;
  switch(current.type){
    case "line":
      points[i]=new point((current as line).x,(current as line).y);i++;
      points[i]=new point((current as line).m,(current as line).n);
      break;
    case "circle":
      points[i]=new point((current as circle).x,(current as circle).y);i++;

      break;
    case "rectangle":
      points[i]=new point((current as rectangle).x,(current as rectangle).y);i++;
      points[i]=new point((current as rectangle).m,(current as rectangle).n);i++;
      points[i]=new point((points[0].x+points[1].x)/2,(points[0].y+points[1].y)/2);i++
      break;
    default:
      break;
  }
  switch(type){
    case "hovering":
      context.lineWidth=1;
      context.strokeStyle="grey";
      for(var i=0;i<points.length;i++){
        context.beginPath();
        context.arc(points[i].x,points[i].y,8,0,2*Math.PI);
        context.stroke();
      }
      break;
    case "modifying":
      // context.lineWidth=2;
      switch(Smode){
        case SelectionMode.centre:
          if(current.type=="rectangle"){
            context.strokeStyle='green';
            context.lineWidth=2;
            context.beginPath();
            context.arc(points[2].x,points[2].y,8,0,2*Math.PI);
            context.stroke();
          }
          break;
        case SelectionMode.edge:
          var l:line;
          switch(edge){
            case 0:
              l=new line(false,points[0].x,points[0].y,points[0].x,points[1].y,(current as rectangle).lineWidth,"green") ;
              break;
            case 2:
              l=new line(false,points[1].x,points[0].y,points[1].x,points[1].y,(current as rectangle).lineWidth,"green") ;
              break;
            case 1:
              l=new line(false,points[0].x,points[0].y,points[1].x,points[0].y,(current as rectangle).lineWidth,"green") ;
              break;
            case 3:
              l=new line(false,points[0].x,points[1].y,points[1].x,points[1].y,(current as rectangle).lineWidth,"green") ;
              break;
            default:
              throw Error("..?");
          }
          l.DrawOnContext(context);
          break;
        
        case SelectionMode.firstpoint:
          context.strokeStyle='green';
          context.lineWidth=1;
          context.beginPath();
          context.arc(points[0].x,points[0].y,8,0,2*Math.PI);
          context.stroke();
          break;
        case SelectionMode.secondpoint:
          if(!current.type.localeCompare("circle")){
            break;
          }
          context.strokeStyle='green';
          context.lineWidth=1;
          context.beginPath();
          context.arc(points[1].x,points[1].y,8,0,2*Math.PI);
          context.stroke();
          break;
        
      }
      break;

    case "selecting":
      context.strokeStyle="green";
      context.lineWidth=1;
      switch(current.type){
        case "circle":
          context.beginPath();
          context.arc(points[0].x,points[0].y,(current as circle).radius-((current as circle).lineWidth/2)-3,0,(0.2)*Math.PI);
          context.stroke();
          context.beginPath();
          context.arc(points[0].x,points[0].y,(current as circle).radius-((current as circle).lineWidth/2)-3,Math.PI,(1.2)*Math.PI);
          context.stroke();

          context.beginPath();
          context.moveTo(points[0].x-2,points[0].y);
          context.lineTo(points[0].x+2,points[0].y);
          context.moveTo(points[0].x,points[0].y-2);
          context.lineTo(points[0].x,points[0].y+2);
          context.stroke();
          break;
        case "rectangle":
          context.beginPath();
          context.moveTo(points[2].x-2,points[2].y);
          context.lineTo(points[2].x+2,points[2].y);
          context.moveTo(points[2].x,points[2].y-2);
          context.lineTo(points[2].x,points[2].y+2);
          context.stroke();
          break;
        case "line":
          context.beginPath();
          context.moveTo(points[0].x,points[0].y);
          context.lineTo(points[1].x,points[1].y);
          context.stroke();
          break;
      }
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  /** Template reference to the canvas element */
  @ViewChild('canvas')
  canE!: ElementRef;
  
  /** Canvas 2d context */
  private drawing:boolean;
  title: string="my-paint";
  
  // private offsetx!:number;
  // private offsety!:number;
  
  constructor() {
    this.drawing=false;
    
  }
  ngOnInit(){
  }
   setMode(){
    mode =Mode.Creating;
    type="rectangle";
  }
  ngAfterViewInit() {

    width=1800;
    height=1800;
    BackgroundColor='white';
    (this.canE.nativeElement as HTMLCanvasElement).width=width;
    (this.canE.nativeElement as HTMLCanvasElement).height=height;
    offsetx=(this.canE.nativeElement as HTMLCanvasElement).offsetLeft+8;
    offsety=(this.canE.nativeElement as HTMLCanvasElement).offsetTop+8;
    context = <CanvasRenderingContext2D>(this.canE.nativeElement as HTMLCanvasElement).getContext('2d');
    Factory=new ShapeFactory();
    var C=new Canvas();
    C.AddShape(new rectangle(false,100,100,230,220,6,"black"));
    C.AddShape(new line(false,0,0,40,20,6,"black"));
    C.AddShape(new circle(false,100,100,40,20,2,"black"));
    C.AddShape(new circle(false,0,0,40,20,2,"black"));
    Drawer=new Drawing(width,height,BackgroundColor,C);
    Drawer.DrawOnContext(context);

    this.canE.nativeElement.addEventListener('mousedown',MouseDown,false);
    this.canE.nativeElement.addEventListener('mousemove',MouseMove,false);
    this.canE.nativeElement.addEventListener('mouseup',MouseUp,false);
    mode=Mode.Selecting;
    type="path";
    canvas=this.canE;
    // context.fillStyle = 'white';
    // context.fillRect(0,0,canvas.nativeElement.width,canvas.nativeElement.height);
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
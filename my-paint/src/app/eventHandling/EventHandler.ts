import { drawable } from "../drawables/drawable";
import { path } from "../drawables/path/path";
import { point } from "../drawables/path/point";
import { circle } from "../drawables/shapes/circle";
import { IShape } from "../drawables/shapes/IShape";
import { line } from "../drawables/shapes/line";
import { rectangle } from "../drawables/shapes/rectangle";
import { ShapeInfo } from "../drawables/shapes/ShapeInfo";
import { ShapeFactory } from "../Factories/ShapeFactory";
import { Mode,SelectionMode } from "../structure/enums/enums";
import { IDrawing } from "../structure/IDrawing";
import { State } from "../structure/State";
import { Style } from "../structure/Style";

export class EventHandler{
    state!:State;
    style!:Style;
    Drawer!:IDrawing;
    context!:CanvasRenderingContext2D;
    Factory!:ShapeFactory;
    offsetx!:number;offsety!:number;

    InjectStatic(state:State,style:Style,Drawer:IDrawing,Factory:ShapeFactory){
        this.state=state;
        this.Drawer=Drawer;
        this.Factory=Factory;
        this.style=style;
    }
    InjectView(context:CanvasRenderingContext2D,offsetx:number,offsety:number){
   
        this.context=context;
        this.offsetx=offsetx;
        this.offsety=offsety;
    }
    MouseDown(e:MouseEvent){
        if(this.state.mode==Mode.Creating){
          this.state.drawing=true;
          var p1=new point(e.clientX-this.offsetx,e.clientY-this.offsety);
          var si=new ShapeInfo(p1,p1,this.style.lineWidth,this.style.F,this.style.O,this.style.Ocolor,this.style.Fcolor);
          this.state.current=this.Factory.Create(this.state.type);
          this.state.current.feedInfo(si);
          this.state.current.DrawOnContext(this.context);
          this.Drawer.getCanvas().AddShape(this.state.current);
        }
        else if(this.state.mode==Mode.Modifying){
      
        }
        else if(this.state.mode==Mode.Selecting){
            if(this.state.hovering){
                this.state.selecting=true;
                this.state.selected=this.state.current;
                this.state.index=this.state.i;
                this.Drawer.DrawOnContext(this.context);
                this.highlight(this.state.selected,this.context,"selecting");
                this.highlight(this.state.selected,this.context,"hovering");

                this.state.hovering=false;
            }
            else if(this.state.modifying){
                this.state.selecting=true;
                this.state.selected=this.state.current;
                this.state.index=this.state.i;
                this.Drawer.DrawOnContext(this.context);
                this.highlight(this.state.selected,this.context,"selecting");
                this.highlight(this.state.selected,this.context,"hovering");

                this.state.mode=Mode.Modifying;
            }
            else{
                this.state.selecting=false;
                this.Drawer.DrawOnContext(this.context);
            }
        }
    }
    MouseMove(e:MouseEvent){
        if(this.state.mode==Mode.Creating&&this.state.drawing){
          if(!this.state.type.localeCompare("path")){
            (this.state.current as path).AddPoint(e.clientX-this.offsetx,e.clientY-this.offsety);
          }
          else{
            (this.state.current as IShape).moveSecondPoint(e.clientX-this.offsetx,e.clientY-this.offsety);
          }
          this.Drawer.DrawOnContext(this.context);
          console.log("moving");
        }
        else if(this.state.mode==Mode.Modifying){
          if(this.state.Smode==SelectionMode.centre){
            if(this.state.selected.type.localeCompare("line")==0){
              (this.state.selected as IShape).move(e.clientX-this.offsetx-this.state.x,e.clientY-this.offsety-this.state.y);
              this.state.x=e.clientX-this.offsetx;
              this.state.y=e.clientY-this.offsety;
            }
            else{
              (this.state.selected as IShape).move(e.clientX-this.offsetx,e.clientY-this.offsety);
            }
          }
          if(this.state.Smode==SelectionMode.firstpoint){
            (this.state.selected as IShape).moveFirstPoint(e.clientX-this.offsetx,e.clientY-this.offsety);
          }
          if(this.state.Smode==SelectionMode.secondpoint){
            (this.state.selected as IShape).moveSecondPoint(e.clientX-this.offsetx,e.clientY-this.offsety);
          }
          if(this.state.Smode==SelectionMode.edge){
            (this.state.selected as rectangle).moveEdge(this.state.edge,e.clientX-this.offsetx-this.state.x,e.clientY-this.offsety-this.state.y);
            this.state.x=e.clientX-this.offsetx;
            this.state.y=e.clientY-this.offsety;
          }
          this.Drawer.DrawOnContext(this.context);
          this.highlight(this.state.selected,this.context,"modifying");
          this.highlight(this.state.selected,this.context,"selecting");
        }
        else if(this.state.mode==Mode.Selecting){
            if(this.state.selecting){
              if(this.state.selected.Contains(e.clientX-this.offsetx,e.clientY-this.offsety,this.state.tolerance+4)){ 
                shape=this.state.selected;
                var sure1=false;
                switch (shape.type){
                  case "line":
                    this.state.x=e.clientX-this.offsetx;
                    this.state.y=e.clientY-this.offsety;
                    if((this.state.selected as line).isNearFirstPoint(e.clientX-this.offsetx,e.clientY-this.offsety,this.state.tolerance)){
                      this.state.Smode=SelectionMode.firstpoint;
                      sure1=true;
                    }
                    else if((this.state.selected as line).isNearSecondPoint(e.clientX-this.offsetx,e.clientY-this.offsety,this.state.tolerance)){
                      this.state.Smode=SelectionMode.secondpoint;
                      sure1=true;
                    }
                    else{
                      this.state.Smode=SelectionMode.centre;
                      sure1=true;
                    }
                    break;
                    case "rectangle":
                      if((shape as rectangle).isNearFirstPoint(e.clientX-this.offsetx,e.clientY-this.offsety,this.state.tolerance+3)){
                        this.state.Smode=SelectionMode.firstpoint;
                        sure1=true;
                    }
                    else if((shape as rectangle).isNearSecondPoint(e.clientX-this.offsetx,e.clientY-this.offsety,this.state.tolerance+3)){
                      this.state.Smode=SelectionMode.secondpoint;
                      sure1=true;            
                    }
                      else{
                        var num=(shape as rectangle).isNearEdge(e.clientX-this.offsetx,e.clientY-this.offsety,this.state.tolerance);
                        if(num!=-1){
                          this.state.x=e.clientX-this.offsetx;this.state.y=e.clientY-this.offsety;
                          this.state.Smode=SelectionMode.edge;
                          this.state.edge=num;
                          sure1=true;
                        }
                        else if((shape as rectangle).isNearCentre(e.clientX-this.offsetx,e.clientY-this.offsety,this.state.tolerance+4)){
                          this.state.Smode=SelectionMode.centre;
                          sure1=true;
                        }
                      }
                      break;
                      case "circle":
                        if((shape as circle).isNearSecondPoint(e.clientX-this.offsetx,e.clientY-this.offsety,this.state.tolerance+3)){
                          this.state.Smode=SelectionMode.secondpoint;
                          sure1=true;
                        }
                        else if((shape as circle).isNearFirstPoint(e.clientX-this.offsetx,e.clientY-this.offsety,this.state.tolerance+4)){
                          this.state.Smode=SelectionMode.firstpoint;
                          sure1=true;
                        }
                        else if((shape as circle).isNearCentre(e.clientX-this.offsetx,e.clientY-this.offsety,this.state.tolerance+4)){
                          this.state.Smode=SelectionMode.centre;
                          console.error("center!");
                          sure1=true;
                        }
                    break;
                    case "path":
                      sure1=true;
                      break;
                  }
                  if(sure1){
                    this.state.modifying=true;
                    this.state.hovering=false;
                    this.state.current=this.state.selected;
                    this.state.i=this.state.index;

                    return;
                  }
                  else{
                    this.highlight(this.state.selected,this.context,"hovering");
                    this.highlight(this.state.selected,this.context,"selecting");
                  }
                  
              }
            }
            var found=this.Drawer.getCanvas().getShape(e.clientX-this.offsetx,e.clientY-this.offsety,this.state.tolerance+4);
            if(found.length>0){
              var shape;
              var sure = false;
              var i=0;
              for(i;i<found.length&&!sure;i++){
                shape=found[i].shape;
                switch (shape.type){
                  case "line":
                    this.state.x=e.clientX-this.offsetx;
                    this.state.y=e.clientY-this.offsety;
                    if((this.state.selected as line).isNearFirstPoint(e.clientX-this.offsetx,e.clientY-this.offsety,this.state.tolerance)){
                      this.state.Smode=SelectionMode.firstpoint;
                      sure=true;
                    }
                    else if((this.state.selected as line).isNearSecondPoint(e.clientX-this.offsetx,e.clientY-this.offsety,this.state.tolerance)){
                      this.state.Smode=SelectionMode.secondpoint;
                      sure=true;
                    }
                    else{
                      this.state.Smode=SelectionMode.centre;
                      sure=true;
                    }
                    break;
                    case "rectangle":
                      if((shape as rectangle).isNearFirstPoint(e.clientX-this.offsetx,e.clientY-this.offsety,this.state.tolerance+3)){
                        this.state.Smode=SelectionMode.firstpoint;
                        sure=true;
                    }
                    else if((shape as rectangle).isNearSecondPoint(e.clientX-this.offsetx,e.clientY-this.offsety,this.state.tolerance+3)){
                      this.state.Smode=SelectionMode.secondpoint;
                      sure=true;            
                    }
                      else{
                        var num=(shape as rectangle).isNearEdge(e.clientX-this.offsetx,e.clientY-this.offsety,this.state.tolerance);
                        if(num!=-1){
                          this.state.x=e.clientX-this.offsetx;this.state.y=e.clientY-this.offsety;
                          this.state.Smode=SelectionMode.edge;
                          this.state.edge=num;
                          sure=true;
                        }
                        else if((shape as rectangle).isNearCentre(e.clientX-this.offsetx,e.clientY-this.offsety,this.state.tolerance+4)){
                          this.state.Smode=SelectionMode.centre;
                          sure=true;
                        }
                      }
                      break;
                      case "circle":
                        if((shape as circle).isNearSecondPoint(e.clientX-this.offsetx,e.clientY-this.offsety,this.state.tolerance+3)){
                          this.state.Smode=SelectionMode.secondpoint;
                          sure=true;
                        }
                        else if((shape as circle).isNearFirstPoint(e.clientX-this.offsetx,e.clientY-this.offsety,this.state.tolerance+4)){
                          this.state.Smode=SelectionMode.firstpoint;
                          sure=true;
                        }
                        else if((shape as circle).isNearCentre(e.clientX-this.offsetx,e.clientY-this.offsety,this.state.tolerance+10)){
                          this.state.Smode=SelectionMode.centre;
                          console.error("center!");
                          sure=true;
                        }
                    break;
                    case "path":
                      sure=true;
                      break;
                  }
                }
                this.Drawer.DrawOnContext(this.context);
                for(var ind=0 ;ind<found.length;ind++){
                  if(found[ind].shape!=this.state.selected){
                  this.highlight(found[ind].shape,this.context,"selecting");
                  }
                  else{  
                    this.highlight(found[ind].shape,this.context,"selecting");
                    this.highlight(found[ind].shape,this.context,"hovering");
                  }
                }
                if(sure){
                  this.state.modifying=true;
                  this.state.hovering=false;
                  this.state.current=found[i-1].shape;
                  this.state.i=found[i-1].index;
                }
                else{
                  this.state.modifying=false;
                  this.state.hovering=true;
                  this.state.current=found[i-1].shape;
                  this.state.i=found[i-1].index;
                  if(this.state.selecting){
                    this.highlight(this.state.selected,this.context,"selecting");
                    this.highlight(this.state.selected,this.context,"hovering");
                  }

                }
            }
            else{
                if(this.state.modifying||this.state.hovering){
                    this.state.modifying=false;
                    this.state.hovering=false;
                    this.Drawer.DrawOnContext(this.context);
                    if(this.state.selecting){
                      this.highlight(this.state.selected,this.context,"selecting");
                      this.highlight(this.state.selected,this.context,"hovering");
                    }

              }
            }
          }
    }
    MouseUp(e:MouseEvent){
        if(this.state.mode==Mode.Creating && this.state.drawing){
          this.state.drawing=false;
        }
        else if(this.state.mode==Mode.Modifying){
          this.state.mode=Mode.Selecting;
          
        }
        else if(this.state.mode==Mode.Selecting ){
          //do nothing
        }
      }
    highlight(current: drawable, context: CanvasRenderingContext2D,type:string) {
        var points:point[]=[];
        switch(current.type){
          case "line":
            points[0]=new point((current as line).x,(current as line).y);
            points[1]=new point((current as line).m,(current as line).n);
            break;
          case "circle":
            points[0]=new point((current as circle).x,(current as circle).y);
      
            break;
          case "rectangle":
            points[0]=new point((current as rectangle).x,(current as rectangle).y);
            points[1]=new point((current as rectangle).m,(current as rectangle).n);
            points[2]=new point((points[0].x+points[1].x)/2,(points[0].y+points[1].y)/2);
            break;
          default:
            break;
        }
        switch(type){
          case "hovering":
            context.lineWidth=2;
            context.strokeStyle="red";
            for(var i=0;i<points.length&&i!=2&&current.type.localeCompare("circle");i+=1){
              context.beginPath();
              context.arc(points[i].x,points[i].y,6,0,2*Math.PI);
              context.stroke();
            }
            context.strokeStyle="red";

            switch(current.type){
              case "circle":
                context.beginPath();
                context.arc(points[0].x,points[0].y,(current as circle).radius-((current as circle).lineWidth/2)-3,0,(0.2)*Math.PI);
                context.stroke();
                context.beginPath();
                context.arc(points[0].x,points[0].y,(current as circle).radius-((current as circle).lineWidth/2)-3,Math.PI,(1.2)*Math.PI);
                context.stroke();
      
                context.beginPath();
                context.moveTo(points[0].x-4,points[0].y);
                context.lineTo(points[0].x+4,points[0].y);
                context.moveTo(points[0].x,points[0].y-4);
                context.lineTo(points[0].x,points[0].y+4);
                context.stroke();
                break;
              case "rectangle":
                context.beginPath();
                context.moveTo(points[2].x-4,points[2].y);
                context.lineTo(points[2].x+4,points[2].y);
                context.moveTo(points[2].x,points[2].y-4);
                context.lineTo(points[2].x,points[2].y+4);
                context.stroke();
                break;
              case "line":
                context.beginPath();
                context.moveTo(points[0].x,points[0].y);
                context.lineTo(points[1].x,points[1].y);
                context.stroke();
                break;
            }
 
            break;
          case "modifying":
            context.lineWidth=2;
            switch(this.state.Smode){
              case SelectionMode.centre:
                if(current.type=="rectangle"){
                  context.strokeStyle='blue';
                  context.lineWidth=1;
                  context.beginPath();
                  context.arc(points[2].x,points[2].y,7,0,2*Math.PI);
                  context.stroke();
                  context.beginPath();
                  context.arc(points[2].x,points[2].y,9,0,2*Math.PI);
                  context.stroke();
                }
                break;
              case SelectionMode.edge:
                var l:line;
                var Si:ShapeInfo;
                var p1=points[0];
                var p3=points[1];
                var p2=new point(p3.x,p1.y);
                var p4=new point(p1.x,p3.y);
                var lw=(current as rectangle).lineWidth;
                var SI1=new ShapeInfo(p4,p1,lw,false,true,"green","") 
                var SI2=new ShapeInfo(p1,p2,lw,false,true,"green","") 
                var SI3=new ShapeInfo(p2,p3,lw,false,true,"green","")
                var SI4=new ShapeInfo(p3,p4,lw,false,true,"green","") 
                switch(this.state.edge){
                  case 0:
                    l=new line() ;
                    l.feedInfo(SI1);
                    break;
                  case 1:
                    l=new line() ;
                    l.feedInfo(SI2);
                    break;
                    case 2:
                    l=new line() ;
                    l.feedInfo(SI3);
                    break;
                  case 3:
                    l=new line() ;
                    l.feedInfo(SI4);
                    break;
                  default:
                    throw Error("how ..?");
                }
                l.DrawOnContext(context);
                break;
              
              case SelectionMode.firstpoint:
                if(!current.type.localeCompare("circle")){
                  context.strokeStyle='blue';
                  context.lineWidth=1;
                  context.beginPath();
                  context.arc(points[0].x,points[0].y,7,0,2*Math.PI);
                  context.stroke();
                  context.beginPath();
                  context.arc(points[0].x,points[0].y,9,0,2*Math.PI);
                  context.stroke();
                  break;
                }
                context.lineWidth=1;
                context.beginPath();
                context.arc(points[0].x,points[0].y,8,0,2*Math.PI);
                context.stroke();
                break;
              case SelectionMode.secondpoint:
                if(current.type.localeCompare("circle")==0){
                  break;
                }
                context.lineWidth=1;
                context.beginPath();
                context.arc(points[1].x,points[1].y,8,0,2*Math.PI);
                context.stroke();
                break;
            }
            break;
      
          
            case "selecting":
            context.strokeStyle="grey";
            context.lineWidth=1;
            for(var i=0;i<points.length&&current.type.localeCompare("circle");i+=1){
              if(i==2){break;}
              context.beginPath();
              context.arc(points[i].x,points[i].y,6,0,2*Math.PI);
              context.stroke();
            }
            context.strokeStyle="grey";

            switch(current.type){
              case "circle":
                context.beginPath();
                context.arc(points[0].x,points[0].y,(current as circle).radius-((current as circle).lineWidth/2)-3,0,(0.2)*Math.PI);
                context.stroke();
                context.beginPath();
                context.arc(points[0].x,points[0].y,(current as circle).radius-((current as circle).lineWidth/2)-3,Math.PI,(1.2)*Math.PI);
                context.stroke();
      
                context.beginPath();
                context.moveTo(points[0].x-4,points[0].y);
                context.lineTo(points[0].x+4,points[0].y);
                context.moveTo(points[0].x,points[0].y-4);
                context.lineTo(points[0].x,points[0].y+4);
                context.stroke();
                break;
              case "rectangle":
                context.beginPath();
                context.moveTo(points[2].x-4,points[2].y);
                context.lineTo(points[2].x+4,points[2].y);
                context.moveTo(points[2].x,points[2].y-4);
                context.lineTo(points[2].x,points[2].y+4);
                context.stroke();
                break;
              case "line":
                context.beginPath();
                context.moveTo(points[0].x,points[0].y);
                context.lineTo(points[1].x,points[1].y);
                context.stroke();
                break;
            }
            break;
          }
      }
}
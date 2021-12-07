import { drawable } from "../drawable";
import { ShapeInfo } from "../shapes/ShapeInfo";
import { point } from "./point";

export class path implements drawable{
    type="path";
    points!: point[];
    StartingPoint!:point;
    //make new point and set start 
    constructor(){
        this.points=[];
        this.type='path';
    }
    feedInfo(SI:ShapeInfo){
        this.SetStartingPoint(SI.p1);
    }
    SetStartingPoint(p:point){
        this.StartingPoint=p;
        this.points[0]=p;
    }

    //add new point after click
    AddPoint(x:number,y:number){
        this.points.push(new point(x,y));
    }
    //return that random shape
    getPath(){
        return this.points;
    }
    
    Contains(x:number,y:number,tolerance:number){
            var p:point;
            for(var i=0;i<this.points.length;i++){
                p=this.points[i];
                if(Math.abs(x-p.x)<=1+tolerance&&Math.abs(y-p.y)<=1+tolerance){
                    return true;
                }
            }
            return false;
    }
    DrawOnContext(context:CanvasRenderingContext2D){
        if(context&&(this.points.length>1)){
            context.beginPath();
            context.moveTo(this.StartingPoint.x,this.StartingPoint.y);
            var p:point;
            for(var i=1;i<this.points.length;i++){
                p=this.points[i];
                context.lineTo(p.x,p.y);
            }
            context.stroke();
        }
    }
}
import { circle } from "./circle";
import { IShape } from "./IShape";
import { ShapeInfo } from "./ShapeInfo";


export class rectangle implements IShape{
    type="rectangle";
    x: number;
    y: number;
    m: number;
    n: number;
    F: boolean;
    Ocolor: string;
    Fcolor: string;
    O: boolean;
    feedInfo(SI:ShapeInfo){
        this.F=SI.F;
        this.O=SI.O;
        this.x=SI.p1.x;
        this.y=SI.p1.y;
        this.m=SI.p2.x;
        this.n=SI.p2.y;
        this.lineWidth=SI.lineWidth;
        this.Ocolor=SI.Ocolor;
        this.Fcolor=SI.Fcolor;
    }
    constructor(){
        this.F=false;
        this.O=true;
        this.type="rectangle";
        this.x=0;
        this.y=0;
        this.m=0;
        this.n=0;
        this.lineWidth=0;
        this.Ocolor="black";
        this.Fcolor="black";
    }
    isNearCentre(x: number, y: number, tolerance: number): boolean {
        var cx=(this.x+this.m)/2;
        var cy=(this.y+this.n)/2
        if(circle.getDistance(x,y,cx,cy)<=tolerance){
            return true;
        }
        return false;
    }
    move(x: number, y: number): void {
        let w=this.m-this.x;
        let h=this.n-this.y;
        this.x=x-w/2;
        this.y=y-h/2;
        this.m=this.x+w;
        this.n=this.y+h;
    }
    moveSecondPoint(x:number,y:number){
        this.m=x;
        this.n=y;
    }
    moveFirstPoint(x:number,y:number){
        this.x=x;
        this.y=y;
    }
    isNearFirstPoint(a:number,b:number,tolerance:number){
        if(circle.getDistance(a,b,this.x,this.y)<=tolerance+this.lineWidth){
            return true;
        }
        return false;
    }
    isNearSecondPoint(a:number,b:number,tolerance:number){
        if(circle.getDistance(a,b,this.m,this.n)<=tolerance+this.lineWidth){
            return true;
        }
        return false;
    }
    isNearEdge(a:number,b:number,tolerance:number){
        if(Math.abs(a-this.x)<=this.lineWidth/2+tolerance){
            if(b<=Math.max(this.n,this.y)&&b>=Math.min(this.y,this.n)){
                return 0;
            }
        }
        if(Math.abs(a-this.m)<=this.lineWidth/2+tolerance){
            if(b<=Math.max(this.n,this.y)&&b>=Math.min(this.y,this.n)){
                return 2;
            }
        }
        if(Math.abs(b-this.y)<=this.lineWidth/2+tolerance){
            if(a<=Math.max(this.x,this.m)&&a>=Math.min(this.x,this.m)){
                return 1;
            }
        }
        if(Math.abs(b-this.n)<=this.lineWidth/2+tolerance){
            if(a<=Math.max(this.x,this.m)&&a>=Math.min(this.x,this.m)){
                return 3;
            }
        }
        return -1;
    }
    moveEdge(edge:number,dx:number,dy:number){
        switch (edge){
            case 0:
                this.x+=dx;
                break;
            
            case 2:
                this.m+=dx;
                break;
            
            case 1:
                this.y+=dy;
                break;
            
            case 3:
                this.n+=dy;
                break;
        }
    }
    DrawOnContext(context: CanvasRenderingContext2D,color?:string): void {
        context.strokeStyle=this.Ocolor;
        context.lineWidth=this.lineWidth;
        if(color){context.strokeStyle=color;}        
        if(this.F){
            context.fillStyle=this.Fcolor;
            context.fillRect(this.x,this.y,this.m-this.x,this.n-this.y);
        }
        else{context.strokeRect(this.x,this.y,this.m-this.x,this.n-this.y);
        console.log("lol");}
    }
    lineWidth: number;
  
    Contains(a: number, b: number,tolerance:number): boolean {
        if(a<=Math.max(this.m,this.x)+this.lineWidth/2+tolerance&&a>=Math.min(this.x,this.m)-this.lineWidth/2-tolerance&&b<=Math.max(this.n,this.y)+this.lineWidth/2+tolerance&&b>=Math.min(this.n,this.y)-this.lineWidth/2-tolerance){
            console.log("near edge!");
            return true;

        }
        else{
            return false;
        }
        if(this.F){
            if(a<=this.m&&a>=this.x&&b<=this.n&&b>=this.y){
                return true;
            }
            else{
                return false;
            }
        }
        else{
            if(Math.abs(a-this.x)<=this.lineWidth/2+tolerance||Math.abs(a-this.m)<=this.lineWidth/2+tolerance){
                if(Math.abs(b-this.y)<=this.lineWidth/2+tolerance||Math.abs(a-this.n)<=this.lineWidth/2+tolerance){
                    return true;
                }
            }
            return false;
        }
    }
}
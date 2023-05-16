import { circle } from "./circle";
import { IShape } from "./IShape";



export class line implements IShape{
    type="line";
    x: number;
    y: number;
    m: number;
    n: number;
    F: boolean;
    Ocolor: string;
    Fcolor: string ;
    constructor(F:boolean,a:number,b:number,c:number,d:number,lineW:number,Oc:string,Fc?:string){
        this.F=F;
        this.type="line";
        this.x=a;
        this.y=b;
        this.m=c;
        this.n=d;
        this.lineWidth=lineW;
        this.Ocolor=Oc;
        this.Fcolor=Fc||"";
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
    isNearCentre(x: number, y: number, tolerance: number): boolean {
        if(this.distance(x,y)<=tolerance+this.lineWidth/2){
            return true;
        }
        else{
            return false;
        }
    }
    isNearEdge(x: number, y: number, tolerance: number): number {
        if(circle.getDistance(x,y,this.x,this.y)<=tolerance+this.lineWidth/2){
            return 0;
        }
        if(circle.getDistance(x,y,this.m,this.n)<=tolerance+this.lineWidth/2){
            return 1;
        }
        return -1;
    }
    move(dx: number, dy: number): void {
        this.x+=dx;
        this.y+=dy;
        this.m+=dx;
        this.n+=dy;
    }
    moveSecondPoint(x:number,y:number){
        this.m=x;this.n=y;
    }
    moveFirstPoint(x:number,y:number){
        this.x=x;this.y=y;
    }
    moveEdge(edge:number,x:number,y:number){
        switch (edge) {
        case 0:
            this.x=x;
            this.y=y;
            break;
            
        case 1:
            this.m=x;
            this.n=y;
            break;

        default: throw Error("un defined edge");

        }
    }
    DrawOnContext(context: CanvasRenderingContext2D,color?:string): void {
        context.lineWidth=this.lineWidth;
        context.strokeStyle=this.Ocolor;
        if(color){context.strokeStyle=color;}
        context.beginPath();
        context.moveTo(this.x,this.y);
        context.lineTo(this.m,this.n);
        context.stroke();
    }
    lineWidth: number;
  
    Contains(a: number, b: number,tolerance:number): boolean {
        if(a>=Math.min(this.x,this.m)-tolerance&&a<=Math.max(this.x,this.m)+tolerance&&b>=Math.min(this.y,this.n)-tolerance&&b<=Math.max(this.y,this.n)+tolerance){
            if(this.distance(a,b)<=tolerance+this.lineWidth/2){
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    }
    distance(a:number,b:number){
        var u=Math.abs((this.m-this.x)*(this.y-b)-(this.n-this.y)*(this.x-a));
        return(u/circle.getDistance(this.x,this.y,this.m,this.n));
    }
}
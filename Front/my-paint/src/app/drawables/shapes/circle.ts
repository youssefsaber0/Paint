import { IShape } from "./IShape";

export class circle implements IShape{
    type="circle";
    F:boolean;
    x: number;
    y: number;
    m: number;
    n: number;

    radius!: number;
    Ocolor:string;
    Fcolor:string;
    constructor(F:boolean,a:number,b:number,c:number,d:number,lineW:number,Oc:string,Fc?:string){
        this.F=F;
        this.type="circle";
        this.x=a;
        this.y=b;


        this.m=c;
        this.n=d;
        this.lineWidth=lineW;
        this.updateRad();
        this.Ocolor=Oc;
        this.Fcolor=Fc||"";
    }
    lineWidth: number;
    updateRad(){
        this.radius= Math.sqrt(Math.pow((this.m-this.x),2)+Math.pow((this.n-this.y),2));
    }
    static getDistance(m:number,n:number,x:number,y:number){
        return Math.sqrt(Math.pow((m-x),2)+Math.pow((n-y),2));
    }
    Contains(x: number, y: number,tolerance:number): boolean {
        if(Math.abs(circle.getDistance(this.x,this.y,x,y))<=this.radius+tolerance){
            return true;
        }
        else{return false;}
        if(this.F){
            
        }
        else{
            if((Math.abs(circle.getDistance(this.x,this.y,x,y)-this.radius)<=tolerance)){
                return true;
            }
        }
        return false;
    }
    move(x:number,y:number){
        this.x=x;
        this.y=y;
    }
    moveEdge(x:number,y:number){
        this.radius=circle.getDistance(x,y,this.x,this.y);
    }
    moveSecondPoint(x:number,y:number){
        this.moveEdge(x,y);
    }
    moveFirstPoint(x:number,y:number){
        this.move(x,y);
    }
    isNearCentre(x:number,y:number,tolerance:number):boolean{
        if(circle.getDistance(x,y,this.x,this.y)<=tolerance){
            return true;
        }
        return false;
    }
    isNearFirstPoint(a: number, b: number, tolerance: number): boolean {
        return this.isNearCentre(a,b,tolerance);
    }
    
    isNearSecondPoint(x:number,y:number,tolerance:number){
        if((Math.abs(circle.getDistance(this.x,this.y,x,y)-this.radius)<=tolerance)){
            return true;
        }
        return false;
    }
    
    DrawOnContext(context:CanvasRenderingContext2D,color?:string){
        context.strokeStyle=this.Ocolor;
        if(color){context.strokeStyle=color;}
        context.lineWidth=this.lineWidth;
        context.beginPath();
        context.arc(this.x,this.y,this.radius,0,2*Math.PI);
        if(this.F){
            context.fillStyle=this.Fcolor;
            context.fill();
            context.stroke();
        }
        else{context.stroke();}

    }
}
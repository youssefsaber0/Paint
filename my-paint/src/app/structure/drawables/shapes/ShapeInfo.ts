import { point } from "../path/point";

export class ShapeInfo{
    p1:point;
    p2:point;

    lineWidth:number;

    //filled - outlined 
    F:boolean ;
    O:boolean;

    //Outline color
    Ocolor:string;
    //filling color
    Fcolor:string;
    constructor(p1:point,p2:point,lineWidth:number,F:boolean,O:boolean,Ocolor:string,Fcolor:string){
        this.p1=p1;
        this.p2=p2;
        this.lineWidth=lineWidth;
        this.F=F;
        this.O=O;
        this.Fcolor=Fcolor;
        this.Ocolor=Ocolor;
    }
}
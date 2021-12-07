import { NumberSymbol } from "@angular/common";

export class Style{
    
    lineWidth:number;

    //filled - outlined 
    F:boolean;
    O:boolean;

    //Outline color
    Ocolor:string;
    //filling color
    Fcolor:string;
    constructor(lineWidth:number,F:boolean,O:boolean,Ocolor:string,Fcolor:string){
        this.lineWidth=lineWidth;
        this.F=F;
        this.O=O;
        this.Fcolor=Fcolor;
        this.Ocolor=Ocolor;
    }
}
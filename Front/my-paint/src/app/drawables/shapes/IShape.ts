import { drawable } from "../drawable";

 export interface IShape extends drawable {
     //first point position
     x:number;
     y:number;
     //second point position
     m:number;
     n:number;


     lineWidth:number;

     //filled or not
     F:boolean  

     //Outline color
     Ocolor:string;
     //filling color
     Fcolor:string;

    isNearCentre(x:number,y:number,tolerance:number):boolean;
    isNearFirstPoint(a:number,b:number,tolerance:number):boolean;
    isNearSecondPoint(a:number,b:number,tolerance:number):boolean;


    move(dx:number,dy:number):void;
    moveSecondPoint(x:number,y:number):void;
    moveFirstPoint(x:number,y:number):void;
     
 }
import { drawable } from "../drawable";
import { point } from "../path/point";
import { ShapeInfo } from "./ShapeInfo";

 export interface IShape extends drawable {

    isNearCentre(x:number,y:number,tolerance:number):boolean;
    isNearFirstPoint(a:number,b:number,tolerance:number):boolean;
    isNearSecondPoint(a:number,b:number,tolerance:number):boolean;


    move(dx:number,dy:number):void;
    moveSecondPoint(x:number,y:number):void;
    moveFirstPoint(x:number,y:number):void;
     
 }
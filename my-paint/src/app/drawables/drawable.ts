import { ShapeInfo } from "./shapes/ShapeInfo";

export interface drawable{
    feedInfo(SI:ShapeInfo):void;
    Contains(x:number,y:number,tolerance:number):boolean;
    DrawOnContext(context:CanvasRenderingContext2D,color?:string):void;
    type:string;
}
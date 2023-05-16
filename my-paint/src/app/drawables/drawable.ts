export interface drawable{
    Contains(x:number,y:number,tolerance:number):boolean;
    DrawOnContext(context:CanvasRenderingContext2D,color?:string):void;
    type:string;
}
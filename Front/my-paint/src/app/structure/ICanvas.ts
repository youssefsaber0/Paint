import { drawable } from "../drawables/drawable";
import { IndexedShape } from "../drawables/IndexedShape";

export interface ICanvas{
    drawables:drawable[];
    AddShape(shape:drawable):void;
    RemoveShape(index:number):void;
    getShapes():drawable[];
    getShape(x:number,y:number,tolerance:number):IndexedShape[];
    DrawOnContext(context:CanvasRenderingContext2D):void;
}
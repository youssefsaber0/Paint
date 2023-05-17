import { ICanvas } from "./ICanvas";

export interface IDrawing{
    Width: number;
    Height: number;
    BackgroundColor: string;
    current: ICanvas;
    Back:ICanvas[];
    Forward:ICanvas[];
    getCanvas():ICanvas;
    setWidth(arg0:number):void;
    getWidth():number;
    setHeight(arg0:number):void;
    getHeight():number;
    setBackgroundColor(arg0:string):void;
    getBackgroundColor():string;
    CanRedo():boolean;
    CanUndo():boolean;
    Redo():void;
    Undo():void;
    AddCanvas(newCanvas:ICanvas):void;
    DrawOnContext(context:CanvasRenderingContext2D):void;
}
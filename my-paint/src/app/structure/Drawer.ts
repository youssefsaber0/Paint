import { Canvas } from "./Canvas";
import { ICanvas } from "./ICanvas";
import { IDrawer } from "./IDrawer";

export class Drawer implements IDrawer{
    Width: number;
    Height: number;
    BackgroundColor: string;
    current: ICanvas;
    Back: ICanvas[];
    Forward: ICanvas[];
    constructor(w:number,h:number,BackgroundColor:string){
        this.Width=w;this.Height=h;
        this.BackgroundColor=BackgroundColor;
        this.current=new Canvas();
        this.Back=[];
        this.Forward=[];
    }
    getCanvas(): ICanvas {
        return this.current;
    }
    DrawOnContext(context: CanvasRenderingContext2D): void {
        context.clearRect(0,0,this.Width,this.Height);
        context.fillStyle=this.BackgroundColor;
        context.fillRect(0,0,this.Width,this.Height);
        this.current.DrawOnContext(context);
    }
    
    setWidth(arg0: number): void {
        this.Width=arg0;
    }
    getWidth(): number {
        return this.Width;
    }
    setHeight(arg0: number): void {
        this.Height=arg0;
    }
    getHeight(): number {
        return this.Height;
    }
    setBackgroundColor(arg0: string): void {
        this.BackgroundColor=arg0;
    }
    getBackgroundColor(): string {
        return this.BackgroundColor;
    }
    CanUndo(): boolean {
        return(this.Back.length!=0);
    }
    CanRedo(): boolean {
        return(this.Forward.length!=0);
    }
    Redo(): void {
        if(this.CanRedo()){
            this.Back.push(this.current);
            let x=this.Forward.pop();
            if(x){this.current=x;}
        }
    }
    Undo(): void {
        if(this.CanUndo()){
            this.Forward.push(this.current);
            let x=this.Back.pop();
            if(x){this.current=x;}
        }
    }
    AddCanvas(newCanvas:ICanvas):void{
        if(newCanvas){
        this.Back.push(this.current);
        this.current=newCanvas;
        }
        else{
            throw new Error("null/undefined canvas");
            
        }
    }
    
}
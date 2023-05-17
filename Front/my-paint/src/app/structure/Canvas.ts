import { drawable } from "../drawables/drawable";
import { IShape } from "../drawables/shapes/IShape";
import { ICanvas } from "./ICanvas";
import { IndexedShape } from "../drawables/IndexedShape";

export class Canvas implements ICanvas{
    drawables:drawable[];
    i:number;
    constructor(){
        this.drawables=[];
        this.i=0;
    }
    AddShape(shape: drawable): void {
        this.drawables[this.i]=shape;
        this.i+=1;
    }

    RemoveShape(index :number){
        this.drawables.splice(index,1);
        this.i-=1;
    }

    getShapes(): drawable[] {
        return this.drawables;
    }

    getShape(x: number, y: number, tolerance: number): IndexedShape[] {
        var arr:IndexedShape[]=[];
        var shape:drawable;
        console.log(this.i);
        for(var index=0;index<this.i;index+=1){
            shape=this.drawables[index];
            if(this.drawables[index].Contains(x,y,tolerance)){
                arr.push({shape,index});
            }
        }
        return arr;
    }

    DrawOnContext(context: CanvasRenderingContext2D): void {
        var shape:drawable;
        for(var i=0;i<this.drawables.length;i++){
            shape=this.drawables[i];
            shape.DrawOnContext(context);
        }
    }
    
}
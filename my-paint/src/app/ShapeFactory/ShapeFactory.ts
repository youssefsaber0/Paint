import { drawable } from "../drawables/drawable";
import { path } from "../drawables/path/path";
import { circle } from "../drawables/shapes/circle";
import { line } from "../drawables/shapes/line";
import { rectangle } from "../drawables/shapes/rectangle";

export class ShapeFactory{
    public Create(str:string,x:number,y:number):drawable{
        var type:string = str.toLowerCase();
        if(!type.localeCompare("line")){
            return new line(false,x,y,x,y,1,'black'); 
        }
        else if(!type.localeCompare("rectangle")){
            return new rectangle(false,x,y,x,y,1,'black');
        }
        else if(!type.localeCompare("circle")){
            return new circle(false,x,y,x,y,1,'black');
        }
        else if(!type.localeCompare("path")){
            return new path(x,y);
        }
        else{
            throw Error("un provided shape: "+type);
        }
    }
}
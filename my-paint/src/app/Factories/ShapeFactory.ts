import { drawable } from "../drawables/drawable";
import { path } from "../drawables/path/path";
import { circle } from "../drawables/shapes/circle";
import { line } from "../drawables/shapes/line";
import { rectangle } from "../drawables/shapes/rectangle";

export class ShapeFactory{
    constructor(){

    }
    public Create(str:string):drawable{
        var type= str.toLowerCase();
        if(type.localeCompare("line")==0){
            return new line(); 
        }
        else if(type.localeCompare("rectangle")==0){
            return new rectangle();
        }
        else if(type.localeCompare("circle")==0){
            return new circle();
        }
        else if(type.localeCompare("path")==0){
            return new path();
        }
        else{
            throw Error("un provided shape: "+type);
        }
    }
}
import { drawable } from "../structure/drawables/drawable";
import { path } from "../structure/drawables/path/path";
import { circle } from "../structure/drawables/shapes/circle";
import { line } from "../structure/drawables/shapes/line";
import { rectangle } from "../structure/drawables/shapes/rectangle";


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
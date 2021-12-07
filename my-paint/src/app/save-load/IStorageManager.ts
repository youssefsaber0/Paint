import { Drawing } from "../structure/Drawer";

export interface IStorageManager {
    load():Drawing;
    save(drawing_to_be_saved:Drawing):void;
    //load should take a file path or some shit 
    //save should make a file and return its path or some shit
    //please make an implementation to this interface (change the above signatures as you like)
    
}
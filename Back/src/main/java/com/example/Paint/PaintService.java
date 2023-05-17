package com.example.Paint;

import java.util.ArrayList;
import java.util.Stack;
// import java.awt.Point;

import com.example.Paint.Drawables.Canvas;
import com.example.Paint.Drawables.Drawable;
import com.example.Paint.Drawables.Path;
import com.example.Paint.Drawables.Shape;
// import com.example.Paint.Drawables.point;
// import com.example.Paint.Features.IndexedEdited;
// import com.example.Paint.Features.UndoRedo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PaintService {

    public Canvas canvas;

    @Autowired
    public PaintService() {
        this.canvas = new Canvas();
        this.BACK = new Stack<>();
        this.FRONT = new Stack<>();
    }

    // public ArrayList<Object> undoDrawables = new ArrayList<>();
    public Stack<ArrayList<Object>> BACK = new Stack<ArrayList<Object>>();
    public Stack<ArrayList<Object>> FRONT = new Stack<ArrayList<Object>>();
    ArrayList<Object> copyDrawables(){
        ArrayList<Object> x= new ArrayList<Object>();
        for(int i=0;i<this.canvas.drawables.size();i++){
            if(((Drawable)this.canvas.drawables.get(i)).id==0){
                Path y=new Path();
                y.setType(((Path)this.canvas.drawables.get(i)).getType());
                y.setId(((Path)this.canvas.drawables.get(i)).getId());
                y.setType(((Path)this.canvas.drawables.get(i)).getType());
                y.setLineWidth(((Path)this.canvas.drawables.get(i)).getLineWidth());
                y.setOColor(((Path)this.canvas.drawables.get(i)).getOColor());
                // ArrayList<Point> ps=new ArrayList<Point>();
                // for(int j=0;j<((Path)this.canvas.drawables.get(i)).getPoints().length;j++){
                //     ps.add(new Point((int)((Path)this.canvas.drawables.get(i)).getPoints()[j].getX(),(int)((Path)this.canvas.drawables.get(i)).getPoints()[j].getY()));
                // }
                x.add(y);
            }
            else{
                Shape y= new Shape();
                y.setType(((Shape)this.canvas.drawables.get(i)).getType());
                y.setId(((Shape)this.canvas.drawables.get(i)).getId());
                y.setFColor(((Shape)this.canvas.drawables.get(i)).getFColor());
                y.setOColor(((Shape)this.canvas.drawables.get(i)).getOColor());
                y.setO(((Shape)this.canvas.drawables.get(i)).isO());
                y.setF(((Shape)this.canvas.drawables.get(i)).isF());
                y.setX(((Shape)this.canvas.drawables.get(i)).getX());
                y.setY(((Shape)this.canvas.drawables.get(i)).getY());
                y.setM(((Shape)this.canvas.drawables.get(i)).getM());
                y.setN(((Shape)this.canvas.drawables.get(i)).getN());
                y.setLineWidth(((Shape)this.canvas.drawables.get(i)).getLineWidth());
                x.add(y);
            }
        }
        return x;
    }
    public void pushBack() {
        this.BACK.push(this.copyDrawables());
    }
    public void pushFront() {
        this.FRONT.push(this.copyDrawables());
    }
    public void undo(){
            this.FRONT.push(this.copyDrawables());
            this.canvas.drawables=this.BACK.pop();
    }
    public void redo(){
            this.BACK.push(this.copyDrawables());
            this.canvas.drawables=this.FRONT.pop();
    } 
    public ArrayList<Object> Undo() throws CloneNotSupportedException {
        if (this.canUndo()) {
            this.undo();
            return this.canvas.drawables;
            }
         else {
            System.out.println("can't undo");
            ArrayList<Object> x = new ArrayList<Object>();
            x.add("INVALID");
            return x;
        }
    }


    public ArrayList<Object> Redo() throws CloneNotSupportedException {
        if (this.canRedo()) {
                this.redo();
                return this.canvas.drawables;
        }
        else{
                System.out.println("can't redo");
                ArrayList<Object> x = new ArrayList<Object>();
                x.add("INVALID");
                return x;
        }
    }

    public void addDrawable(Drawable drawable) throws CloneNotSupportedException {
        this.pushBack();
        canvas.add(drawable);
        this.clearFRONT();
    }

    public void EditDrawable(int index, Drawable drawable) throws CloneNotSupportedException {
        this.pushBack();
        this.canvas.edit(index, drawable);
        this.clearFRONT();
    }

    public void removeDrawable(int index) throws CloneNotSupportedException {
        try {
            this.pushBack();
            canvas.remove(index);
            this.clearFRONT();
        } catch (ArrayIndexOutOfBoundsException e) {
            throw new Error(e);
        }
    }


    // public void PushCanvas() throws CloneNotSupportedException{
    // this.Back.push(this.canvas.clone());
    // }
    // public void changeBackgroundColor(String BackgroundColor) throws
    // CloneNotSupportedException {
    // this.PushCanvas();
    // this.canvas.setBackgroundColor(BackgroundColor);
    // }

    // public void setSize(int w, int h) {
    // this.canvas.setSize(w, h);
    // }

    public void clearFRONT() {
    this.FRONT= new Stack <>();
    }

    public boolean canUndo() {
    return (!this.BACK.empty());
    }

    public boolean canRedo() {
    return (!this.FRONT.empty());
    }

    // public void pushBack() throws CloneNotSupportedException {
    // this.Back.push((Canvas) this.canvas.clone());
    // this.clearFRONT();
    // }

    public Object getDrawable(int index) throws CloneNotSupportedException {
        try {
            return canvas.getDrawable(index);
        } catch (ArrayIndexOutOfBoundsException e) {
            throw new Error(e);
        }
    }

    // public Canvas undo() throws CloneNotSupportedException {
    // if (this.canUndo()) {
    // this.FRONT.push(this.canvas.clone());
    // this.canvas = this.Back.pop();
    // return this.canvas;
    // //ouii
    // // *one stack for past:Back
    // // *one stack for future
    // //
    // } else {
    // return null;
    // }
    // }

    // public Canvas redo() {
    // if (this.canRedo()) {
    // this.Back.push(this.canvas);
    // this.canvas = this.FRONT.pop();
    // return this.canvas;
    // } else {
    // return null;
    // }
    // }

    // public void undo() {
    // this.flag = true;
    // String operation = operations.undo();
    // switch (operation) {
    // case "add":
    // undoDrawables.push(drawables.pop());
    // break;
    // case "remove":
    // drawables.push(undoDrawables.pop());
    // break;
    // default:
    // break;
    // }
    // }

    // public void redo() {
    // if (flag) {
    // String operation = operations.redo();
    // switch (operation) {
    // case "add":
    // drawables.push(undoDrawables.pop());
    // break;
    // case "remove":
    // undoDrawables.push(drawables.pop());
    // break;
    // default:
    // break;
    // }
    // }
    // }

    // public Drawable getDrawable(int index) {
    // try {
    // return drawables.get(index);
    // } catch (ArrayIndexOutOfBoundsException e) {
    // return null;
    // }
    // }

    // public ArrayList<String> getDrawables() {
    // ArrayList<String> drawableTypes = new ArrayList<String>();
    // for (int i = 0; i < drawables.size(); i++) {
    // drawableTypes.add(drawables.get(i).getType());
    // }
    // return drawableTypes;
    // }
}

// public void cloneShape(int index) {
// try {
// shapes.push((Shape) shapes.get(index).clone());
// operations.addOperation("add");
// } catch (ArrayIndexOutOfBoundsException e) {

// }
// }
 // String operation = operations.redo();
                // switch (operation) {
                //     case "add":
                //         drawables.add(undoDrawables.remove(undoDrawables.size() - 1));
                //         return this.drawables;
                //     case "remove":
                //         undoDrawables.add(drawables.remove(drawables.size() - 1));
                //         return this.drawables;
                //     case "edit":
                //         IndexedEdited x = operations.popredo();
                // 
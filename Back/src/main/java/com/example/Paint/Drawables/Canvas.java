
package com.example.Paint.Drawables;

import java.util.ArrayList;

public class Canvas implements Cloneable {
    public Integer Width;
    public Integer Height;
    public String BackgroundColor;
    public ArrayList<Object> drawables;

    public Canvas clone() throws CloneNotSupportedException {
        Canvas newCanvas = (Canvas) super.clone();
        return newCanvas;
    }

    public Canvas() {
        this.drawables = new ArrayList<Object>();
    }
    public void print(){
        Drawable x;
        System.out.println("------------");
        for(int i=0;i<this.drawables.size();i++){
            x=(Drawable)this.drawables.get(i);
            System.out.println(x.toStringDrawable());
        }
        System.out.println("------------");
    }

    public void setSize(int w, int h) {
        this.Width = w;
        this.Height = h;
    }

    public void setBackgroundColor(String x) {
        this.BackgroundColor = x;
    }

    public void add(Drawable x) {
        this.drawables.add(x);
    }

    public Object remove(int index) {
        return this.drawables.remove(index);
    }

    public Object getDrawable(int index) {
        return this.drawables.get(index);
    }

    public void  edit(int index, Drawable y) {
        // Object drawable = this.drawables.get(index);
        this.drawables.set(index, y);
        return ;
    }
    public String toStringg(){
        String x="[";
        for(int i=0;i<this.drawables.size();i++){
            x+=((Drawable)this.drawables.get(i)).toStringDrawable();
            if(i!=this.drawables.size()-1){
                x+=",";
            }
        }
        x+="]";
        return x;
    }
}

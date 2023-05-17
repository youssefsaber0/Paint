package com.example.Paint.Drawables;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
public class point implements Cloneable {
    @JsonProperty
    public int x;
    @JsonProperty
    public int y;

    // public point(){
    // }
    @JsonCreator(mode=JsonCreator.Mode.PROPERTIES)
    public point(@JsonProperty("x") int x, @JsonProperty("y") int y) {
        this.x=x;
        this.y=y;
    }
    
    public Integer getX() {
        return x;
    }

    public void setX(Integer x) {
        this.x = x;
    }

    public Integer getY() {
        return y;
    }

    public void setY(Integer y) {
        this.y = y;
    }

    public point clone() throws CloneNotSupportedException {
        return (point) super.clone();
    }
}

package com.example.Paint.Drawables;

import com.fasterxml.jackson.annotation.JsonProperty;

// Implementation of Prototype Design Pattern. 

public abstract class Drawable implements Cloneable {

    @JsonProperty
    protected String type;
    @JsonProperty
    public Integer id;
    
    public String toStringDrawable(){
        throw new Error("method not imp");
    }
    public Drawable clone() {
        try {
            return (Drawable) super.clone();
        } catch (CloneNotSupportedException e) {
            throw new InternalError();
        }
    }

    // public Drawable(String type, int id) {
    //     setType(type);
    //     setId(id);
    // }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}

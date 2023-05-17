package com.example.Paint.Drawables;

import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Shape extends Drawable {

    // public Shape(String type, int id) {
    // super(type, id);
    // }

    @JsonProperty
    private Integer lineWidth;
    @JsonProperty
    private boolean f;
    @JsonProperty
    private boolean o;
    @JsonProperty
    private Integer x, y, m, n;
    @JsonProperty
    private String fColor;
    @JsonProperty
    private String oColor;

    public Integer getLineWidth() {
        return lineWidth;
    }

    public void setLineWidth(Integer lineWidth) {
        this.lineWidth = lineWidth;
    }

    public boolean isF() {
        return f;
    }

    public void setF(boolean f) {
        this.f = f;
    }

    public boolean isO() {
        return o;
    }

    public void setO(boolean o) {
        this.o = o;
    }

    public String getOColor() {
        return oColor;
    }

    public void setOColor(String oColor) {
        this.oColor = oColor;
    }

    public String getFColor() {
        return fColor;
    }

    public void setFColor(String fColor) {
        this.fColor = fColor;
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

    public Integer getM() {
        return m;
    }

    public void setM(Integer m) {
        this.m = m;
    }

    public Integer getN() {
        return n;
    }

    public void setN(Integer n) {
        this.n = n;
    }

    public ArrayList<Object> shapetoString() {
        ArrayList<Object> string = new ArrayList<>();
        string.add(getFColor()); string.add(getOColor()); string.add(getType()); string.add(getId().toString()); 
        string.add(getLineWidth().toString()); string.add(getM().toString()); string.add(getN().toString()); string.add(getX().toString()); string.add(getY().toString());
        string.add(isF()); string.add(isO());
        return string;
    }
    @Override
    public String toStringDrawable() {
        String s="";
        // s+='"';
        // s+="shape";
        // s+='"';
        // s+=":";
        return s+"{"+'"'+"o"+'"'+":"+this.o+","+'"'+"f"+'"'+":"+this.f+","+'"'+"fColor"+'"'+":"+'"'+this.fColor+'"'+","+'"'+"n"+'"'+":"+this.n+","+'"'+"m"+'"'+":"+this.m+","+'"'+"y"+'"'+":"+this.y+","+'"'+"x"+'"'+":"+this.x+","+'"'+"oColor"+'"'+":"+'"'+this.oColor+'"'+","+'"'+"lineWidth"+'"'+":"+this.lineWidth+","+'"'+"type"+'"'+":"+this.type+","+'"'+"id"+'"'+":"+this.id+"}";
        // String string = "";
        // string+=(getFColor()); string+=(getOColor()); string+=(getType()); string+=(getId().toString()); 
        // string+=(getLineWidth().toString()); string+=(getM().toString()); string+=(getN().toString()); string+=(getX().toString()); string+=(getY().toString());
        // string+=(isF()); string+=(isO());
        // return string;
    
    }

    // @JsonProperty
    // private Integer lineWidth;
    // @JsonProperty
    // private boolean f;
    // @JsonProperty
    // private boolean o;
    // @JsonProperty
    // private Integer x, y, m, n;
    // @JsonProperty
    // private String fColor;
    // @JsonProperty
    // private String oColor;

}

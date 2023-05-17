package com.example.Paint.Drawables;

// import java.util.ArrayList;

// import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
// import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Path extends Drawable {
    // public Path(String type, Integer id) {
    // super(type, id);
    // }

    @JsonProperty
    private point startingPoint;
    @JsonProperty
    public point[] points;
    @JsonProperty
    private String oColor;
    @JsonProperty
    private Integer lineWidth;

    // public Path(){
    //     this.id=0;
    // }
    public static class point{
        int x;
        int y;

        public point(){

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
    }
    public point getStartingPoint() {
        return startingPoint;
    }

    public void setStartingPoint(point p) {
        this.startingPoint = p;
    }

    public String getOColor() {
        return oColor;
    }

    public void setOColor(String oColor) {
        this.oColor = oColor;
    }

    // okk bs bgrb haga wait

    public Integer getLineWidth() { // بص ع الكونترولور هلremoveShape صح
        return lineWidth; // عامو قال هيبعت index
    }

    public void setLineWidth(Integer lineWidth) {
        this.lineWidth = lineWidth;
    }

    public point[] getPoints() {
        return this.points;
    }
    // public String toStringDrawable(){
    //     return("Path {("+this.startingPoint.getX()+","+this.startingPoint.getY()+")"+"to"+"("+this.points.get(this.points.size()-1).getX()+","+this.points.get(this.points.size()-1).getY()+")");
    // }
    public String toStringDrawable(){
        String s=new String();
        // s= '\"path\":['
        s="";
        // s+='"';
        // s+="path";
        // s+='"';
        // s+=":";
        return s+'{'+'"'+"startingPoint"+'"'+":{"+'"'+"x"+'"'+":"+this.startingPoint.getX()+" ,"+'"'+"y"+'"'+":"+this.startingPoint.getY()+"},"+'"'+"points"+'"'+":"+this.pathtoString()+","+'"'+"oColor"+'"'+":"+'"'+this.oColor+'"'+","+'"'+"lineWidth"+'"'+":"+this.lineWidth+","+'"'+"type"+'"'+":"+this.type+","+'"'+"id"+'"'+":"+this.id+"}";
        
    }
    public String pathtoString(){
        String s="[";
        for(int i=0;i<this.points.length;i++){
            s+="{"+
            '"'+"x"+'"'+":"+(this.points[i].getX())+","+
            '"'+"y"+'"'+":"+this.points[i].getY()+"}";
            if(i!=this.points.length-1){
                s+=",";
            }
        }
        s+="]";
        return s;
    }

    public void setPoints(point[] points2) {
        this.points = points2;
    }
}

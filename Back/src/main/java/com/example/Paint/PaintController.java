package com.example.Paint;

import java.lang.reflect.Type;
import java.util.ArrayList;

import com.example.Paint.DesignPatterns.ShapeFactory;
import com.example.Paint.Drawables.Drawable;
import com.example.Paint.Drawables.Path;
import com.example.Paint.Drawables.Shape;
import com.example.Paint.Features.FileManager;
// import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.jackson.JsonObjectSerializer;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@CrossOrigin(origins = "http://localhost:4200")
public class PaintController {

    @Autowired
    public PaintService pService;

    @Autowired
    public PaintService pService2;

    @Autowired
    public FileManager fileManager;
    @Autowired
    public ShapeFactory factory;
    @Autowired
    public ObjectMapper objMapper;

    @GetMapping
    public ArrayList<Object> getDrawables() throws CloneNotSupportedException {

        // Point p1 = new Point(5, 3);
        // Point p2 = new Point(2, 7);
        // Point p3 = new Point(1, 9);

        // ArrayList<Point> points = new ArrayList<>();
        // points.add(p1);
        // points.add(p2);
        // points.add(p3);

        // Path path = new Path();
        // path.setId(0);
        // path.setLineWidth(5);
        // path.setOColor("Red");
        // path.setPoints(points);
        // path.setStartingPoint(p1);
        // path.setType("Path");

        // Shape shape = new Shape();
        // shape.setF(true);
        // shape.setFColor("Blue");
        // shape.setId(5);
        // shape.setLineWidth(6);
        // shape.setM(2);
        // shape.setN(6);
        // shape.setO(true);
        // shape.setOColor("White");
        // shape.setType("Rectangle");
        // shape.setX(9);
        // shape.setY(0);
        // pService.addDrawable(path);
        // pService.addDrawable(shape);
        return pService.canvas.drawables;

    }

    @GetMapping("/test")
    public ArrayList<Object> getDrawables2() throws CloneNotSupportedException {
        return pService2.canvas.drawables;
    }

    @GetMapping("/restart")
    public void clearCanvas() {
        this.pService.canvas.drawables = new ArrayList<Object>();
    }

    @PostMapping("/addShape")
    @ResponseBody
    public void addShape(@RequestBody String drawableString) throws CloneNotSupportedException {
        // System.out.println(drawableString);
        JSONObject jsonDrawable = new JSONObject(drawableString);
        Integer id = jsonDrawable.getInt("id");
        if (id == 0) {
            Path path = (Path) factory.create(drawableString, id);
            System.out.println(path);
            this.pService.addDrawable(path);
        } else {
            Shape shape = (Shape) factory.create(drawableString, id);
            this.pService.addDrawable(shape);
        }
        System.out.println(this.pService.canvas.toStringg());
        return ;
    }

    @GetMapping("/removeShape/{index}")
    public void removeShape(@PathVariable int index) throws CloneNotSupportedException {
        this.pService.removeDrawable(index);
        this.pService.canvas.print();
        return ;
    }

    @PostMapping("/editShape/{index}")
    @ResponseBody
    public void editShape(@PathVariable int index, @RequestBody String drawableString)
            throws CloneNotSupportedException {
        JSONObject jsonDrawable = new JSONObject(drawableString);
        Integer id = jsonDrawable.getInt("id");
        if (id == 0) {
            // Path path = (Path) factory.create(drawableString, id);
            // this.pService.EditDrawable(index, path);
        } else {
            Shape shape = (Shape) factory.create(drawableString, id);
            this.pService.EditDrawable(index, shape);
        }
        System.out.println(this.pService.canvas.toStringg());
        return;
    }

    // @PostMapping("/changeCanvasColor")
    // @ResponseBody
    // public String changeCanvasColor(@RequestBody String newColor)
    // throws CloneNotSupportedException {
    // this.pService.changeBackgroundColor(newColor);
    // return "the drawable has been editd succssefully:/n"; // +
    // }

    // @PostMapping("/changeCanvasSize")
    // @ResponseBody
    // public String changeCanvasSize(@RequestBody int width, int height) throws
    // CloneNotSupportedException {
    // this.pService.setSize(width, height);
    // return "Size is changed Successfully/n";
    // }

    @GetMapping("/undo")
    public Object undo() throws CloneNotSupportedException {
        ArrayList<Object> x = new ArrayList<Object>();
        ArrayList<Object> y = new ArrayList<Object>();
        x = this.pService.Undo();
        System.out.println(this.pService.canvas.toString());
        // System.out.println(((Shape) this.pService.canvas.drawables.get(0)).shapetoString());
        System.out.println("undone");
        if (x.isEmpty()) {
            this.pService.canvas.drawables = x;
            y.add("EMPTY");
            return y;
        }
        if (x.get(0).equals("INVALID")) {
            y.add("INVALID");
            return y;
        }
        try{
        // String str = objMapper.writeValueAsString(x);
        Type listType = new TypeToken<ArrayList<Drawable>>(){}.getType();
        String str=new Gson().toJson(this.pService.canvas.drawables,listType);
        System.out.println("look: ");
        System.out.println(str);
        return str;
        }
         catch (Exception e) {
            e.printStackTrace();
        }
        return (this.pService.canvas.drawables);
    }

    @GetMapping("/redo")
    public Object redo() throws CloneNotSupportedException {
        System.out.println("redone");
        ArrayList<Object> x = new ArrayList<Object>();
        ArrayList<Object> y = new ArrayList<Object>();
        x = this.pService.Redo();
        System.out.println(this.pService.canvas.toString());
        // System.out.println(((Shape) this.pService.canvas.drawables.get(0)).shapetoString());
        System.out.println("undone");
        if (x.isEmpty()) {
            this.pService.canvas.drawables = x;
            y.add("EMPTY");
            return y;
        }
        if (x.get(0).equals("INVALID")) {
            y.add("INVALID");
            return y;
        }
        this.pService.canvas.drawables = x;
        try{
            // String str = objMapper.writeValueAsString(x);
            Type listType = new TypeToken<ArrayList<Drawable>>(){}.getType();
            String str=new Gson().toJson(this.pService.canvas.drawables,listType);
            System.out.println("look: ");
            System.out.println(str);
            return str;
            }
             catch (Exception e) {
                e.printStackTrace();
            }
            return this.pService.canvas.drawables;
    }

    @GetMapping(value = "/savexml")
    public void saveXML() {
        fileManager.setSession("C:/Users/Zeyad Zidan/Desktop/Session.xml");
        fileManager.saveXML(pService.canvas.drawables);
    }

    @GetMapping(value = "/loadxml")
    public void loadXML() {
        fileManager.setSession("C:/Users/Zeyad Zidan/Desktop/Session.xml");
        pService2.canvas.drawables = fileManager.loadXML(fileManager.getSession());
    }

    @GetMapping("/savejson")
    public ResponseEntity<byte[]> saveJsonFile() {
        fileManager.setSession("Canvas1");
        return fileManager.saveJSON(pService.canvas.drawables);
    }

    @GetMapping(value = "/loadjson")
    public void loadJSON() throws Exception {
        fileManager.setSession("C:/Users/Zeyad Zidan/Desktop/Canvas1.json");
        pService2.canvas.drawables = fileManager.loadJSON();
    }

}

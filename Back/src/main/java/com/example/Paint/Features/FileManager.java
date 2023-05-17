package com.example.Paint.Features;

// import java.awt.Point;
import java.beans.XMLDecoder;
import java.beans.XMLEncoder;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.Reader;
import java.util.ArrayList;

import com.example.Paint.Drawables.Drawable;
import com.example.Paint.Drawables.Path;
import com.example.Paint.Drawables.Shape;
// import com.example.Paint.Drawables.point;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;

import org.json.simple.parser.JSONParser;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
public class FileManager {

    private String session;

    public String getSession() {
        return this.session;
    }

    public void setSession(String session) {
        this.session = session;
    }

    public void saveXML(ArrayList<Object> drawables) {
        XMLEncoder encoder = null;
        try {
            encoder = new XMLEncoder(new BufferedOutputStream(new FileOutputStream(this.session)));
        } catch (FileNotFoundException e) {
            System.out.println("Error occured while saving the file.");
        }
        encoder.writeObject(drawables);
        encoder.close();
    }

    @SuppressWarnings("unchecked")
    public ArrayList<Object> loadXML(String sessionPath) {
        XMLDecoder decoder = null;
        try {
            decoder = new XMLDecoder(new BufferedInputStream(new FileInputStream(sessionPath)));
        } catch (FileNotFoundException e) {
            System.out.println("Error occurred while loading the file.");
        }
        return (ArrayList<Object>) decoder.readObject();
    }

    public ResponseEntity<byte[]> saveJSON(ArrayList<Object> drawables) {
        Gson gson = new Gson();
        String drawablesAsString = gson.toJson(drawables);
        byte[] drawablesAsBytes = drawablesAsString.getBytes();
        return ResponseEntity
                .ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename= " + getSession() + ".json")
                .contentType(MediaType.APPLICATION_JSON)
                .contentLength(drawablesAsBytes.length)
                .body(drawablesAsBytes);
    }

    public Drawable create(org.json.simple.JSONObject jsonObject) {

        try {

            int shapeId = ((Long) jsonObject.get("id")).intValue();
            int x, y;
            ObjectMapper objectMapper = new ObjectMapper();

            if (shapeId == 0) {

                // Creating path and setting up attributes---------------------
                Path path = new Path();
                path.setId(shapeId);
                path.setType((String) jsonObject.get("type"));
                path.setLineWidth(((Long) jsonObject.get("lineWidth")).intValue());
                path.setOColor((String) jsonObject.get("oColor"));

                // Setting up starting point-----------------------------------
                String string = jsonObject.get("startingPoint").toString();
                JsonNode node = objectMapper.readTree(string);
                x = ((Long) node.get("x").asLong()).intValue();
                y = ((Long) node.get("y").asLong()).intValue();
                com.example.Paint.Drawables.Path.point p = new Path.point();
                p.setX(x);p.setY(y);
                path.setStartingPoint(p);

                // Setting up points array--------------------------------------
                string = jsonObject.get("points").toString();
                node = objectMapper.readTree(string);
                JsonNode nodeIterator;
               com.example.Paint.Drawables.Path.point[] points = new Path.point[node.size()];
                for (int i = 0; i < node.size(); i++) {
                    nodeIterator = node.get(i);
                    x = ((Long) nodeIterator.get("x").asLong()).intValue();
                    y = ((Long) nodeIterator.get("y").asLong()).intValue();
                    p = new Path.point();
                    p.setX(x);p.setY(y);
                    points[i]=(p);
                }
                path.setPoints(points);
                // --------------------------------------------------------------

                return path;

            } else {
                Shape shape = new Shape();
                shape.setId(shapeId);
                shape.setType((String) jsonObject.get("type"));
                shape.setLineWidth(((Long) jsonObject.get("lineWidth")).intValue());
                shape.setF((boolean) jsonObject.get("f"));
                shape.setO((boolean) jsonObject.get("o"));
                shape.setOColor((String) jsonObject.get("oColor"));
                shape.setFColor((String) jsonObject.get("fColor"));
                shape.setX(((Long) jsonObject.get("x")).intValue());
                shape.setY(((Long) jsonObject.get("y")).intValue());
                shape.setM(((Long) jsonObject.get("m")).intValue());
                shape.setN(((Long) jsonObject.get("n")).intValue());

                return shape;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public ArrayList<Object> loadJSON() throws Exception {
        try (Reader reader = new BufferedReader(new FileReader(getSession()))) {
            JSONParser jsonParser = new JSONParser();
            org.json.simple.JSONArray jsonArray = (org.json.simple.JSONArray) jsonParser.parse(reader);
            reader.close();
            org.json.simple.JSONObject jsonObject;
            ArrayList<Object> drawables = new ArrayList<Object>();
            for (int i = 0; i < jsonArray.size(); i++) {
                jsonObject = (org.json.simple.JSONObject) jsonArray.get(i);
                drawables.add(create(jsonObject));
            }
            return drawables;
        } catch (Exception e) {
            return null;
        }
    }
}

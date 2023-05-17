package com.example.Paint.DesignPatterns;

import com.example.Paint.Drawables.Drawable;
import com.example.Paint.Drawables.Path;
import com.example.Paint.Drawables.Shape;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.stereotype.Component;

@Component
public class ShapeFactory {

    private ObjectMapper objectMapper = new ObjectMapper();

    public Drawable create(String shape, Integer id) {
        // objectMapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
        try {
            if(id.equals(0)) {
                // System.out.println(shape);
                return objectMapper.readValue(shape, Path.class);
            }
            return objectMapper.readValue(shape, Shape.class);
        }   catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}

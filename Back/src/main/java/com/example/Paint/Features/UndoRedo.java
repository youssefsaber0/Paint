package com.example.Paint.Features;

import com.example.Paint.Drawables.Drawable;
import java.util.Stack;

import org.springframework.stereotype.Component;

@Component
public class UndoRedo {
    private Stack<String> undoOperations = new Stack<String>();
    private Stack<String> redoOperations = new Stack<String>();
    private Stack<IndexedEdited> undoedited = new Stack<IndexedEdited>();
    private Stack<IndexedEdited> redoedited = new Stack<IndexedEdited>();
    
    // public Integer popIndex() {
    // return indices.pop();
    // }
    // public void addIndex(Integer index) {
    // this.indices.add(index);
    // }

    public void pushEdited(int index, Drawable drawable, boolean state) {
        // Stack <Drawable> stack = this.edited.get(index);
        IndexedEdited x = new IndexedEdited(index, drawable);
        if (state) {
            this.undoedited.push(x);
        }
        else{
            this.redoedited.push(x);
        }
        // this.edited.set(index, stack);
    }

    public IndexedEdited popundo() {
        return this.undoedited.pop();
    }

    public IndexedEdited popredo() {
        return this.redoedited.pop();
    }

    public void ClearUndoedit() {
        this.undoedited = new Stack<IndexedEdited>();
    }

    public void ClearRedoedit() {
        this.undoedited = new Stack<IndexedEdited>();
    }

    public int undoSize() {
        return this.undoOperations.size();
    }

    public int redoSize() {
        return this.redoOperations.size();
    }

    public void resetRedo() {
        redoOperations = new Stack<String>();

    }

    public void addOperation(String operation) {
        this.undoOperations.push(operation);
    }

    public String undo() {
        String operation = this.undoOperations.pop();
        this.redoOperations.push(operation);
        return operation;
    }

    public String redo() {
        String operation = this.redoOperations.pop();
        this.undoOperations.push(operation);
        return operation;
    }

}

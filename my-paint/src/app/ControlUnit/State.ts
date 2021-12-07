import { drawable } from "../structure/drawables/drawable";
import { Mode, SelectionMode } from "../structure/enums/enums";

type NewType = Mode;

export  class State{

 private _width: number;
    public get width(): number {
        return this._width;
    }
    public set width(value: number) {
        this._width = value;
    }
 private _height: number;
    public get height(): number {
        return this._height;
    }
    public set height(value: number) {
        this._height = value;
    }
 private _BackgroundColor: string;
    public get BackgroundColor(): string {
        return this._BackgroundColor;
    }
    public set BackgroundColor(value: string) {
        this._BackgroundColor = value;
    }
 private _mode: NewType;
    public get mode(): NewType {
        return this._mode;
    }
    public set mode(value: NewType) {
        this._mode = value;
    }
 private _Smode: SelectionMode;
    public get Smode(): SelectionMode {
        return this._Smode;
    }
    public set Smode(value: SelectionMode) {
        this._Smode = value;
    }
 private _type: string;
    public get type(): string {
        return this._type;
    }
    public set type(value: string) {
        this._type = value;
    }
 private _current!: drawable;
    public get current(): drawable {
        return this._current;
    }
    public set current(value: drawable) {
        this._current = value;
    }
 private _selected!: drawable;
    public get selected(): drawable {
        return this._selected;
    }
    public set selected(value: drawable) {
        this._selected = value;
    }
    private _modified!: drawable;
    public get modified(): drawable {
        return this._modified;
    }
    public set modified(value: drawable) {
        this._modified = value;
    }

 private _i: number;
    public get i(): number {
        return this._i;
    }
    public set i(value: number) {
        this._i = value;
    }
 private _index: number;
    public get index(): number {
        return this._index;
    }
    public set index(value: number) {
        this._index = value;
    }
 private _edge: number;
    public get edge(): number {
        return this._edge;
    }
    public set edge(value: number) {
        this._edge = value;
    }
 private _drawing: boolean;
    public get drawing(): boolean {
        return this._drawing;
    }
    public set drawing(value: boolean) {
        this._drawing = value;
    }
 private _selecting: boolean;
    public get selecting(): boolean {
        return this._selecting;
    }
    public set selecting(value: boolean) {
        this._selecting = value;
    }
    private _modifying: boolean;
    public get modifying(): boolean {
        return this._modifying;
    }
    public set modifying(value: boolean) {
        this._modifying = value;
    }
    private _hovering: boolean;
    public get hovering(): boolean {
        return this._hovering;
    }
    public set hovering(value: boolean) {
        this._hovering = value;
    }


 private _tolerance: number = 6;
    public get tolerance(): number {
        return this._tolerance;
    }
    public set tolerance(value: number) {
        this._tolerance = value;
    }
 private _x: number;
    public get x(): number {
        return this._x;
    }
    public set x(value: number) {
        this._x = value;
    }
 private _y: number;
    public get y(): number {
        return this._y;
    }
    public set y(value: number) {
        this._y = value;
    }
 private _Mx: number;
    public get Mx(): number {
        return this._Mx;
    }
    public set Mx(value: number) {
        this._Mx = value;
    }
 private _My: number;
    public get My(): number {
        return this._My;
    }
    public set My(value: number) {
        this._My = value;
    }
 constructor(){
     this._width=600;
     this._height=800;
     this._BackgroundColor='white';
     this._tolerance=5;
     this._mode=Mode.Selecting;
     this._Smode=SelectionMode.centre;
     this._type="";
     this._i=0;
     this._index=0;
     this._edge=0;
     this._drawing=false;
     this._selecting=false;
     this._modifying=false;
     this._hovering=false;
     this._x=0;
     this._y=0;
     this._Mx=0;
     this._My=0;
 }

}
import React from 'react';
import "../styles/toolbar.scss";
import Brush from "../tools/Brush";
import toolState from "../store/toolState";
import canvasState from "../store/canvasState";
import Rect from "../tools/Rect";

const Toolbar = () => {
    return (
        <div className="toolbar">
            <button className="toolbar__btn brush" onClick={() => toolState.setTool(new Brush(canvasState.canvas))}></button>
            <button className="toolbar__btn rect" onClick={() => toolState.setTool(new Rect(canvasState.canvas))}></button>
            <button className="toolbar__btn circle" onClick={() => toolState.setTool(new Brush(canvasState.canvas))}></button>
            <button className="toolbar__btn eraser" onClick={() => toolState.setTool(new Brush(canvasState.canvas))}></button>
            <button className="toolbar__btn line" onClick={() => toolState.setTool(new Brush(canvasState.canvas))}></button>
            <input style={{marginLeft: 10}} type="color"></input>
            <button className="toolbar__btn undo" onClick={() => toolState.setTool(new Brush(canvasState.canvas))}></button>
            <button className="toolbar__btn redo" onClick={() => toolState.setTool(new Brush(canvasState.canvas))}></button>
            <button className="toolbar__btn save"onClick={() => toolState.setTool(new Brush(canvasState.canvas))}></button>
        </div>
    );
};

export default Toolbar;
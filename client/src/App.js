import React from "react";
import './styles/app.scss';
import Toolbar from "./components/Toolbar";
import SettingBar from "./components/SettingBar";
import Canvas from "./components/Canvas";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/:id"
                           element={
                               <>
                                   <Toolbar/>
                                   <SettingBar/>
                                   <Canvas/>
                               </>
                           }
                    >
                    </Route>
                    <Route path="/" element={<Navigate to={`f${(+new Date).toString(16)}`}/>}></Route>
                </Routes>

            </div>
        </BrowserRouter>
    );
}

export default App;


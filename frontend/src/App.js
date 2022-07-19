import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/home";
import ViewAll from "./pages/ViewAll/ViewAll";
export const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Header />
        <div className="bg">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/view-all" exact element={<ViewAll />} />
          </Routes>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;

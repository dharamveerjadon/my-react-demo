import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { MyContextProvider } from "./MyContextProvider";
import "./App.css";
import Header from "./components/Header";
import Home from "./screens/home";
import Services from "./screens/services";
import Gallery from "./screens/gallery";
import ContactUs from "./screens/contactUs";
import CarSearch from "./screens/carListing";
import CarDetail from "./screens/carDetail";

function App() {
  return (
    <MyContextProvider>
    <Router>
      <Header/>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/services" Component={Services} />
        <Route path="/gallery" Component={Gallery} />
        <Route path="/contact" Component={ContactUs} />
        <Route path="/carListing" Component={CarSearch} />
        <Route path="/carDetail" Component={CarDetail} />
      </Routes>
    </Router>
    </MyContextProvider>
  );
}

export default App;

import React from "react";
import "./App.css";
import GoogleMapReact from "google-map-react";

function App() {
  return (
    <div className="App" style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAebNmxEjr0MHqmQdbRAxSPpUF4n3UGwRw" }}
        defaultZoom={2}
        defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
      ></GoogleMapReact>
    </div>
  );
}

export default App;

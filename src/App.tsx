import React, { useState, useEffect } from "react";
import "./App.css";
import GoogleMapReact from "google-map-react";
import { makeStyles } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import FileCopyIcon from "@material-ui/icons/FileCopyOutlined";
import SaveIcon from "@material-ui/icons/Save";
import PrintIcon from "@material-ui/icons/Print";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from "@material-ui/icons/Favorite";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles(theme => ({
  root: {
    height: 380,
    transform: "translateZ(0px)",
    flexGrow: 1
  },
  speedDial: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

const actions = [
  { icon: <FileCopyIcon />, name: "Copy" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" },
  { icon: <FavoriteIcon />, name: "Like" }
];

function App() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [hasPosition, setHasPosition] = useState(false);
  const [latitude, setLatitude] = useState(-25.363882);
  const [longitude, setLongitude] = useState(131.044922);

  useEffect(() => {
    if (navigator.geolocation && !hasPosition) {
      setHasPosition(true);
      navigator.geolocation.getCurrentPosition(
        pos => {
          setLatitude(pos.coords.latitude);
          setLongitude(pos.coords.longitude);
          alert("Latitude : " + latitude + " Longitude: " + longitude);
        },
        () => {},
        { timeout: 5000 }
      );
    }
  }, [latitude, longitude, hasPosition]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="App" style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAebNmxEjr0MHqmQdbRAxSPpUF4n3UGwRw" }}
        defaultZoom={11}
        center={{ lat: latitude, lng: longitude }}
      ></GoogleMapReact>
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        className={classes.speedDial}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
    </div>
  );
}

export default App;

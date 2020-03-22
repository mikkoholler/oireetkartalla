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
import { SymptomsMenu } from "./components/Symptoms/SymptomsMenu";
import styled from "styled-components";

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

const DEFAULT_ZOOM_LEVEL = 11;

function App() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [hasPosition, setHasPosition] = useState(false);
  const [latitude, setLatitude] = useState(66.052978);
  const [longitude, setLongitude] = useState(26.184390);
  const [zoomLevel, setZoomLevel] = useState(5.25)

  useEffect(() => {
    if (navigator.geolocation && !hasPosition) {
      setHasPosition(true);
      navigator.geolocation.getCurrentPosition(
        pos => {
          setLatitude(pos.coords.latitude);
          setLongitude(pos.coords.longitude);
          setZoomLevel(DEFAULT_ZOOM_LEVEL);
          alert("Latitude : " + latitude + " Longitude: " + longitude);
        },
        (e) => {
          console.error(e);
        },
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

  const [showSymptomsMenu, toggleSymptomsMenu] = useState<boolean>(false);

  const onClick = () => toggleSymptomsMenu(!showSymptomsMenu);

  return (
    <div className="App" style={{ height: "100vh", width: "100%" }}>
      {showSymptomsMenu && <SymptomsMenu closeSymptomsMenu={onClick} />}
      <Navi>
        <div onClick={() => onClick()}>Omat oireeni</div>
      </Navi>

      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAebNmxEjr0MHqmQdbRAxSPpUF4n3UGwRw" }}
        zoom={zoomLevel}
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

const Navi = styled.div`
  display: flex;
  bottom: 0;
  position: absolute;
  z-index: 1;

  & > div {
    padding: 1rem;
    margin: 1rem;
    text-align: center;
    box-sizing: border-box;
    border-radius: 10px;
    background: hsla(0, 0%, 100%, 0.9);
    font-family: "Roboto";
    text-transform: uppercase;
    box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.1);
  }
`;

export default App;

import React from "react";

const useLocation = () => {
  const [location, setLocation] = React.useState({
    latitude: "",
    longitude: "",
  });

  const success = (x) => {
    const position = x.coords;
    const latitude = position.latitude;
    const longitude = position.longitude;
    // setText(position)
    console.log("위도 :::", latitude);
    console.log("경도 :::", longitude);

    setLocation({ latitude: latitude, longitude: longitude });
  };

  const error = (x) => {};

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  React.useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(success, error, options);
    }
  }, []);

  return location;
};

export default useLocation;

import React from "react";

export const fetchData = async () => {
  const API_TRACKING = "https://api.openweathermap.org/data/2.5/weather";
  const API_TRACKING_KEY = "0a4582fd7abe58639a7df6dcd168ed81";

  // get user location
  const getPosition = () =>
    new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

  const position = await getPosition();
  const { latitude, longitude } = position.coords;
  const response = await fetch(
    `${API_TRACKING}?lat=${latitude}&lon=${longitude}&appid=${API_TRACKING_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data = await response.json();
  return data;
};

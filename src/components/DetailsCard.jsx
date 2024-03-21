import React, { useEffect, useState } from "react";
import joe from "../assets/userPic/joe.jpg";
import notification from "../assets/userPic/notification.png";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import AirIcon from "@mui/icons-material/Air";
import { fetchStatistics } from "../services/DetailsService";
export default function DetailsCard() {
  const [selectedInterval, setSelectedInterval] = useState("7");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchStatistics(selectedInterval);
      setWeatherData(data);
    }
    fetchData();
  }, [selectedInterval]);

  const handleIntervalClick = (interval) => {
    setSelectedInterval(interval);
  };
  return (
    <div className="">
      {weatherData && (
        <div className="shrink-0 rounded-lg text-white mx-auto max-w-full p-4 h-[160vh] w-[468px] bg-gradient-to-br from-[#0A1D56] via-[#0F2884] to-[#091640]">
          <header className="flex justify-end items-center space-x-4">
            <div className="flex items-center bg-[#fff] p-1 rounded-2xl space-x-2 h-7 w-15">
              <div className="bg-[#0e2547] flex rounded-full items-center justify-center p-2 h-5 w-5">
                <LightModeIcon sx={{ fontSize: 13 }} />
              </div>
              <div className="">
                <DarkModeIcon color="disabled" />
              </div>
            </div>
            <div className="rounded-full bg-white w-6 p-1">
              <img
                src={notification}
                alt="joe"
                // srcSet=""
                className="rounded-full w-14"
              />
            </div>
            <div className="">
              <img
                src={joe}
                alt="joe"
                // srcSet=""
                className="rounded-full w-10"
              />
            </div>
          </header>
          <section>
            <div className=" flex flex-col justify-center items-center m-auto space-y-3">
              <img
                alt=""
                loading="lazy"
                srcSet={weatherData.current.condition.icon}
                className="shrink-0 mt-24 w-20 aspect-[1.01] max-md:mt-10"
              />
              <div className="flex flex-col justify-center items-center m-auto">
                <h1 className="text-3xl font-bold text-white">20° C </h1>
              </div>
              <div className="flex flex-col justify-center items-center m-auto">
                <h2 className="text-xl font-medium text-white">
                  {weatherData.current.condition.text}
                </h2>
              </div>
              <div className="flex justify-center items-center space-x-8">
                <div className="flex flex-col items-center">
                  <h2 className="flex items-center">
                    <span>
                      <AirIcon />
                    </span>
                    <span className="border-r-2 px-3">Wind</span>
                    <span className="px-3 self-end">
                      {weatherData.current.wind_kph} km/h
                    </span>
                  </h2>
                </div>
                <div className="flex flex-col items-center">
                  <h2 className="flex items-center">
                    <span>
                      <AirIcon />
                    </span>
                    <span className="border-r-2 px-3">Hum</span>
                    <span className="px-3 text-end">{weatherData.current.humidity} %</span>
                  </h2>
                </div>
              </div>
            </div>
          </section>
          <section className="mt-4">
            <div className="flex justify-between items-center m-auto space-y-3">
              <h1 className="font-semibold text-xl ">Weather Forecast</h1>
              <div className="gap-2.5 px-4 py-1 text-base font-medium rounded-lg border border-white border-solid bg-zinc-300 bg-opacity-10">
                Celesius
              </div>
            </div>
            <div className="flex justify-between items-center rounded-3xl m-auto w-[98%] p-2 mt-6 bg-gradient-to-t from-[#344fa0] via-[#0F2884] to-[#2c4085]">
              <div
                className={`w-[25%] rounded-3xl text-center font-medium text-base p-2 cursor-pointer ${
                  selectedInterval === "7"
                    ? "bg-gradient-to-t  bg-[#ccd7ff] via-[#768dda] to-[#788beb] transition duration-500"
                    : ""
                }`}
                onClick={() => handleIntervalClick("7")}
              >
                7 Days
              </div>
              <div
                className={`w-[25%] rounded-3xl text-center font-medium text-base p-2 cursor-pointer ${
                  selectedInterval === "14"
                    ? "bg-gradient-to-t  bg-[#ccd7ff] via-[#768dda] to-[#788beb] transition duration-500"
                    : ""
                }`}
                onClick={() => handleIntervalClick("14")}
              >
                14 Days
              </div>
              <div
                className={`w-[25%] rounded-3xl text-center font-medium text-base p-2 cursor-pointer ${
                  selectedInterval === "30"
                    ? "bg-gradient-to-t  bg-[#ccd7ff] via-[#768dda] to-[#788beb] transition duration-500"
                    : ""
                }`}
                onClick={() => handleIntervalClick("30")}
              >
                30 Days
              </div>
            </div>
          </section>
          <section className="mt-4  overflow-y-auto h-full ">
          {weatherData.forecast.forecastday.map((forecast, key) => (
            <div key={key} className="flex flex-row justify-between items-center border-b-2 py-2 border-cyan-300">
              <div className="flex flex-row justify-start">
                <div className="flex">
                  <img
                    src={forecast.day.condition.icon}
                    alt="hh"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <h1 className="text-xl font-medium text-white">
                  {forecast.date}
                  </h1>
                  <p className="text-xl font-light text-white">{forecast.day.condition.text}</p>
                </div>
              </div>
              <div className=" w-20">
                <span className="border-l-2 pl-4" >{forecast.day.avgtemp_c}° C</span>
              </div>
            </div>
             ))}
          </section>
        </div>
      )}
    </div>
  );
}

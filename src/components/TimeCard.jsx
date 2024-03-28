import React, { useEffect, useState } from "react";
import { fetchData } from "../services/TimeCardService";

export default function TimeCard() {
  const [weatherData, setWeatherData] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData();
        if (data) {
          setWeatherData(data);
          localStorage.setItem("location", JSON.stringify(data.name));
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    getData();
    updateTime();
  }, []);

  const updateTime = () => {
    const now = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    };
    const formattedTime = now.toLocaleString("en-MA", options);
    setCurrentTime(formattedTime);
  };

  return (
    <section>
      {weatherData && (
        <article className="flex rounded-lg overflow-hidden relative flex-col px-9 py-7 w-full text-white backdrop-blur-[15.5px] min-h-[333px] max-md:px-5 max-md:max-w-full">
          <img
            loading="lazy"
            alt=""
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/3c4c00b4cbe6af27e7a78d2846ed12bdf6d0f5076886ac9467c5acd59ec8628b?apiKey=89a892a24a5940518254fdf55b2a9fd6&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/3c4c00b4cbe6af27e7a78d2846ed12bdf6d0f5076886ac9467c5acd59ec8628b?apiKey=89a892a24a5940518254fdf55b2a9fd6&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/3c4c00b4cbe6af27e7a78d2846ed12bdf6d0f5076886ac9467c5acd59ec8628b?apiKey=89a892a24a5940518254fdf55b2a9fd6&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/3c4c00b4cbe6af27e7a78d2846ed12bdf6d0f5076886ac9467c5acd59ec8628b?apiKey=89a892a24a5940518254fdf55b2a9fd6&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/3c4c00b4cbe6af27e7a78d2846ed12bdf6d0f5076886ac9467c5acd59ec8628b?apiKey=89a892a24a5940518254fdf55b2a9fd6&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/3c4c00b4cbe6af27e7a78d2846ed12bdf6d0f5076886ac9467c5acd59ec8628b?apiKey=89a892a24a5940518254fdf55b2a9fd6&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/3c4c00b4cbe6af27e7a78d2846ed12bdf6d0f5076886ac9467c5acd59ec8628b?apiKey=89a892a24a5940518254fdf55b2a9fd6&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/3c4c00b4cbe6af27e7a78d2846ed12bdf6d0f5076886ac9467c5acd59ec8628b?apiKey=89a892a24a5940518254fdf55b2a9fd6&"
            className="object-cover absolute inset-0 size-full "
          />
          <section className="flex relative gap-5 w-full max-md:flex-wrap max-md:max-w-full">
            <div className="flex-auto my-auto text-4xl font-semibold">
              Good Morning, Oualid
            </div>

            <div className="flex gap-2.5 px-4 py-3 text-base font-medium rounded-xl border border-white border-solid bg-zinc-300 bg-opacity-10">
              <img
                alt=""
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/4beefc83da229035039d34f3ca5c87bace6ef02e79d6f265dbe961f7156bdd97?apiKey=89a892a24a5940518254fdf55b2a9fd6&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/4beefc83da229035039d34f3ca5c87bace6ef02e79d6f265dbe961f7156bdd97?apiKey=89a892a24a5940518254fdf55b2a9fd6&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/4beefc83da229035039d34f3ca5c87bace6ef02e79d6f265dbe961f7156bdd97?apiKey=89a892a24a5940518254fdf55b2a9fd6&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/4beefc83da229035039d34f3ca5c87bace6ef02e79d6f265dbe961f7156bdd97?apiKey=89a892a24a5940518254fdf55b2a9fd6&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/4beefc83da229035039d34f3ca5c87bace6ef02e79d6f265dbe961f7156bdd97?apiKey=89a892a24a5940518254fdf55b2a9fd6&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/4beefc83da229035039d34f3ca5c87bace6ef02e79d6f265dbe961f7156bdd97?apiKey=89a892a24a5940518254fdf55b2a9fd6&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/4beefc83da229035039d34f3ca5c87bace6ef02e79d6f265dbe961f7156bdd97?apiKey=89a892a24a5940518254fdf55b2a9fd6&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/4beefc83da229035039d34f3ca5c87bace6ef02e79d6f265dbe961f7156bdd97?apiKey=89a892a24a5940518254fdf55b2a9fd6&"
                className="shrink-0 aspect-[0.76] w-[19px]"
              />
              <div className="flex-auto my-auto">
                {weatherData.name}, {weatherData.sys.country}{" "}
              </div>
            </div>
          </section>
          <section className="flex relative gap-5 justify-between items-start mt-14 text-sm font-medium max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
            <div className="flex flex-col self-start">
              <div className="text-5xl font-extrabold max-md:text-4xl">
                {currentTime
                  ? currentTime.split(",")[2].split(" ")[3].trim()
                  : ""}{" "}
                {currentTime
                  ? currentTime.split(",")[2].split(" ")[4].trim()
                  : ""}
              </div>
              <div className="mt-5">
                {currentTime ? currentTime.split(",")[0].trim() : ""}{" "}
                {currentTime ? currentTime.split(",")[1].trim() : ""}
              </div>
              <div className="mt-7">Weather Forecast</div>
              <div className="mt-4 text-xl font-bold">
                {weatherData.weather[0].main}
              </div>
              <div className="mt-2.5">
                <span>{weatherData.weather[0].description},</span>{" "}
                <span>{weatherData.main.temp} K, </span>{" "}
                <span>Humidity: {weatherData.main.humidity}%</span>
              </div>
            </div>
            <img
              alt=""
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/a1115eefc51b7c8f825c538b9dfdb9ff7349379a8ae0643a692e716734ddd969?apiKey=89a892a24a5940518254fdf55b2a9fd6&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/a1115eefc51b7c8f825c538b9dfdb9ff7349379a8ae0643a692e716734ddd969?apiKey=89a892a24a5940518254fdf55b2a9fd6&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a1115eefc51b7c8f825c538b9dfdb9ff7349379a8ae0643a692e716734ddd969?apiKey=89a892a24a5940518254fdf55b2a9fd6&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/a1115eefc51b7c8f825c538b9dfdb9ff7349379a8ae0643a692e716734ddd969?apiKey=89a892a24a5940518254fdf55b2a9fd6&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/a1115eefc51b7c8f825c538b9dfdb9ff7349379a8ae0643a692e716734ddd969?apiKey=89a892a24a5940518254fdf55b2a9fd6&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a1115eefc51b7c8f825c538b9dfdb9ff7349379a8ae0643a692e716734ddd969?apiKey=89a892a24a5940518254fdf55b2a9fd6&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/a1115eefc51b7c8f825c538b9dfdb9ff7349379a8ae0643a692e716734ddd969?apiKey=89a892a24a5940518254fdf55b2a9fd6&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/a1115eefc51b7c8f825c538b9dfdb9ff7349379a8ae0643a692e716734ddd969?apiKey=89a892a24a5940518254fdf55b2a9fd6&"
              className="shrink-0 self-end mt-24 w-20 aspect-[1.01] max-md:mt-10"
            />
          </section>
        </article>
      )}
    </section>
  );
}

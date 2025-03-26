import React, { useState } from "react";
import DisplayWeather from "./DisplayWeather";
import backGroundClear from "../../image/bg-clear.avif";
import backGroundRain from "../../image/bg-rain.jpg";
import backGroundClouds from "../../image/bg-blueSky.jpg";
import backGroundMist from "../../image/bg-mist.jpg";
import backGroundHome from "../../image/bg-simp.jpeg";
import backGround404 from "../../image/bg-404.jpg";
import { data } from "autoprefixer";

const Weather = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState("");
  const [weatherState, setWeatherState] = useState("");
  const [form, setForm] = useState({
    city: "",
  });

  async function fetchDataWeather(e) {
    e.preventDefault();
    if (form.city === "") {
      alert("nhap TP");
    } else {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?appid=02ac31aab528819053457737dd81930f&q=${form.city}&lang=vi&units=metric`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.cod === 200) {
            setWeatherData({ data: data });
            setError("");
            setWeatherState(data.weather[0].main);
          } else {
            setError("Thành phố không tồn tại");
            setWeatherData([]);
            setWeatherState("");
          }
        });
    }
  }

  const getBackgroundImage = (weatherMain) => {
    switch (weatherMain) {
      case "Clear":
        return `url(${backGroundClear})`;
      case "Rain":
        return `url(${backGroundRain})`;
      case "Clouds":
        return `url(${backGroundClouds})`;

      case "Mist":
        return `url(${backGroundMist})`;
      default:
        return `url(${backGroundHome})`;
    }
  };
  const backgroundStyle = weatherState
    ? {
        backgroundImage: getBackgroundImage(weatherState),
      }
    : error
    ? {
        backgroundImage: `url(${backGround404})`,
      }
    : {
        backgroundImage: `url(${backGroundHome})`,
      };

  console.log(weatherState, "weatherState");

  console.log(error);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "city") {
      setForm({ ...form, city: value });
    }
  };

  return (
    <div className="section-weather" style={backgroundStyle}>
      <div className="flex justify-center items-center mt-[80px]  min-h-screen ">
        <div className="bg-rgba[255,255,255,0.5] p-8 rounded-2xl shadow-xl transition-all duration-500 w-[400px] text-gray-700">
          <h1 className="text-3xl font-bold  text-center mb-5">
            Dự báo thời tiết
          </h1>
          <form>
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Search
            </label>
            <div className="relative">
              <input
                type="search"
                id="search"
                className="block w-full p-4  text-md text-pink-700 font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
                placeholder="Search city"
                required
                name="city"
                onChange={(e) => handleChange(e)}
              />
              <button
                onClick={(e) => fetchDataWeather(e)}
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5
              bg-pink-700 hover:bg-blue-300 focus:ring-4 focus:outline-none
              focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2
              dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Search
              </button>
            </div>
          </form>
          {error && <p className="mt-5 text-red-500">{error}</p>}
          {weatherData.data && (
            <div>
              <DisplayWeather data={weatherData.data} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;

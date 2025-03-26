import React from "react";

const DisplayWeather = (props) => {
  const { data } = props;

  return (
    <div className="mt-8 p-6 bg-gray-300 bg-opacity-60 rounded-lg shadow-md ">
      <h1 className="text-3xl font-bold">City: {data.name}</h1>
      <div className="flex flex-col justify-center items-center">
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt="Weather Icon"
        />
        <p className="text-5xl font-medium">
          {" "}
          {Math.round(data.main.temp)}
          <span>℃</span>
        </p>
      </div>
      <div className="flex justify-between mt-4">
        <p>
          Humidity: <span>{data.main.humidity} %</span>
        </p>
        <p>
          Speed: <span>{Math.floor((data.wind.speed * 18) / 5)} km/h</span>
        </p>
      </div>
      <p className="text-center mt-2">{data.weather[0].description}</p>
    </div>
  );
};

export default DisplayWeather;

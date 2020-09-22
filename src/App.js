import React, { useState } from "react";

function App() {
  const api = {
    API_KEY: "c938d067ade1d4bcd0a71e8ca78cce03",
    BASE_URL: "https://api.openweathermap.org/data/2.5/",
  };

  const [weather, setweather] = useState({});
  const [query, setquery] = useState("");

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(
        `${api.BASE_URL}weather?q=${query}&units=metric&APPID=${api.API_KEY}`
      )
        .then((res) => res.json())
        .then((result) => {
          setweather(result);
          setquery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      " January ",
      " February",
      " March",
      "April",
      "May ",
      "June",
      "July ",
      "August",
      " September",
      " October",
      "November",
      "December",
    ];
    let days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      " Friday",
      "Saturday",
      "Sunday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <div className="app-wrap">
        <header>
          <input
            type="text"
            className="search-box"
            placeholder="Search for a city..."
            onChange={(e) => setquery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </header>
        {typeof weather.main != "undefined" ? (
          <main>
            <section className="location">
              <div className="city">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </section>
            <div className="current">
              <div className="temp">
                {Math.round(weather.main.temp)}
                <span>°c</span>
              </div>
              <div className="weather">{weather.weather[0].main}</div>
              <div className="hi-low">
                {Math.round(weather.main.temp_max)} /
                {Math.round(weather.main.temp_min)}
              </div>
            </div>
          </main>
        ) : (
          <section className="location">
            <div className="city" style={{ textAlign: "center" }}>
              Search weather by country name..
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default App;

const WeatherDisplay = ({ data, units, showName }) => {
  return (
    <div className="weather-display">
      {showName && (
        <h3>
          <strong>{data.name}</strong>
        </h3>
      )}
      <h2>{Math.round(data.main.temp)}&#176;</h2>
      <h3>Feels like {Math.round(data.main.feels_like)}&#176;</h3>
      <h3>
        <strong>
          {data.weather
            .map((item) => {
              return item.description;
            })
            .join(', ')}
        </strong>
      </h3>
      <br />
      <div>
        <div>Humidity: {data.main.humidity}%</div>
        <div>Pressure: {data.main.pressure} mbar</div>
        <div>
          Wind Speed: {data.wind.speed} {units === 'metric' ? 'km/h' : 'mph'}
        </div>
        <div>Visibility: {data.visibility}</div>
      </div>
      <br />
    </div>
  );
};

export default WeatherDisplay;

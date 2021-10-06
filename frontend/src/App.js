import { useEffect, useState } from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import dotenv from 'dotenv';
import CloudIcon from '@mui/icons-material/Cloud';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightIcon from '@mui/icons-material/Nightlight';
import CitySelector from './components/CitySelector';
import WeatherDisplay from './components/WeatherDisplay';
import { getWeatherByCityId } from './api/weather';

function App() {
  const UNITS = ['metric', 'imperial'];
  const UNIT_SYMBOLS = ['°C', '°F'];
  const [styling, setStyling] = useState('sunny');
  const [units, setUnits] = useState(0);
  const [data, setData] = useState(null);
  const [showName, setShowName] = useState(false);
  dotenv.config();

  useEffect(() => {
    let initialUnits = units;
    if (localStorage.getItem('units')) {
      initialUnits = localStorage.getItem('units');
      setUnits(initialUnits);
    }
    if (localStorage.getItem('weather_app_city_id')) {
      handleSelect(localStorage.getItem('weather_app_city_id'), initialUnits);
      setShowName(true);
    }
  }, []);

  const handleSelect = async (id, units) => {
    setShowName(false);
    localStorage.setItem('weather_app_city_id', id);
    localStorage.setItem('weather_app_units', units);
    let result = (await getWeatherByCityId(id, UNITS[units])).data;

    if (result.dt < result.sys.sunrise || result.dt > result.sys.sunset) {
      setStyling('night');
    } else if (result.clouds.all > 40) {
      setStyling('cloudy');
    } else {
      setStyling('sunny');
    }

    setData(result);
  };

  return (
    <div className={'App ' + styling}>
      <br />
      <div className="App-header">
        <div className="block">
          {styling === 'sunny' ? (
            <WbSunnyIcon />
          ) : styling === 'night' ? (
            <NightlightIcon />
          ) : (
            <CloudIcon />
          )}
        </div>
        <h1>Weather App</h1>
        <div className="block">
          <ToggleButtonGroup
            onChange={(e, value) => {
              console.log(value);
              const newValue = value === null ? 1 - units : value;
              setUnits(newValue);
              if (data) {
                handleSelect(data.id, newValue);
              }
            }}
            exclusive
            value={units}
            className="units"
          >
            {UNITS.map((unit, i) => {
              return (
                <ToggleButton key={i} value={i} selected={units === i}>
                  {UNIT_SYMBOLS[i]}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </div>
      </div>
      <CitySelector onSelect={handleSelect} />
      {data && (
        <WeatherDisplay showName={showName} data={data} units={UNITS[units]} />
      )}
    </div>
  );
}

export default App;

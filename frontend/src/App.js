import { useState } from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import dotenv from 'dotenv';
import CloudIcon from '@mui/icons-material/Cloud';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightIcon from '@mui/icons-material/Nightlight';
import CitySelector from './components/CitySelector';
import WeatherDisplay from './components/WeatherDisplay';
import { getWeatherByCityId } from './api/weather';

function App() {
  const [styling, setStyling] = useState('sunny');
  const [units, setUnits] = useState('metric');
  const [data, setData] = useState(null);
  dotenv.config();

  const handleSelect = async (id, units) => {
    let result = (await getWeatherByCityId(id, units)).data;
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
              setUnits(value);
              if (data) {
                handleSelect(data.id, value);
              }
            }}
            exclusive
            value={units}
            className="units"
          >
            <ToggleButton value="metric">C</ToggleButton>
            <ToggleButton value="imperial">F</ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
      <CitySelector onSelect={handleSelect} />
      {data && <WeatherDisplay data={data} units={units} />}
    </div>
  );
}

export default App;

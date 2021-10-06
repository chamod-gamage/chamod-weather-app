import axios from 'axios';
import { CityModel } from '../models';

const OWM_BASE_URL = 'http://api.openweathermap.org/data/2.5/';
export const getCurrentWeather = async (req, res) => {
  try {
    const { id } = req.params;
    const { units } = req.query;
    const response = await axios.get(
      `${OWM_BASE_URL}weather?id=${id}&units=${units || 'metric'}&appid=${
        process.env.OWM_KEY
      }`
    );
    res.status(200).json({ data: response.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const DEFAULT_CITIES = [
  {
    _id: '615d2aaf7d37d620059725fc',
    id: 6167865,
    name: 'Toronto',
    state: '',
    country: 'CA',
    coord: {
      lon: -79.416298,
      lat: 43.700111,
    },
  },
  {
    _id: '615d2aa87d37d62005970ba8',
    id: 5308655,
    name: 'Phoenix',
    state: 'AZ',
    country: 'US',
    coord: {
      lon: -112.074043,
      lat: 33.44838,
    },
  },
  {
    _id: '615d2aa67d37d62005970135',
    id: 5128638,
    name: 'New York',
    state: 'NY',
    country: 'US',
    coord: {
      lon: -75.499901,
      lat: 43.000351,
    },
  },
  {
    _id: '615d2aa97d37d62005970e27',
    id: 5368361,
    name: 'Los Angeles',
    state: 'CA',
    country: 'US',
    coord: {
      lon: -118.243683,
      lat: 34.052231,
    },
  },
  {
    _id: '615d2aa27d37d6200596f213',
    id: 4887398,
    name: 'Chicago',
    state: 'IL',
    country: 'US',
    coord: {
      lon: -87.650047,
      lat: 41.850029,
    },
  },
];

export const searchForCities = async (req, res) => {
  try {
    const { q } = req.params;
    let cities = await CityModel.find({
      name: { $regex: q, $options: 'i' },
    }).limit(50);
    if (!cities || !cities.length) {
      cities = DEFAULT_CITIES;
    }
    res.status(200).json({ cities });
  } catch (err) {
    res.status(500).json({ cities: DEFAULT_CITIES, message: err.message });
  }
};

import axios from 'axios';
export const searchCities = async (query) => {
  return (
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/cities/${query}`)
  ).data;
};

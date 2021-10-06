import axios from 'axios';
export const getWeatherByCityId = async (id, units) => {
  return (
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/weather/${id}`, {
      params: { units },
    })
  ).data;
};

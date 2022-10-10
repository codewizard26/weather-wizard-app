import axios from "axios";
import { OPENWEATHER_URL } from "../constants";

const fetchWithLatandLon = async (lat, lon) => {
  const APIKEY = process.env.REACT_APP_WEATHER_API_KEY;
  const response = await axios.get(`
        ${OPENWEATHER_URL}?lat=${lat}&lon=${lon}&appid=${APIKEY}
    `);

  return response.data;
};

export default fetchWithLatandLon;

import fetchWithLatandLon from "../utils/fetchWIthLatandLon";

const CurerntLoactionButton = ({ setAllData }) => {
  const handleClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude);
        console.log(longitude);

        const result = await fetchWithLatandLon(latitude, longitude);

        setAllData({
          city: result.name,
          country: result.sys.country,
          temperature: result.main.temp,
          humidity: result.main.humidity,
          min_temp: result.main.temp_min,
          description: result.weather[0].description,
          pressure: result.main.pressure,
          icon: result.weather[0].icon,
        });
      });
    } else {
      console.log("Not supported");
    }
  };

  return (
    <button className="button" onClick={handleClick}>
      Use My Current Location
    </button>
  );
};

export default CurerntLoactionButton;

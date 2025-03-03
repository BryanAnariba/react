import { useWeather } from "./weather/hooks/useWeather";
import WeatherDetail from "./weather/components/Details/WeatherDetail";
import Form from "./weather/components/Form/Form";
import Spinner from "./weather/components/Spinner/Spinner";
import styles from "./WeatherApp.module.css";
import Alert from "./weather/components/Alert/Alert";

export default function WeatherApp() {

  const {fetchWeather, loading, weather, hasWeatherData, notFound} = useWeather();

  return (
    <>
      <p className={styles.title}>Buscador de clima</p>
      <div className={styles.container}>
        <Form fetchWeather={fetchWeather} />

        {loading && <Spinner />}
        {hasWeatherData && <WeatherDetail weather={weather} />}
        {notFound && <Alert>Ciundad No Encontrada</Alert>}
      </div>
    </>
  );
}

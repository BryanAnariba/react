import Form from "./weather/components/Form/Form";
import { useWeather } from "./weather/hooks/useWeather";
import styles from "./WeatherApp.module.css";

export default function WeatherApp() {

  const {fetchWeather} = useWeather();

  return (
    <>
      <p className={styles.title}>Buscador de clima</p>
      <div className={styles.container}>
        <Form fetchWeather={fetchWeather} />

        <p>2</p>
      </div>
    </>
  );
}

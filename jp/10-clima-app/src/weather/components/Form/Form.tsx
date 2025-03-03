import styles from "./Form.module.css";
import { countries } from "../../data/countries";
import { useState } from "react";
import { Search } from "../../interfaces/weather.interfaces";
import Alert from "../Alert/Alert";

interface FormProps {
  fetchWeather: (search: Search) => Promise<void>;
}

export default function Form({ fetchWeather }: FormProps) {
  const [search, setSearch] = useState<Search>({
    city: "",
    country: "",
  });

  const [alert, setAlert] = useState<string>("");

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(search).includes("")) {
      setAlert("Todos los campos son obligatorios");
    } else {
      setAlert("");
      fetchWeather(search);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {alert && <Alert>{alert}</Alert>}
      <div className={styles.field}>
        <label htmlFor="city">Ciudad:{""}</label>
        <input
          type="text"
          name="city"
          id="city"
          placeholder="Fort Laurderdale..."
          onChange={handleInputChange}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="country">Country:{""}</label>
        <select name="country" id="country" onChange={handleInputChange}>
          <option value="">-- Select Country --</option>
          {countries.map((country) => (
            <option value={country.code} key={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <input className={styles.submit} type="submit" value="Consultar Clima" />
    </form>
  );
}

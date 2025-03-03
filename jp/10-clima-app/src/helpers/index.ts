export const formatWeatherTemperature = (temperature: number): number => {
    const kelvin = 273.15;
    return parseInt((temperature - kelvin).toString());
}
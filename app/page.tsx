import {ForecastReturn} from "@/app/weatherTypes";

export default async function Home() {

  const data = await fetch('https://api.weather.gov/gridpoints/HUN/57,41/forecast');
  const results = await data.json() as ForecastReturn;
  console.log(results)
  return (
    <main>
      <h1> Hello Next 13</h1>
      {results.properties.periods.map((period) => (
      <div key={period.number}>
        <h1>{period.detailedForecast}</h1>
      </div>
        ))}
    </main>
  )
}

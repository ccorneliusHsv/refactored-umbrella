import {ForecastReturn} from "@/app/weatherTypes";
import ForecastCard from "@/app/[zipCode]/ForecastCard";
import zipCodes from "@/utilities/zipCodes.json"
type Params = {zipCode: number};

type Props = {
    params: Params
}

export default async function Forecast({params} : Props) {

    console.log(params);

    const finalZipInfo = zipCodes.zip.find((zipCode) => {
        return zipCode.id === params.zipCode.toString();
    })

    if(!finalZipInfo){
        //Throw Error
        throw new Error("That Zip Code was not available for a forecast!")
    }

    //Fetch the grid points from the lat lon
    const gridResponse = await fetch(`https://api.weather.gov/points/${finalZipInfo.lat},${finalZipInfo.long}`);
    const grJson = await gridResponse.json();
    //console.log(grJson);

    const data = await fetch(grJson.properties.forecast);
    const results = await data.json() as ForecastReturn;
    //console.log(results)
    return (
        <div>
            {results.properties.periods.map((period) => (
                <div key={period.number}>
                    <h1>{period.detailedForecast}</h1>
                </div>
            ))}
        </div>
    )
}
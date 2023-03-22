import {ForecastReturn} from "@/app/weatherTypes";
import ForecastCard from "@/app/[zipCode]/ForecastCard";
import zipCodes from "@/utilities/zipCodes.json"

type Params = { zipCode: number };

type Props = {
    params: Params
}

export default async function Forecast({params}: Props) {
    const finalZipInfo = zipCodes.zip.find((zipCode) => {
        return zipCode.id === params.zipCode.toString();
    })

    if (!finalZipInfo) {
        //Throw Error
        throw new Error("That Zip Code was not available for a forecast!")
    }

    //Fetch the grid points from the lat lon
    const gridResponse = await fetch(`https://api.weather.gov/points/${finalZipInfo.lat},${finalZipInfo.long}`);
    const grJson = await gridResponse.json();

    //TODO How to validate this cache timing??
    const data = await fetch(grJson.properties.forecast, {next: {revalidate: 3600}});
    const results = await data.json() as ForecastReturn;
    return (
        <div>
            {results.properties.periods.map((period) => (
                <>
                    <ForecastCard
                        key={"ForeCastCard-" + period.number}
                        period={period}></ForecastCard>
                    <br/>
                    <br/>
                </>
            ))}
        </div>
    )
}
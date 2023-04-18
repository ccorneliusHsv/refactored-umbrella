import {ForecastReturn} from "@/types/weatherTypes";
import ForecastCard from "./ForecastCard";
import zipCodes from "@/utilities/zipCodes.json"

type Props = {
    results: ForecastReturn
}

export default function Forecast({results}: Props) {
    return (
        <div>
            {results.properties.periods.map((period) => (
                <ForecastCard
                    key={"ForeCastCard-" + period.number}
                    period={period}></ForecastCard>

            ))}
        </div>
    )
}

export async function getServerSideProps({params}: { params: { zipCode: string } }) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    //const res = await fetch(`https://.../posts/${params.id}`)
    //const post = await res.json()

    const finalZipInfo = zipCodes.zip.find((zipCode) => {
        return zipCode.id === params.zipCode.toString();
    })

    if (!finalZipInfo) {
        return {
            notFound: true,
        }
    }

    //Fetch the grid points from the lat lon
    const gridResponse = await fetch(`https://api.weather.gov/points/${finalZipInfo.lat},${finalZipInfo.long}`);
    const grJson = await gridResponse.json();
    if(!grJson.properties?.forecast){
        return {
            notFound: true,
        }
    }

    const data = await fetch(grJson.properties.forecast, {next: {revalidate: 3600}});
    const results = await data.json() as ForecastReturn;

    // Pass post data to the page via props
    return {props: {results}}
}

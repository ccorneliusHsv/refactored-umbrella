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


// Get Static Paths allows the server to know all of the possible routes to create at build time
export async function getStaticPaths() {

    // Call an external API endpoint to get posts
    //const res = await fetch('https://.../posts')
    //const posts = await res.json()

    // Get the paths we want to pre-render based on posts
    //const paths = posts.map((post) => ({
    //   params: { id: post.id },
    //}))

    const paths = zipCodes.zip.map((zipCode) => ({
            params: {zipCode: zipCode.id},
        })
    )

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return {paths, fallback: false}
}

export async function getStaticProps({params}: { params: { zipCode: string } }) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    //const res = await fetch(`https://.../posts/${params.id}`)
    //const post = await res.json()

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

    // Pass post data to the page via props
    return {props: {results}}
}

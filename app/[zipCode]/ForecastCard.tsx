import {ForecastReturn, PeriodsReturnType} from "@/app/weatherTypes";

type Props = {
    period: PeriodsReturnType
}


//TODO if we add images add domain to next config file

export default function ForecastCard( props: Props ) {
    return (
        <div key={props.period.number}>
            <h1>{props.period.detailedForecast}</h1>
        </div>
    )
}
import {ForecastReturn, PeriodsReturnType} from "@/app/weatherTypes";

type Props = {
    period: PeriodsReturnType
}

//TODO if we add images add domain to next config file
export default function ForecastCard( props: Props ) {
    return (
        <div key={props.period.number}>
            <h4>{"Start time = " + props.period.startTime + "  End Time = " + props.period.endTime}</h4>
            <h4>{props.period.detailedForecast}</h4>
        </div>
    )
}
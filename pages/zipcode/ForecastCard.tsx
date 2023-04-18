import {PeriodsReturnType} from "@/types/weatherTypes";


type Props = {
    period: PeriodsReturnType
}

//TODO if we add images add domain to next config file
export default function ForecastCard( props: Props ) {
    if(!props.period){
        return <></>
    }
    return (
        <div>
            <h3>{props.period.name}</h3>
            <h4>{"Start time = " + props.period?.startTime + "  End Time = " + props.period.endTime}</h4>
            <h4>{props.period.detailedForecast}</h4>
            <br/>
            <br/>
        </div>
    )
}
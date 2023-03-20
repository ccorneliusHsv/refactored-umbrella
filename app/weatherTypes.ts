export type ForecastReturn = {
    type: string,
    geometry: GeometryReturn,
    properties: PropertiesReturn
}

export type GeometryReturn = {
    type: string,
    coordinates: [[number, number]]
}

export type PropertiesReturn = {
    updated: string,
    units: string,
    generatedAt: string,
    updatedTime: string,
    validTimes: string,
    elevation: ElevationReturnType,
    periods: [PeriodsReturnType]
}

export type ElevationReturnType = {
    unitCode: string,
    value: number
}

export type PeriodsReturnType = {
    number: number,
    name: string,
    startTime: string,
    endTime: string,
    isDayTime: string,
    temperature: number,
    temperatureUnit: string,
    temperatureTrend: string | null,
    probabilityOfPrecipitation: UnitCodeValueComboType,
    dewpoint: UnitCodeValueComboType,
    relativeHumidity: UnitCodeValueComboType,
    windSpeed: string,
    windDirection: string,
    icon: string,
    shortForecast: string,
    detailedForecast: string
}

export type UnitCodeValueComboType = {
    unitCode: string,
    value: number | null
}
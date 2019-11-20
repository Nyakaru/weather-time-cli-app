export interface ILocationRes {
    data: {
        results: Array<{
            geometry
            formatted_address
        }>
    }
}

export interface IDarksApiResponse {
    data: {
        currently: {
            time: number
            temperature: number
        }
        timezone: string
    }
}

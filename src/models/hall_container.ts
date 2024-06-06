export interface HallContainer {
    id: number
    type: HallContainerType
}

export enum HallContainerType {
    SECTION = "section",
    STORE = "store",
}
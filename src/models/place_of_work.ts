import { Try } from "ts-try"

export interface PlaceOfWork {
    id: number
    type: PlaceOfWorkType
}

export enum PlaceOfWorkType {
    HALL = "hall",
    TRAY = "tray",
    KIOSK = "kiosk",
}

export function placeOfWorkTypeFromString(s: string): Try<PlaceOfWorkType> {
    switch(s) {
        case "hall":
            return PlaceOfWorkType.HALL
        case "tray":
            return PlaceOfWorkType.TRAY
        case "kiosk":
            return PlaceOfWorkType.KIOSK
        default:
            return new Error("Invalid place of work type")
    }
}
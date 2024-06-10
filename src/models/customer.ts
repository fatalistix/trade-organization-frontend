export interface Customer {
    id: number
    firstName: string
    lastName: string
    birthDate: Date
    phoneNumber: string
}

export namespace Customer { 
    export function birthDateToString(birthDate: Date): string {
        const monthNumber = birthDate.getMonth() + 1
        const month = Math.floor(monthNumber / 10) == 0 ? "0" + monthNumber : monthNumber

        const dayNumber = birthDate.getDate()
        const day = Math.floor(dayNumber / 10) == 0 ? "0" + dayNumber : dayNumber

        const birthDateStr = birthDate.getFullYear() + "-" + month + "-" + day
        return birthDateStr
    }
}
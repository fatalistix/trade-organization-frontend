import { numeric, required } from "@vuelidate/validators"

export const useSellerRules = () => ({
    firstName: {
        required,
    },
    lastName: {
        required,
    },
    middleName: {
        required,
    },
    birthDate: {
        required,
        custom: (s: string) => {
            const val = new Date(s)
            const now = new Date()
            if (val.getUTCFullYear() > now.getUTCFullYear()) {
                return false
            }
            if (val.getUTCFullYear() < now.getUTCFullYear()) {
                return true
            }
            if (val.getMonth() > now.getMonth()) {
                return false
            }
            if (val.getMonth() < now.getMonth()) {
                return true
            }
            if (val.getDate() >= now.getDate()) {
                return false
            }
            return true
        }
    },
    salaryRubles: {
        required,
        numeric,
        custom: (value: number) => (value >= 0) && (Math.trunc(value) == value),
    },
    salaryPennies: {
        required,
        numeric,
        custom: (value: number) => (value >= 0) && (value <= 99) && (Math.trunc(value) == value),
    },
    phoneNumber: {
        required,
    }
})
import { required } from "@vuelidate/validators";

export const useCustomerRules = () => ({
    firstName: {
        required
    },
    lastName: {
        required
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
    phoneNumber: {
        required
    },
})
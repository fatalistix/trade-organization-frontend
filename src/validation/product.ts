import { required } from "@vuelidate/validators";

export const useProductRules = () => ({
    name: {
        required,
    },
    description: {
        required
    }
})
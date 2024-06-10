import { required } from "@vuelidate/validators";

export const useOrderRules = () => ({
    supplierId: {
        required
    },
})
import { required } from "@vuelidate/validators";

export const useSupplierRules = () => ({
    name: {
        required,
    }
})
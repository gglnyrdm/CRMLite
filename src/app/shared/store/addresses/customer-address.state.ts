import { PostAddressRequest } from "../../../features/customers/models/requests/address/post-address-request";

export interface IndividualCustomerAddressState {
    individualCustomerAddress:PostAddressRequest;
}

export const initialIndividualCustomerAddressState:IndividualCustomerAddressState = {
    individualCustomerAddress:{
        customerId:'',
        cityId: '',
        cityName:'',
        houseFlatNumber: '',
        street: '',
        addressDescription: '',
        // isPrimaryAddress:false
    }
}
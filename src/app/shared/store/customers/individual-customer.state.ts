import { CreateCustomerRequest } from "../../../features/customers/models/requests/create-customer-request";

export interface IndividualCustomerState {
    individualCustomer:CreateCustomerRequest;
}

export const initialIndividualCustomerState:IndividualCustomerState = {
    individualCustomer:{
    firstName : '',
    middleName: '',
    lastName : '',
    gender : '',
    motherName : '',
    fatherName : '',
    birthDate : null,
    nationalityIdentity : ''
    }
}
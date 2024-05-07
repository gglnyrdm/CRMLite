export interface CreateCustomerRequest {
    firstName : string;
    middleName: string;
    lastName : string;
    email: string;
    gender : boolean;
    motherName : string;
    fatherName : string;
    birthDate : Date;
    nationalityIdentity : string;
}
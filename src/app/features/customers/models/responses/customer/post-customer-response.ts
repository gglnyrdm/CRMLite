export interface PostCustomerResponse {
    id: string;
    customerId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    gender: boolean;
    motherName: string;
    fatherName: string;
    birthDate: Date | null;
    nationalityIdentity: string;
  }
  
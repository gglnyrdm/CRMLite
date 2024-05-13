export interface PostCustomerResponse {
    id: number;
    customerId: number;
    firstName: string;
    middleName: string;
    lastName: string;
    gender: boolean;
    motherName: string;
    fatherName: string;
    birthDate: Date | null;
    nationalityIdentity: string;
  }
  
import { PostContactMediumRequest } from "../../../features/customers/models/requests/contactMedium/post-contact-medium-request";

export interface ContactMediumState {
  contactMedium: PostContactMediumRequest;
}

export const initialContactMediumState: ContactMediumState = {
  contactMedium: {
    customerId : '',
    email: '',
    homePhone: '',
    mobilePhone: '',
    fax: '',
  },
};

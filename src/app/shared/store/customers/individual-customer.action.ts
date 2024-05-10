import { createAction, props } from "@ngrx/store";
import { CreateCustomerRequest } from "../../../features/customers/models/requests/customer/create-customer-request";

export const setIndividualCustomer = createAction(
    '[Individual Customer] set individual customer',
    props<{individualCustomer:CreateCustomerRequest}>()
)


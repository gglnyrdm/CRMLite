import { createAction, props } from "@ngrx/store";
import { PostAddressRequest } from "../../../features/customers/models/requests/address/post-address-request";

export const setIndividualCustomerAddress = createAction(
    '[Individual Customer Address] set individual customer adress',
    props<{individualCustomerAddress:PostAddressRequest}>()
)

import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IndividualCustomerState } from "./individual-customer.state";

const selectIndividualCustomerState=createFeatureSelector<IndividualCustomerState>('individualCustomer')

export const selectIndividualCustomer=createSelector(
    selectIndividualCustomerState,
    (state:IndividualCustomerState)=>state.individualCustomer
)

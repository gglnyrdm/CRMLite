import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { individualCustomerReducer } from './shared/store/customers/individual-customer.reducer';
import { contactMediumReducer } from './shared/store/contactMedium/contact-medium.reducer';
import { individualCustomerAddressReducer } from './shared/store/addresses/customer-address.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    provideStore(),
    provideState({ name:'individualCustomer',reducer:individualCustomerReducer }),
    provideState({ name: 'individualCustomerAddress', reducer: individualCustomerAddressReducer }),
    provideState({ name: 'contactMedium', reducer: contactMediumReducer })
  ]
};

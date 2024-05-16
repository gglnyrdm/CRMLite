import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/auth/login-page/login-page/login-page.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { SearchCustomerComponent } from './pages/customer/search-customer/search-customer.component';
import { CreateCustomerComponent } from './pages/customer/create-customer/create-customer/create-customer.component';
import { ContactCustomerComponent } from './pages/customer/contact-customer/contact-customer.component';
import { CustomerProfileComponent } from './pages/customer/customer-profile/customer-profile.component';
import { CustomerInfoComponent } from './pages/customer/customer-info/customer-info.component';
import { CustomerAccountsComponent } from './pages/customer/customer-accounts/customer-accounts.component';
import { CustomerAddressComponent } from './pages/customer/customer-address/customer-address.component';
import { CustomerContactMediumComponent } from './pages/customer/customer-contact-medium/customer-contact-medium.component';
import { CustomerInfoFormComponent } from './features/customers/components/customer-info-form/customer-info-form.component';
import { CreateCustomerFormComponent } from './features/customers/components/create-customer-form/create-customer-form/create-customer-form.component';
import { CreateCustomerAddressInfoComponent } from './features/customers/components/create-customer-address-info/create-customer-address-info.component';
import { CreateCustomerAddressFormComponent } from './features/customers/components/create-customer-address-form/create-customer-address-form.component';
import { CustomerInfoAddressAddFormComponent } from './features/customers/components/customer-info-address-add-form/customer-info-address-add-form.component';
import { CustomerInfoContactFormComponent } from './features/customers/components/customer-info-contact-form/customer-info-contact-form.component';
import { CreateBillingAccountComponent } from './pages/billing-account/create-billing-account/create-billing-account.component';
import { UpdateBillingAccountComponent } from './pages/billing-account/update-billing-account/update-billing-account.component';
import { OfferSelectionComponent } from './pages/offer-selection/components/offer-selection/offer-selection.component';
import { CreateBillingAccountFormComponent } from './features/billing-account/components/create-billing-account-form/create-billing-account-form.component';
import { UpdateBillingAccountFormComponent } from './features/billing-account/components/update-billing-account-form/update-billing-account-form.component';
import { OfferSelectionAreaComponent } from './features/offer-selection/components/offer-selection-area/offer-selection-area.component';
import { ConfigurationProductComponent } from './pages/offer-selection/components/configuration-product/configuration-product.component';
import { SubmitOrderComponent } from './pages/offer-selection/components/submit-order/submit-order.component';

export const routes: Routes = [

    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'searchcustomer',
    },

    {
        path: 'login',
        component: LoginPageComponent,
    },
    {
        path: 'searchcustomer',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: SearchCustomerComponent
            },
        ]
    },
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: 'customer/:id',
                component: CustomerProfileComponent,
                children: [
                    {
                        path: 'info',
                        component: CustomerInfoComponent,
                    },
                    {
                        path: 'info-update',
                        component: CustomerInfoFormComponent,
                    },
                    {
                        path: 'customeraddress',
                        component: CustomerAddressComponent,
                    },
                    {
                        path: 'customeraccounts',
                        component: CustomerAccountsComponent,
                    },
                    {
                        path: 'customercontactmedium',
                        component: CustomerContactMediumComponent,
                    },
                    
                    {
                        path: 'customeraddress-add',
                        component: CustomerInfoAddressAddFormComponent,
                    },
                    {
                        path: 'customercontact-update',
                        component: CustomerInfoContactFormComponent,
                    }
                ],
            }
        ]
    },
    {
        path: 'createcustomer',
        component: CreateCustomerComponent,
        children: [
            {
                path: '',
                component: CreateCustomerFormComponent,
            },
            {
                path: 'addressinfo',
                component: CreateCustomerAddressInfoComponent
                // children:[
                //     {
                //         path: 'form',
                //         component: CreateCustomerAddressFormComponent,
                //     },
                // ]
            },
            {
                path: 'address',
                component: CreateCustomerAddressFormComponent,
            },
        ]
    },
    {
        path: 'createbillingaccount',
        component: CreateBillingAccountComponent,
        children: [
            {
                path: '',
                component: CreateBillingAccountFormComponent
            },
        ]
    },
    {
        path: 'updatebillingaccount',
        component: UpdateBillingAccountComponent,
        children: [
            {
                path: '',
                component: UpdateBillingAccountFormComponent
            },
        ]
    },
    {
        path: 'contactcustomer',
        component: ContactCustomerComponent
    },
    {
        path: 'offerselection',
        component: OfferSelectionComponent,
        children: [
            {
                path: '',
                component: OfferSelectionAreaComponent
            },
        ]
    },
    {
        path: 'configuration-product',
        component: ConfigurationProductComponent
    },
    {
        path: 'submit-order',
        component: SubmitOrderComponent
    }
];

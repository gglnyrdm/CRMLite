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
import { CustomerAddressInfoComponent } from './features/customers/components/customer-adress-info/customer-address-info/customer-address-info.component';
import { CreateCustomerFormComponent } from './features/customers/components/create-customer-form/create-customer-form/create-customer-form.component';

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
        children:[
            {
                path:'',
                pathMatch:'full',
                component:SearchCustomerComponent 
            },
         
            
        ]
    },
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path:'',
                component: CustomerProfileComponent,
                children: [
                    {
                        path: 'customerinfo',
                        component: CustomerInfoComponent,
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
                        path: 'customerinfo-update',
                        component: CustomerInfoFormComponent,
                    },
                ],
            }
        ]
    },
    {
        path:'createcustomer',
        component:CreateCustomerComponent,
        children: [
            {
                path: '',
                component: CreateCustomerFormComponent,
            },
            {
                path: 'addressinfo',
                component: CustomerAddressInfoComponent,
            },

        ]
    },
    {
        path:'contactcustomer',
        component:ContactCustomerComponent
    },
    
];

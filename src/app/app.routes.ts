import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/auth/login-page/login-page/login-page.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { SearchCustomerComponent } from './pages/customer/search-customer/search-customer.component';
import { CreateCustomerComponent } from './pages/customer/create-customer/create-customer/create-customer.component';
import { ContactCustomerComponent } from './pages/customer/contact-customer/contact-customer.component';

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
        path:'createcustomer',
        component:CreateCustomerComponent
    },
    {
        path:'contactcustomer',
        component:ContactCustomerComponent
    }

];

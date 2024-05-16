import { Component } from '@angular/core';
import { HeaderComponent } from "../../../../shared/components/header/header/header.component";
import { RouterModule } from '@angular/router';
import { ConfigurationProductInfoFormComponent } from "../../../../features/offer-selection/components/configuration-product-info-form/configuration-product-info-form.component";
import { ConfigurationModemInfoFormComponent } from "../../../../features/offer-selection/components/configuration-modem-info-form/configuration-modem-info-form.component";
import { ConfigurationAddressInfoComponent } from "../../../../features/offer-selection/components/configuration-address-info/configuration-address-info.component";

@Component({
    selector: 'app-configuration-product',
    standalone: true,
    templateUrl: './configuration-product.component.html',
    styleUrl: './configuration-product.component.scss',
    imports: [HeaderComponent, RouterModule, ConfigurationProductInfoFormComponent, ConfigurationModemInfoFormComponent, ConfigurationAddressInfoComponent]
})
export class ConfigurationProductComponent {

}

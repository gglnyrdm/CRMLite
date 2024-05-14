import { Component } from '@angular/core';
import { HeaderComponent } from "../../../../shared/components/header/header/header.component";
import { RouterModule } from '@angular/router';
import { ConfigurationProductInfoFormComponent } from "../../../../features/customers/components/configuration-product-form/configuration-product-info-form/configuration-product-info-form.component";

@Component({
    selector: 'app-configuration-product',
    standalone: true,
    templateUrl: './configuration-product.component.html',
    styleUrl: './configuration-product.component.scss',
    imports: [HeaderComponent, RouterModule, ConfigurationProductInfoFormComponent]
})
export class ConfigurationProductComponent {

}

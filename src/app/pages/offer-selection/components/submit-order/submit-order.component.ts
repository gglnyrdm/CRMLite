import { Component } from '@angular/core';
import { HeaderComponent } from "../../../../shared/components/header/header/header.component";

@Component({
    selector: 'app-submit-order',
    standalone: true,
    templateUrl: './submit-order.component.html',
    styleUrl: './submit-order.component.scss',
    imports: [HeaderComponent]
})
export class SubmitOrderComponent {

}

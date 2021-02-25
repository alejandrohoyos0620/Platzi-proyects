import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactComponent} from './components/contact/contact.component'

import {SharedModule} from './../shared/shared.module';
import {ContactRoutingModule} from './contact-routing.module';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [
        ContactComponent,
    ],
    imports: [
        CommonModule,
        ContactRoutingModule
    ]
})

export class ContactModule{

}
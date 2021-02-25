import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DemoRoutingModule} from './page-not-found-routing.module';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import { SharedModule } from './../shared/shared.module';



@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    DemoRoutingModule,
    SharedModule
  ],
})
export class PageNotFoundModule { }

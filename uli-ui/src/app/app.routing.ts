import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RawMaterialComponent } from './raw-material/raw-material.component';
import { ProductionStockListComponent } from './production-stock/list/production-stock-list.component';
import { JobOrderCreateComponent } from './production-stock/job-order-create/job-order-create.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'rawmaterials', component: RawMaterialComponent },
  { path: 'productionList', component: ProductionStockListComponent },
  { path: 'addEditJobOrder', component: JobOrderCreateComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { AppSharedService } from './app-shared.service';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RawMaterialComponent } from './raw-material/raw-material.component';
import { RawMaterialService } from './raw-material/raw-material.service';

import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap';
import { SubCategoryComponent } from './raw-material/sub-category/sub-category.component';
import { StockComponent } from './raw-material/stock/stock.component';
import { StockFilterPipe } from './raw-material/stock/stock.filter';
import { BasicCategoryComponent } from './raw-material/basic-category/basic-category.component';
import { HRComponent } from './raw-material/hr/hr.component';
import { ProductionStockListComponent } from './production-stock/list/production-stock-list.component';
import { JobOrderService } from './production-stock/job-order.service';
import { JobOrderCreateComponent } from './production-stock/job-order-create/job-order-create.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserProfileComponent,
    RawMaterialComponent,
    SubCategoryComponent,
    StockComponent,
    BasicCategoryComponent,
    HRComponent,
    StockFilterPipe,
    ProductionStockListComponent,
    JobOrderCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    TabsModule.forRoot()
  ],
  providers: [AppSharedService, RawMaterialService, JobOrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }

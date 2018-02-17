import { Component, OnInit, OnDestroy, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { RawMaterialService } from '../../raw-material/raw-material.service';
import { AppSharedService } from '../../app-shared.service';
import { JobOrderService } from '.././job-order.service';

@Component({
  selector: 'app-production-stock',
  templateUrl: './production-stock-list.component.html',
  styleUrls: ['./production-stock-list.component.scss']
})
export class ProductionStockListComponent implements OnInit, OnDestroy {

  //modalRef: BsModalRef;
  modalRef2: BsModalRef;

  jobOrders: any[];

  payment: any = { "paymentId": "", "amount": "", "date": "", "method": "", "addittionalInfo": "" }
  constructor(public router: Router, private appSharedService: AppSharedService, private modalService: BsModalService, private rawMaterialService: RawMaterialService, private jobOrderService: JobOrderService) { }


  ngOnInit() {
    this.loadAllJobOrders();
  }

  ngOnDestroy() {
    //this.appSharedService.setSelectedJobOrder(null);
  }
  addNewJobOrder() {
    this.appSharedService.setSelectedJobOrder(this.appSharedService.defaultJobOrder);
    this.router.navigate([`/addEditJobOrder`]);
  }

  loadAllJobOrders() {
    this.jobOrderService.getAllJobOrders()
      .subscribe(data => { this.jobOrders = data; },
      error => this.appSharedService.handleError(error, "ProductionStockComponent", "loadAllJobOrders"))
  }


  editOrder(jobOrder: any) {
    this.appSharedService.setSelectedJobOrder(jobOrder);
    this.router.navigate([`/addEditJobOrder`]);
  }


}

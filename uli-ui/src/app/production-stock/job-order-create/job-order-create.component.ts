import { Component, OnInit, OnDestroy, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { RawMaterialService } from '../../raw-material/raw-material.service';
import { AppSharedService } from '../../app-shared.service';
import { JobOrderService } from '.././job-order.service';



@Component({
  selector: 'app-job-order-create',
  templateUrl: './job-order-create.component.html',
  styleUrls: ['./job-order-create.component.scss']
})
export class JobOrderCreateComponent implements OnInit, OnDestroy {
  selectedOrder: any;
  orderStatus: any[];
  woodTypes: any[];
  payment: any = { "paymentId": "", "amount": "", "date": "", "method": "", "addittionalInfo": "" };
  rawmaterial: any = { "productionStockId": "", "categoryId": "", "subCategoryId": "", "stockId": "", "categoryLabel": "", "subCategoryLabel": "", "stockLabel": "", "availablity": "", "requirement": "", "createdOn": "" };
  modalRef2: BsModalRef;
  constructor(public router: Router, private appSharedService: AppSharedService, private modalService: BsModalService, private rawMaterialService: RawMaterialService, private jobOrderService: JobOrderService) { }


  ngOnInit() {
    this.selectedOrder = this.appSharedService.getSelectedJobOrder();
    this.orderStatus = this.appSharedService.jobOrderStatus();
    this.woodTypes = this.appSharedService.getWoodTypes();
    this.getBasicCategories();

  }
  ngOnDestroy() {
    this.appSharedService.setSelectedJobOrder(null);
  }

  resetJobCard() {
    this.selectedOrder = this.appSharedService.defaultJobOrder;
  }
  addNewJobCard() {
    this.resetJobCard();
  }
  disabled() {
    if (this.selectedOrder.orderNumber == "" || this.selectedOrder.itemName == "" || this.selectedOrder.quantity == ""
      || this.selectedOrder.clientName == "" || this.selectedOrder.clientMobile == "") { return true; } else { return false; }
  }
  disabledPayment() {
    if (this.payment.amount == "") { return true; }
    else { return false };
  }
  saveJobCard() {
    this.jobOrderService.saveJobOrder(this.selectedOrder)
      .subscribe(
      data => {
        this.resetJobCard();
        this.appSharedService.showNotification('top', 'center', 2, 'Saved Successfully');
        setTimeout(() => this.router.navigate([`/productionList`]), 200);

      },
      error => {
        this.resetJobCard();
        this.appSharedService.handleError(error, 'JobOrderCreateComponent', 'saveJobCard');
      }
      )
  }
  openPaymentHistory(template: TemplateRef<any>) {
    this.payment = { "paymentId": "", "amount": "", "dateOfPayment": "", "method": "", "addittionalInfo": "" };
    this.modalRef2 = this.modalService.show(template);
  }
  addNewPayment(payment: any) {
    this.payment = { "paymentId": "", "amount": "", "dateOfPayment": "", "method": "", "addittionalInfo": "" };
    this.selectedOrder.payments.push(payment)
  }
  deletePayment(payment) {
    this.selectedOrder.payments.splice(this.selectedOrder.payments.indexOf(payment), 1);
  }
  getTotalAdvanceReceived() {
    let sum: number = 0;
    for (let payment of this.selectedOrder.payments) {
      sum += parseInt(payment.amount);
    }
    return sum;
  }

  public basicCategories: any[];
  getBasicCategories() {
    this.basicCategories = [];
    this.subCategories = [];
    this.stock = [];
    this.rawMaterialService.getRawMaterialCategories()
      .subscribe(
      data => {
        this.basicCategories = data;
        this.rawmaterial.availablity = "";
        if (data.length > 0) {
          this.loadSubCategories(data[0].id);
        }
      },
      error => this.appSharedService.handleError(error, 'StockComponent', 'getBasicCategories')
      )
  }
  public subCategories: any[];
  getSubCategories(event: any) {
    let categoryId: any = event.target.value;
    let categoryLabel: any = "";
    for (var i = 0; i < this.basicCategories.length; i++) {
      if (this.basicCategories[i].id == categoryId) {
        categoryLabel = this.basicCategories[i].name;
      }
    }
    this.rawmaterial.availablity = "";
    this.rawmaterial.categoryId = categoryId;
    this.rawmaterial.categoryLabel = categoryLabel;
    this.loadSubCategories(categoryId);
  }
  loadSubCategories(categoryId: any) {
    this.subCategories = [];
    this.stock = [];
    this.rawMaterialService.getSpecificSubCategories(categoryId)
      .subscribe(
      data => this.subCategories = data,
      error => this.appSharedService.handleError(error, 'StockComponent', 'loadSubCategories')
      )
  }

  public stock: any[];
  getStock(event: any) {
    let subCategoryId: any = event.target.value;
    let subCategoryLabel: any = "";
    for (var i = 0; i < this.subCategories.length; i++) {
      if (this.subCategories[i].id == subCategoryId) {
        alert(JSON.stringify(this.subCategories[i]))
        subCategoryLabel = this.subCategories[i].name;
      }
    }
    this.rawmaterial.subCategoryId = subCategoryId;
    this.rawmaterial.subCategoryLabel = subCategoryLabel;
    this.rawmaterial.availablity = "";
    this.loadStock(subCategoryId);
  }
  loadStock(subCategoryId: any) {
    this.stock = [];
    this.rawMaterialService.getCatagorizedStock(subCategoryId)
      .subscribe(
      data => this.stock = data,
      error => this.appSharedService.handleError(error, 'StockComponent', 'loadStock')
      )
  }
  getStockLabel(stock: any) {
    if (stock.length != 0 && stock.width != 0 && stock.thickness != 0) {
      return stock.length + "' " + stock.width + "\" " + stock.thickness + "\" ";
    } else {
      return stock.quantity + " No's"
    }
  }
  stockSelected(event: any) {
    let selectedItem: any = event.target.value;
    this.rawmaterial.stockId = selectedItem;
    for (let stockItem of this.stock) {
      if (stockItem.id == selectedItem) {
        this.rawmaterial.availablity = stockItem.quantity;
        this.rawmaterial.stockLabel = this.getStockLabel(stockItem);
      }
    }

  }
  rawMaterials: any[] = [];
  addRawMaterials() {
    if (this.rawmaterial.createdOn == "") {
      this.rawmaterial.createdOn = new Date();
    }
    this.rawMaterials.push(this.rawmaterial);
    this.rawmaterial = { "productionStockId": "", "categoryId": "", "subCategoryId": "", "stockId": "", "categoryLabel": "", "subCategoryLabel": "", "stockLabel": "", "availablity": "", "requirement": "", "createdOn": "" };
  }
  deleteFromRawMaterials(matrerial: any) {
    this.rawMaterials.splice(this.rawMaterials.indexOf(matrerial), 1);
  }
  isDisabledAddtoProductionStock() {
    if (this.rawmaterial.availablity != 0 && this.rawmaterial.requirement > 0 && (this.rawmaterial.availablity >= this.rawmaterial.requirement)) {
      return false;
    } else {
      return true;
    }
  }

}

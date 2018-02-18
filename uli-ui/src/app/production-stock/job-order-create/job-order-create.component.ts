import { Component, OnInit, OnDestroy, Input, TemplateRef, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { RawMaterialService } from '../../raw-material/raw-material.service';
import { AppSharedService } from '../../app-shared.service';
import { JobOrderService } from '.././job-order.service';
import { TabsetComponent } from 'ngx-bootstrap';



@Component({
  selector: 'app-job-order-create',
  templateUrl: './job-order-create.component.html',
  styleUrls: ['./job-order-create.component.css']
})
export class JobOrderCreateComponent implements OnInit, OnDestroy {
  @ViewChild('staticTabs') staticTabs: TabsetComponent;
  selectedOrder: any;
  orderStatus: any[];
  woodTypes: any[];
  payment: any = { "paymentId": "", "amount": "", "date": "", "method": "", "addittionalInfo": "", "createdDate": "" };
  labour: any = { "labourStockId":"","date": "", "specialization": "", "labourId": "", "labourName": "", "startTime": { "hour": "", "minute": "" }, "endTime": { "hour": "", "minute": "" }, "duration": { "hour": "", "minute": "" }, "basicWage": "", "wageForDay": "", "comments": "", "createdOn": "" };
  rawmaterial: any = { "productionStockId": "", "categoryId": "", "subCategoryId": "", "stockId": "", "categoryLabel": "", "subCategoryLabel": "", "stockLabel": "", "availablity": "", "requirement": "", "createdOn": "", "basePrice": "", "price": "", "additionalAmt": "", "volume": "", "comments": "" };
  labourSpecialization = [{ "type": "Carpenter" }, { "type": "Painter" }, { "type": "Upholstery" }, { "type": "Miscellaneous" }]
  hours = [{ "label": "01 AM", "value": "1" }, { "label": "02 AM", "value": "2" }, { "label": "03 AM", "value": "3" }, { "label": "04 AM", "value": "4" }, { "label": "05 AM", "value": "5" }, { "label": "06 AM", "value": "6" },
  { "label": "07 AM", "value": "7" }, { "label": "08 AM", "value": "8" }, { "label": "09 AM", "value": "9" }, { "label": "10 AM", "value": "10" }, { "label": "11 AM", "value": "11" }, { "label": "12 PM", "value": "12" },
  { "label": "01 PM", "value": "13" }, { "label": "02 PM", "value": "14" }, { "label": "03 PM", "value": "15" }, { "label": "04 PM", "value": "16" }, { "label": "05 PM", "value": "17" }, { "label": "06 PM", "value": "18" },
  { "label": "07 PM", "value": "19" }, { "label": "08 PM", "value": "20" }, { "label": "09 PM", "value": "21" }, { "label": "10 PM", "value": "22" }, { "label": "11 PM", "value": "23" }, { "label": "12AM", "value": "0" }]
    ;
  minutes = [{ "label": "00 Min", "value": "0" }, { "label": "15 Min", "value": "15" }, { "label": "30 Min", "value": "30" }, { "label": "45 Min", "value": "45" }];

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
    this.payment = { "paymentId": "", "amount": "", "dateOfPayment": "", "method": "", "addittionalInfo": "", "createdDate": "" };
    this.modalRef2 = this.modalService.show(template);
  }

  addNewPayment(paymentt: any) {
    this.payment = { "paymentId": "", "amount": "", "dateOfPayment": "", "method": "", "addittionalInfo": "", "createdDate": "" };
    paymentt.createdDate = new Date();
    this.selectedOrder.payments.push(paymentt)
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
        subCategoryLabel = this.subCategories[i].name;
        this.rawmaterial.basePrice = this.subCategories[i].price;
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
        this.rawmaterial.availablity = this.calculateAvailablity(stockItem.id, stockItem.quantity);
        this.rawmaterial.stockLabel = this.getStockLabel(stockItem);
        if (stockItem.length == "" && stockItem.width == "" && stockItem.thickness == "") {
          this.rawmaterial.volume = 1;
        } else {
          this.rawmaterial.volume = ((stockItem.length * stockItem.width * stockItem.thickness) / 144);
        }
      }
    }
    this.calculatePrice();
  }
  calculateAvailablity(stockId: any, availablity: any) {
    for (let temp of this.selectedOrder.productionStock) {
      if (temp.stockId == stockId && (temp.productionStockId == null || temp.productionStockId == "")) {
        availablity -= temp.requirement;
      }
    }
    return availablity;
  }
  calculatePrice() {
    if (this.rawmaterial.requirement == "") { this.rawmaterial.requirement = 1; }
    this.rawmaterial.price = parseFloat("" + ((this.rawmaterial.volume * this.rawmaterial.basePrice * this.rawmaterial.requirement * 100) / 100)).toFixed(2);;

  }
  //rawMaterials: any[] = [];
  addRawMaterials() {
    if (this.rawmaterial.createdOn == "") {
      this.rawmaterial.createdOn = new Date();
    }
    this.rawmaterial.price = parseFloat("" + ((this.rawmaterial.volume * this.rawmaterial.basePrice * this.rawmaterial.requirement * 100) / 100)).toFixed(2);;
    this.selectedOrder.productionStock.push(this.rawmaterial);
    this.rawmaterial = { "productionStockId": "", "categoryId": "", "subCategoryId": "", "stockId": "", "categoryLabel": "", "subCategoryLabel": "", "stockLabel": "", "availablity": "", "requirement": "", "createdOn": "", "basePrice": "", "price": "", "additionalAmt": "", "volume": "", "comments": "" };
  }
  deleteFromRawMaterials(matrerial: any) {
    this.selectedOrder.productionStock.splice(this.selectedOrder.productionStock.indexOf(matrerial), 1);
  }
  isDisabledAddtoProductionStock() {
    if (this.rawmaterial.availablity != 0 && this.rawmaterial.requirement > 0 && (this.rawmaterial.availablity >= this.rawmaterial.requirement)) {
      return false;
    } else {
      return true;
    }
  }

  public labours: any[];
  getLabours(event: any) {
    let spec: any = event.target.value;
    this.rawMaterialService.getLaboursForSpecialization(spec)
      .subscribe(
        data => {
          this.labours = data;
        },
        error => {
          this.appSharedService.handleError(error, 'JobOrderCreateComponent', 'getLabours');
        }
      )
  }
  labourSelected(event: any) {
    let selectedItem: any = event.target.value;
    this.labour.labourId = selectedItem;
    for (let temp of this.labours) {
      if (temp.id == selectedItem) {
        this.labour.labourName = temp.name;
        this.labour.basicWage = temp.wage;
      }
    }

  }
  calculateDuration() {
    if (this.labour.startTime.hour != "" && this.labour.startTime.minute == "") {
      this.labour.startTime.minute = 0;
    }

    if (this.labour.endTime.hour != "" && this.labour.endTime.minute == "") {
      this.labour.endTime.minute = 0;
    }

    if (this.labour.startTime.hour == "" && this.labour.endTime.hour == "") {
      this.labour.duration = { "hour": "0", "minute": "0" }
    } else if ((this.labour.startTime.hour != "" && this.labour.endTime.hour != "")) {
      if (parseInt(this.labour.endTime.hour) < parseInt(this.labour.startTime.hour)) {
        alert('Invalid1');
      } else {
        this.labour.duration.hour = parseInt(this.labour.endTime.hour) - parseInt(this.labour.startTime.hour);
      }
      if (parseInt(this.labour.endTime.minute) < parseInt(this.labour.startTime.minute)) {
        if (parseInt(this.labour.endTime.hour) <= parseInt(this.labour.startTime.hour)) {
          alert('Invalid2');
        } else {
          this.labour.duration.hour = parseInt(this.labour.endTime.hour) - parseInt(this.labour.startTime.hour) - 1;
          this.labour.duration.minute = 60 - (parseInt(this.labour.startTime.minute) - parseInt(this.labour.endTime.minute));
        }
      } else {
        this.labour.duration.minute = parseInt(this.labour.endTime.minute) - parseInt(this.labour.startTime.minute);
      }
    }
    this.calculateWage();
  }
  getDuration() {
    return this.labour.duration.hour + " H : " + this.labour.duration.minute + "  Mins";
  }

  calculateWage() {
    let hourlyWage = parseInt(this.labour.basicWage) / 8;
    let minuteWage = hourlyWage / 60;
    this.labour.wageForDay = ((parseFloat(this.labour.duration.hour) * hourlyWage * 100) / 100) + ((parseFloat(this.labour.duration.minute) * minuteWage * 100) / 100)
  }
  addLabour() {
    if (this.labour.createdOn == "") {
      this.labour.createdOn = new Date();
    }
    this.calculateWage();
    this.selectedOrder.labours.push(this.labour);
    this.labour = { "labourStockId":"","date": "", "specialization": "", "labourId": "", "labourName": "", "startTime": { "hour": "", "minute": "" }, "endTime": { "hour": "", "minute": "" }, "duration": { "hour": "", "minute": "" }, "basicWage": "", "wageForDay": "", "comments": "", "createdOn": "" };
  }
  deleteFromLabours(labour: any) {
    this.selectedOrder.labours.splice(this.selectedOrder.labours.indexOf(labour), 1);
  }
  isDisabledAddLabour() {
    if (this.labour.id != 0 && (this.labour.duration.hour > 0 || this.labour.duration.minute > 0) && (this.labour.date != "")) {
      return false;
    } else {
      return true;
    }
  }

}

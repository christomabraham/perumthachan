import { Component, OnInit, Input, TemplateRef, Output, EventEmitter } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { RawMaterialService } from '../raw-material.service';
import { AppSharedService } from '../../app-shared.service';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  public stockItems: any[];
  modalRef: BsModalRef;
  stockElement: any;
  filterCategory:any;
  constructor(private appSharedService: AppSharedService, private modalService: BsModalService, private rawMaterialService: RawMaterialService) { }

  ngOnInit() {
    this.loadStockItems();
    this.getBasicCategories()
  }
  loadStockItems() {
    this.rawMaterialService.getStock()
      .subscribe(
      data => this.stockItems = data,
      error => this.appSharedService.handleError(error, 'StockComponent', 'loadStockItems')
      )
  }
  public basicCategories: any[];
  getBasicCategories() {
    this.rawMaterialService.getRawMaterialCategories()
      .subscribe(
      data => {
        this.basicCategories = data;
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
    this.loadSubCategories(categoryId);
  }
  loadSubCategories(categoryId: any) {
    this.rawMaterialService.getSpecificSubCategories(categoryId)
      .subscribe(
      data => this.subCategories = data,
      error => this.appSharedService.handleError(error, 'StockComponent', 'loadSubCategories')
      )
  }

  addStockItem(template: TemplateRef<any>) {
    this.resetSubCategoryElement();
    this.getBasicCategories()
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }
  resetSubCategoryElement() {
    this.stockElement = { "id": "", "createdDate": "", "updatedDate": "", "categoryid": "", "subcategory": { "id": "" }, "length": "", "width": "", "thickness": "", "quantity": "" ,"stockType":"RM"}
  }
  editElement(stock: any, template: TemplateRef<any>) {
    this.basicCategories = [{ "id": stock.categoryid, "name": stock.subcategory.category.name }];
    this.subCategories = [{ "id": stock.subcategory.id, "name": stock.subcategory.name }];
    this.stockElement = stock;
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }
  closeModal() {
    this.resetSubCategoryElement();
    this.modalRef.hide();
  }
  saveNewStock() {
    this.rawMaterialService.addToStock(this.stockElement)
      .subscribe(
      data => {
        this.modalRef.hide();
        this.resetSubCategoryElement();
        this.appSharedService.showNotification('top', 'center', 2, 'Saved Successfully');
        this.loadStockItems();
      },
      error => {
        this.modalRef.hide();
        this.resetSubCategoryElement();
        this.appSharedService.handleError(error, 'StockComponent', 'saveNewStock');
      }
      )
  }

  disabled() {
    if (this.stockElement.categoryid == "" || this.stockElement.subcategory.id == "" || parseInt(this.stockElement.quantity) < 0) { return true; } else { return false; }
  }

}

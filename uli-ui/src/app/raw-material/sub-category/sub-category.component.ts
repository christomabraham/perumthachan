import { Component, OnInit, Input, TemplateRef, Output, EventEmitter } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { RawMaterialService } from '../raw-material.service';
import { AppSharedService } from '../../app-shared.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {
  modalRef: BsModalRef;
  subCategoryElement: any;
  avaliableCategories: any[];
  basicCategories: any[];
  constructor(private appSharedService: AppSharedService,private modalService: BsModalService, private rawMaterialService: RawMaterialService) { }

  ngOnInit() {
    this.loadRawMaterialSubCategories();
    this.getBasicCategories();
  }
  loadRawMaterialSubCategories() {
    this.rawMaterialService.getRawMaterialSubCategories()
      .subscribe(
      data => this.avaliableCategories = data,
      error => this.appSharedService.handleError(error, 'SubCategoryComponent', 'loadRawMaterialSubCategories')
      )
  }
  getBasicCategories() {
    this.rawMaterialService.getRawMaterialCategories()
      .subscribe(
      data => {
        this.basicCategories = data;
      },
      error => this.appSharedService.handleError(error, 'StockComponent', 'getBasicCategories')
      )
  }
  saveNewSubCategory() {
    this.rawMaterialService.addRawMaterialSubCategory(this.subCategoryElement)
      .subscribe(
      data => {
        //this.subCategoryComponentResponse.emit(true);
        this.modalRef.hide();
        this.resetSubCategoryElement();
        this.appSharedService.showNotification('top', 'center', 2, 'Saved Successfully');
        this.loadRawMaterialSubCategories();
      },
      error => {
        this.modalRef.hide();
        this.resetSubCategoryElement();
        this.appSharedService.handleError(error, 'SubCategoryComponent', 'saveNewSubCategory');
      }
      )
  }
  addSubCategory(template: TemplateRef<any>) {
    this.resetSubCategoryElement();
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }
  disabled() {
    if (this.subCategoryElement.name.trim() == "" || this.subCategoryElement.price.trim == ""
      || parseInt(this.subCategoryElement.price) == 0 || this.subCategoryElement.category.id == "") { return true; } else { return false; }
  }
  subCategoryChange(event: any) {
    this.subCategoryElement.category.id = event.target.value;
  }

  closeModal() {
    this.resetSubCategoryElement();
    this.modalRef.hide();

  }
  resetSubCategoryElement() {
    this.subCategoryElement = { "name": "", "price": "", "description": "", "category": { "id": "" }, "supplier": { "id": "", "name": "", "company": "", "email": "", "address": "", "mobile": "" } }
  }
  editElement(subCategory: any, template: TemplateRef<any>) {
    if (subCategory.supplier == null) {
      subCategory.supplier = { "id": "", "name": "", "company": "", "email": "", "mobile": "", "address": "" };
    }
    this.subCategoryElement = subCategory;
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }
  getSupplierDetails(subCategory: any) {
    if (subCategory.supplier == null) { return "" }
    if (subCategory.supplier.name != null && subCategory.supplier.name.trim() != "") { return subCategory.supplier.name };
    if (subCategory.supplier.address != null && subCategory.supplier.address.trim() != "") { return subCategory.supplier.address }
    if (subCategory.supplier.email != null && subCategory.supplier.email.trim() != "") { return subCategory.supplier.email }
    if (subCategory.supplier.mobile != null && subCategory.supplier.mobile.trim() != "") { return subCategory.supplier.mobile }
    if (subCategory.supplier.company != null && subCategory.supplier.company.trim() != "") { return subCategory.supplier.company }
    return "";
  }
}

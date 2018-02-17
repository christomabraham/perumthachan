import { Component, OnInit, Input, TemplateRef, Output, EventEmitter } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { RawMaterialService } from '../raw-material.service';
import { AppSharedService } from '../../app-shared.service';

@Component({
  selector: 'app-hr',
  templateUrl: './hr.component.html',
  styleUrls: ['./hr.component.scss']
})
export class HRComponent implements OnInit {
  public hrResources: any[];
  modalRef: BsModalRef;
  hrElement: any;
  avaliableSpecialization = [{ "type": "Carpenter" }, { "type": "Painter" }, { "type": "Upholstery" }, { "type": "Miscellaneous" }]
  constructor(private appSharedService: AppSharedService, private modalService: BsModalService, private rawMaterialService: RawMaterialService) { }

  ngOnInit() {
    this.loadHRList();
  }
  loadHRList() {
    this.rawMaterialService.getHRDetails()
      .subscribe(
      data => this.hrResources = data,
      error => this.appSharedService.handleError(error, 'HRComponent', 'loadHRList')
      )
  }
  addHR(template: TemplateRef<any>) {
    this.resetHrElement();
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }
  saveNewHR() {
    this.rawMaterialService.addToHRStock(this.hrElement)
      .subscribe(
      data => {
        this.modalRef.hide();
        this.resetHrElement();
        this.appSharedService.showNotification('top', 'center', 2, 'Saved Successfully');
        this.loadHRList();
      },
      error => {
        this.modalRef.hide();
        this.resetHrElement();
        this.appSharedService.handleError(error, 'HRComponent', 'saveNewHR');
      }
      )
  }
  editElement(hr: any, template: TemplateRef<any>) {
    this.hrElement = hr;
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }
  resetHrElement() {
    this.hrElement = { id: "", "name": "", "address": "", "mobile": "", "specialization": "", "wage": "", "createdDate": "", "modifiedDate": "" }
  }
  disabled() {
    if (this.hrElement.name.trim() == "" || this.hrElement.wage == "" || this.hrElement.specilization == "") { return true } else { return false; }
  }
  closeModal() {
    this.resetHrElement();
    this.modalRef.hide();
  }
}

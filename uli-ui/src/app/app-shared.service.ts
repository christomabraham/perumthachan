import { Injectable, EventEmitter, Output } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';

import { Router } from '@angular/router';
declare var $: any;

@Injectable()
export class AppSharedService {
  public showNotification(from, align, messageType, message) {
    const type = ['', 'info', 'success', 'warning', 'danger'];

    const color = messageType;

    $.notify({
      icon: "notifications",
      message: `${message}`

    }, {
        type: type[color],
        timer: 4000,
        placement: {
          from: from,
          align: align
        }
      });
  }
  public handleError(error: any, component: string, method: string) {
    this.showNotification('top', 'center', 4, `Error @ ${component} @ ${method}() ` + error)
    console.error(`An error occurred in ${component} @ ${method}`, error);
  }

  public handleErrorObservable(error: any, component: string, method: string): Observable<any> {
    console.error(`An error occurred in ${component} @ ${method}`, error);
    return Observable.throw(error.message || error);
  }

  public getWoodTypes() {
    return [{ "type": "Teak" }, { "type": "Anjily" }, { "type": "JackWood" }, { "type": "Mahagony" }, { "type": "Other" }]
  }
  public jobOrderStatus() {
    return [{ "type": "Order Created" }, { "type": "In-Progress Carpentry" }, { "type": "In-Progress Painting" }, { "type": "In-Progress Upholstry" }, { "type": "Completed" }, { "type": "Delivered" }]
  }

  defaultJobOrder: any = { "id": "", "orderNumber": "", "itemName": "", "quantity": "", "description": "", "woodType": "", "orderDate": "", "deliveryDate": "", "expectedCost": "", "advancePaid": "", "clientName": "", "clientMobile": "", "clientAddress": "", "comments": "", "orderStatus": "", "createdDate": "", "modofiedDate": "", "payments": [] };
  selectedJobOrder: any = null;
  public setSelectedJobOrder(jobOrder: any) {
    this.selectedJobOrder = jobOrder;
  }
  public getSelectedJobOrder() {
    if (this.selectedJobOrder == null) {
      this.selectedJobOrder = this.defaultJobOrder;
    }
    return this.selectedJobOrder;
  }
}

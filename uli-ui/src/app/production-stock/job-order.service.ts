import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import { AppSharedService } from '../app-shared.service';

@Injectable()
export class JobOrderService {

  constructor(private appSharedService: AppSharedService, private http: Http) { }

  public getAllJobOrders(): Observable<any> {
    return this.http.get(`http://localhost:8080/chuttika/jobOrder/getAllJobOrders`)
      .map(response => { return response.json(); })
      .catch(error => { return this.appSharedService.handleErrorObservable(error, 'JobOrderService', 'getAllJobOrders') })
  }

  public saveJobOrder(data: any): Observable<any> {
    if (data.id == null || data.id == undefined || data.id == 0) {
      data.createdDate = new Date();
    } else {
      data.modifiedDate = new Date();
    }
    return this.http.post(`http://localhost:8080/chuttika/jobOrder/saveJobOrder`, data)
      .map(response => { return response.json(); })
      .catch(error => { return this.appSharedService.handleErrorObservable(error, 'JobOrderService', 'saveJobOrder') })
  }
}

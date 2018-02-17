import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import { AppSharedService } from '../app-shared.service';

@Injectable()
export class RawMaterialService {

  constructor(private appSharedService: AppSharedService, private http: Http) { }

  public getRawMaterialCategories(): Observable<any> {
    return this.http.get(`http://localhost:8080/chuttika/rawmaterials/getRawMaterialCategories`)
      .map(response => { return response.json(); })
      .catch(error => { return this.appSharedService.handleErrorObservable(error, 'RawMaterialService', 'getRawMaterialCategories') })
  }

  public getRawMaterialSubCategories(): Observable<any> {
    return this.http.get(`http://localhost:8080/chuttika/rawmaterials/getRawMaterialSubCategories`)
      .map(response => { return response.json(); })
      .catch(error => { return this.appSharedService.handleErrorObservable(error, 'RawMaterialService', 'getRawMaterialSubCategories') })
  }
  public getSpecificSubCategories(categoryId: any): Observable<any> {
    return this.http.get(`http://localhost:8080/chuttika/rawmaterials/getSpecificRawMaterialSubCategories?categoryId=${categoryId}`)
      .map(response => { return response.json(); })
      .catch(error => { return this.appSharedService.handleErrorObservable(error, 'RawMaterialService', 'getSpecificSubCategories') })
  }


  public addRawMaterialSubCategory(data: any): Observable<any> {
    return this.http.post(`http://localhost:8080/chuttika/rawmaterials/addRawMaterialSubCategory`, data)
      .map(response => { return response.json(); })
      .catch(error => { return this.appSharedService.handleErrorObservable(error, 'RawMaterialService', 'addRawMaterialSubCategory') })
  }

  public getStock(): Observable<any> {
    return this.http.get(`http://localhost:8080/chuttika/rawmaterials/getStockList`)
      .map(response => { return response.json(); })
      .catch(error => { return this.appSharedService.handleErrorObservable(error, 'RawMaterialService', 'getRawMaterialStock') })
  }
  public getCatagorizedStock(subCategoryId:string): Observable<any> {
    return this.http.get(`http://localhost:8080/chuttika/rawmaterials/getCatagorizedStock?subCategoryId=${subCategoryId}`)
      .map(response => { return response.json(); })
      .catch(error => { return this.appSharedService.handleErrorObservable(error, 'RawMaterialService', 'getCatagorizedStock') })
  }
  public addToStock(data: any): Observable<any> {
    if (data.id == null || data.id == undefined || data.id == 0) {
      data.createdDate = new Date();
    } else {
      data.updatedDate = new Date();
    }
    return this.http.post(`http://localhost:8080/chuttika/rawmaterials/addToStock`, data)
      .map(response => { return response.json(); })
      .catch(error => { return this.appSharedService.handleErrorObservable(error, 'RawMaterialService', 'addToStock') })
  }
  public getHRDetails(): Observable<any> {
    return this.http.get(`http://localhost:8080/chuttika/rawmaterials/getHRList`)
      .map(response => { return response.json(); })
      .catch(error => { return this.appSharedService.handleErrorObservable(error, 'RawMaterialService', 'getHRDetails') })
  }

  public addToHRStock(data: any): Observable<any> {
    if (data.id == null || data.id == undefined || data.id == 0) {
      data.createdDate = new Date();
    } else {
      data.modifiedDate = new Date();
    }
    return this.http.post(`http://localhost:8080/chuttika/rawmaterials/addToHRStock`, data)
      .map(response => { return response.json(); })
      .catch(error => { return this.appSharedService.handleErrorObservable(error, 'RawMaterialService', 'addToHRStock') })
  }
}

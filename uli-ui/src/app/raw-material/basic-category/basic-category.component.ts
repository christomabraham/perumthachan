import { Component, OnInit } from '@angular/core';
import { RawMaterialService } from '../raw-material.service'
import { AppSharedService } from '../../app-shared.service';
declare var $: any;

@Component({
  selector: 'app-basic-category',
  templateUrl: './basic-category.component.html',
  styleUrls: ['./basic-category.component.scss']
})
export class BasicCategoryComponent implements OnInit {
  public avaliableCategories: any[];
  constructor(private appSharedService:AppSharedService,private rawMaterialService: RawMaterialService) { }

  ngOnInit() {
    this.loadRawMaterialCategories();
  }
  loadRawMaterialCategories() {
    this.rawMaterialService.getRawMaterialCategories()
      .subscribe(
      data => this.avaliableCategories = data,
      error => this.appSharedService.handleError(error, 'BasicCategoryComponent', 'loadRawMaterialCategories')
      )
  }
}

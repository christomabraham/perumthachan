import { Component, OnInit } from '@angular/core';
import { RawMaterialService } from './raw-material.service'


@Component({
  selector: 'app-raw-material',
  templateUrl: './raw-material.component.html',
  styleUrls: ['./raw-material.component.scss']
})
export class RawMaterialComponent implements OnInit {

  constructor(private rawMaterialService: RawMaterialService) { }

  public selectedType:string="stock";
  ngOnInit() {

  }

  private handleError(error: any, method: string) {
    console.error('An error occurred in RawMaterialComponent @ method' + method, error);
  }

}

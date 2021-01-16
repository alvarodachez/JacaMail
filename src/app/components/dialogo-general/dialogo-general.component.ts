import { Component, Inject, OnInit } from '@angular/core';
import { DialogTypes, DialogDataType } from './dialog-data-type';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo-general',
  templateUrl: './dialogo-general.component.html',
  styleUrls: ['./dialogo-general.component.scss']
})
export class DialogoGeneralComponent implements OnInit {

  public dialogTypesClass = DialogTypes;

  constructor(@Inject(MAT_DIALOG_DATA) public data:DialogDataType) { }

  ngOnInit(): void {
  }

}

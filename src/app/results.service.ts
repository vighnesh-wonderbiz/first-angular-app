import { Injectable } from '@angular/core';
import { MyFormData } from './my-form-data';
@Injectable({
  providedIn: 'root',
})
export class ResultsService {
  protected myFormData: MyFormData[] = [];
  constructor() {}

  getAllValues(): MyFormData[] {
    return this.myFormData;
  }

  insertData(data: MyFormData): MyFormData[] {
    this.myFormData.push(data);
    console.log(JSON.stringify(this.myFormData));
    // alert(JSON.stringify(this.myFormData));
    return this.myFormData;
  }
}

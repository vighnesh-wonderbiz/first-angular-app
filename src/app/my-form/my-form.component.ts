import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ResultsService } from '../results.service';
import { MyFormData } from '../my-form-data';
import { NgFor } from '@angular/common';
import { MyTableComponent } from '../my-table/my-table.component';

@Component({
  selector: 'app-my-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgFor, MyTableComponent],
  template: `
    <form [formGroup]="submitForm" (submit)="submitMyForm()">
      <label for="name">
        Name:
        <input
          autocomplete="off"
          type="text"
          id="name"
          placeholder="Enter your name"
          formControlName="name"
        />
        <p style="color:red;" [hidden]="!nameErr">Please provide name</p>
      </label>
      <label for="age">
        Age:
        <input
          autocomplete="off"
          id="age"
          name="age"
          type="number"
          placeholder="Enter your age"
          formControlName="age"
        />
        <p style="color:red;" [hidden]="!ageErr">Please provide age</p>
      </label>
      <label for="#">
        Languages Known:
        <div *ngFor="let lang of languages">
          <label [for]="lang.label">
            <input
              type="checkbox"
              [checked]="lang.selected"
              value="{{ lang.label }}"
              (change)="handleChange($event)"
              [id]="lang.label"
            />{{ lang.label }}
          </label>
        </div>
        <p style="color:red;" [hidden]="!langErr">
          Please provide languages known
        </p>
      </label>
      <label>
        Gender:
        <label>
          <input type="radio" value="male" formControlName="gender" />
          Male
        </label>
        <label>
          <input
            type="radio"
            value="female"
            name="gender"
            formControlName="gender"
          />
          Female
        </label>
        <p style="color:red;" [hidden]="!genderErr">Please provide gender</p>
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
    <app-my-table [allData]="allData"></app-my-table>
  `,
  styleUrl: './my-form.component.css',
})
export class MyFormComponent {
  nameErr: boolean = false;
  ageErr: boolean = false;
  langErr: boolean = false;
  genderErr: boolean = false;

  languages = [
    { label: 'Python', selected: false },
    { label: 'JavaScript', selected: false },
    { label: 'C++', selected: false },
    { label: 'C#', selected: false },
  ];

  handleChange(event: any) {
    const checked = event.target.checked;
    this.languages.forEach((l) => {
      if (l.label == event.target.value) {
        l.selected = checked;
      }
    });
  }
  submitForm = new FormGroup({
    name: new FormControl(''),
    age: new FormControl(null),
    languagesKnown: new FormControl([]),
    gender: new FormControl(''),
  });
  resultSerivces: ResultsService = inject(ResultsService);
  allData: MyFormData[] = [];

  constructor() {
    this.allData = this.resultSerivces.getAllValues();
  }
  submitMyForm() {
    const myForm: object | any = this.submitForm.value;

    let { name, age, gender } = myForm;

    this.nameErr = name == '';
    this.ageErr = age == null;
    this.genderErr = gender == '';

    const languagesKnownArr: string[] = [];
    this.languages.forEach((l) => {
      if (l.selected) languagesKnownArr.push(l.label);
    });

    this.langErr = languagesKnownArr.length < 1;

    const errorArr: string[] = [];

    if (this.nameErr) errorArr.push('name');
    if (this.ageErr) errorArr.push('age');
    if (this.genderErr) errorArr.push('gender');

    if (this.langErr) errorArr.push('Languages known');
    console.log(errorArr);
    if (errorArr.length > 0) {
      return alert(`Please provide: ${errorArr.join(', ')}`);
    }

    this.allData = this.resultSerivces.insertData({
      name: name ? name : '',
      age: age ? age : 0,
      languagesKnown: languagesKnownArr?.length > 0 ? languagesKnownArr : [],
      gender: gender ? gender : '',
    });
    this.languages.forEach((l) => (l.selected = false));
    myForm.languagesKnown = [];
    this.submitForm.reset();
  }
}

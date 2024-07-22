import { Component, inject, Input } from '@angular/core';
import { MyFormData } from '../my-form-data';
import { ResultsService } from '../results.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-my-table',
  standalone: true,
  imports: [NgFor],
  template: `
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Languages Known</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let data of allData">
            <td>{{ data.name }}</td>
            <td>{{ data.age }}</td>
            <td>
              {{ data.languagesKnown.join(', ') }}
            </td>
            <td>{{ data.gender }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styleUrl: './my-table.component.css',
})
export class MyTableComponent {
  @Input() allData!: MyFormData[];
}

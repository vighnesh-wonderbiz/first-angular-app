import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MyFormComponent } from './my-form/my-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MyFormComponent],
  template: `
    <main>
      <header>
        <h1>Test Form</h1>
      </header>
      <section class="form-section">
        <app-my-form></app-my-form>
      </section>
    </main>
  `,
})
export class AppComponent {
  title = 'my-form';
}

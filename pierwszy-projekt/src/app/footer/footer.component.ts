import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <p class="text-center">
      &copy; Prawa zastrzeżone
    </p>
  `,
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <p class="text-center">
      &copy; Prawa zastrzeżone
    </p>
  `,
  styleUrl: './footer.component.css',
  encapsulation: ViewEncapsulation.Emulated // Domyślnie Emulated, None - style dostępne globalnie, ShadowDom - Wbudowane API w przeglądarke
})
export class FooterComponent {

}

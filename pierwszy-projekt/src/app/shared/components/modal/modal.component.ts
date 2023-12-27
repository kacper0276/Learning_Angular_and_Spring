import { AfterContentInit, Component, ContentChild, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements AfterContentInit{
  @Input() title!: string;
  @Output() close = new EventEmitter<void>();
  @ContentChild('modalDiv') modalDiv!: ElementRef; 

  onClose() {
    this.close.emit();
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit');
    console.log(this.modalDiv);
  }
}

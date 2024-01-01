import { CommonModule } from '@angular/common';
import { AfterContentChecked, AfterContentInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription, from, fromEvent, interval, of, take } from 'rxjs';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent 
implements AfterContentInit, AfterContentChecked, OnInit, OnDestroy
{
  @Input() title!: string;
  @Output() close = new EventEmitter<void>();
  sub!: Subscription;
  obs$ = interval(1000);
  // @ContentChild('modalDiv') modalDiv!: ElementRef; 
  // @ContentChild('check') checkBox!: ElementRef;  

  onClose() {
    this.close.emit();
  }

  ngOnInit(): void {
    // this.sub = of([1, 2, 3], [4, 5], [6, 7]).subscribe({
    //   next: value => console.log(value),
    //   error: err => console.log(err),
    //   complete: () => console.log('Test')
    // })
    // take - bierze pierwsze x wartości i kończy działanie
    // this.sub = interval(1000).pipe(take(5)).subscribe({
    //   next: number => console.log(number) 
    // });
    // from - wartości iterowalne
    // this.sub = from([1, 2, 3]).subscribe({
    //   next: value => console.log(value),
    //   error: err => console.log(err),
    //   complete: () => console.log('Test')
    // })
    this.sub = fromEvent(document, 'click').subscribe({
      next: value => console.log(value),
      error: err => console.log(err),
      complete: () => console.log('Test')
    })
    console.log(this.sub);
    
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();

    // console.log(this.sub); // closed: true - oznacza że subskrypcja się zakończyła
  }

  ngAfterContentInit(): void {
    // console.log('ngAfterContentInit');
    // console.log(this.modalDiv);
  }

  ngAfterContentChecked(): void {
    // console.log('ngAfterContentChecked');
    // console.log(this.checkBox.nativeElement.checked);
  }
}

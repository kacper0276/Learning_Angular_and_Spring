import { CommonModule } from '@angular/common';
import {
  AfterContentChecked,
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  BehaviorSubject,
  Subject,
  Subscription,
  defer,
  filter,
  from,
  fromEvent,
  interval,
  map,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent
  implements AfterContentInit, AfterContentChecked, OnInit, OnDestroy
{
  @Input() title!: string;
  @Output() close = new EventEmitter<void>();
  // sub!: Subscription;
  sub: Subscription = new Subscription();
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

    // this.sub = fromEvent(document, 'click').subscribe({
    //   next: value => console.log(value),
    //   error: err => console.log(err),
    //   complete: () => console.log('Test')
    // })

    // map i filter
    // of(1, 2, 3).pipe(map(numb => numb * 2))
    //   .subscribe({
    //       next: numb => console.log(numb)
    //     })

    // of([1, 2, 3]).pipe(map(arr => {
    //   return arr.map(numb => numb * 2)
    // }))
    // .subscribe({
    //       next: numb => console.log(numb)
    //     })

    // of(1, 2, 3).pipe(
    //   filter(numb => numb % 2 === 0),
    //     map(numb => numb * 2)
    //   )
    //   .subscribe({
    //       next: numb => console.log(numb)
    //     })

    // Tab (nie zniekształca strumienia) i SwitchMap
    // of(1).pipe(
    //     switchMap(numb => of(numb * 2))
    //   )
    //   .subscribe({
    //       next: numb => console.log(numb)
    //     })

    // of(1).pipe(
    //     tap(numb => console.log(numb))
    //   )
    //   .subscribe({
    //       next: numb => console.log(numb)
    //     })

    // const subject = new Subject<number>();
    // const bsubject = new BehaviorSubject<number>(5); // Musi mieć wartość początkową
    // this.sub.add(subject.subscribe({
    //   next: value => console.log(value)
    // }));
    // this.sub.add(bsubject.subscribe({
    //   next: value => console.log(value)
    // }));
    // subject.next(5);

    // console.log(this.sub);
    // console.log(this.sub);

    // Event Emmiter jako Observable
    // const event = new EventEmitter<string>();
    // this.sub = event.subscribe({
    //   next: (value: string) => console.log(value)
    // })

    // event.next('Test');
    // console.log(this.sub);

    const promise = () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('Test');
          resolve('Hello world!');
        }, 1000);
      });

    const obs$ = defer(() => from(promise()));
    this.sub = obs$.subscribe({
      next: (val) => console.log(val),
    });
    console.log(this.sub);
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }

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

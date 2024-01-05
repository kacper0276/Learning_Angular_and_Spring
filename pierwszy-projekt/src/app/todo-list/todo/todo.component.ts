import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  LOCALE_ID,
  Output,
  ViewChild,
} from '@angular/core';
import { Todo } from '../../shared/interfaces/todo.interface';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import localePl from '@angular/common/locales/pl';
import { FirstLetterUppercasePipe } from '../../shared/pipes/first-letter-uppercase.pipe';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

registerLocaleData(localePl);

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, ModalComponent, FirstLetterUppercasePipe],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
  providers: [{ provide: LOCALE_ID, useValue: 'pl' }],
})
// implements OnChanges
// implements OnInit
// implements DoCheck
// implements AfterViewInit, OnDestroy, OnInit
export class TodoComponent {
  @Input() todo!: Todo;
  @Input() i!: number;
  @Output() delete = new EventEmitter<void>();
  @Output() changeStatus = new EventEmitter<number>();
  @ViewChild('li') li!: ElementRef;
  openModal = false;
  // timeout!: any;
  // keyValueTest: {[key: string]: string | number} = { name: 'Test', age: 12 };

  constructor(private router: Router, private route: ActivatedRoute) {
    // console.log(this.todo);
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log(changes);
  // }

  // ngOnInit(): void {
  //   console.log(this.todo);
  //   this.timeout = setTimeout(() => {
  //     console.log('setTimeout');
  //   }, 3000);
  // }

  // ngDoCheck(): void {
  //   console.log("ngDoCheck został wykonany");
  // }

  // ngAfterViewInit(): void {
  //   console.log(this.li);
  // }

  // ngOnDestroy(): void {
  //   console.log('ngOnDestroy');
  //   clearTimeout(this.timeout);
  // }

  changeTodoStatus(): void {
    this.changeStatus.emit(this.i);
  }

  toogleModal(): void {
    this.openModal = !this.openModal;
  }

  deleteTodo(): void {
    this.delete.emit();
  }

  navigateToDetails() {
    const navigationExtras: NavigationExtras = {
      relativeTo: this.route,
    };
    this.router.navigate([this.i], navigationExtras);
  }
}

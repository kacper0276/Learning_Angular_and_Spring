import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Todo } from '../../shared/interfaces/todo.interface';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../shared/components/modal/modal.component';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent 
// implements OnChanges
// implements OnInit 
implements DoCheck
{
  @Input() todo!: Todo;
  @Input() i!: number;
  @Output() delete = new EventEmitter<void>();
  @Output() changeStatus = new EventEmitter<number>();
  openModal = false;

  // constructor() {
  //   console.log(this.todo);
  // }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log(changes);
  // }

  // ngOnInit(): void {
  //   console.log(this.todo);
  // }

  ngDoCheck(): void {
    console.log("ngDoCheck został wykonany");
  }

  changeTodoStatus(): void {
    this.changeStatus.emit(this.i);  
  }

  toogleModal(): void {
    this.openModal = !this.openModal;
  }

  deleteTodo(): void {
      this.delete.emit();
  }

}

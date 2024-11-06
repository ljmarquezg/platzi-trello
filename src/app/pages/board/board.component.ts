import { Component, inject, signal, WritableSignal } from "@angular/core";
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import {
  faAngleDown,
  faEllipsis,
  faImages,
  faPlus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { CdkOverlayOrigin, OverlayModule } from "@angular/cdk/overlay";
import { Dialog } from "@angular/cdk/dialog";

import { CdkAccordion, CdkAccordionItem } from "@angular/cdk/accordion";
import { FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NavbarComponent } from "@shared/navbar/navbar.component";
import ToDo, { Column } from "@models/todo.model";
import { BtnComponent, } from "@shared/btn/btn.component";
import { ColumnComponent } from "./components/column/column.component";
import { TodoDialogComponent } from "../board/components/todo-dialog/todo-dialog.component";

@Component({
  selector: "app-board",
  standalone: true,
  imports: [
    DragDropModule,
    FontAwesomeModule,
    OverlayModule,
    ReactiveFormsModule,
    CdkDrag,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    CdkOverlayOrigin,
    CdkAccordion,
    CdkAccordionItem,
    ColumnComponent,
    NavbarComponent,
    BtnComponent
],
  templateUrl: "./board.component.html",
  styles: [
    `
      /* Firefox */
      * {
        scrollbar-color: #a2b2bc rgb(51, 92, 122);
        scrollbar-width: thin;
      }
      /* Agrega estilos personalizados para la barra de desplazamiento */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      ::-webkit-scrollbar-thumb {
        background-color: rgba(156, 163, 175, var(--tw-bg-opacity));
        border-radius: 4px;
      }

      ::-webkit-scrollbar-track {
        background-color: rgba(229, 231, 235, var(--tw-bg-opacity));
        border-radius: 4px;
      }

      /* Agrega un efecto hover a la barra de desplazamiento */
      ::-webkit-scrollbar-thumb:hover {
        background-color: rgba(107, 114, 128, var(--tw-bg-opacity));
      }

      /* Animate items as they're being sorted. */
      .cdk-drop-list-dragging .cdk-drag {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }

      /* Animate an item that has been dropped. */
      .cdk-drag-animating {
        transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
      }
    `,
  ],
})
export class BoardComponent {
  private dialog: Dialog = inject(Dialog);

  faPlus = faPlus;
  faTimes = faTimes;
  faEllipsis = faEllipsis;
  faImages = faImages;
  faAngleDown = faAngleDown;
  isAddingList: WritableSignal<boolean> = signal(false);
  todoTitle: FormControl = new FormControl("", [Validators.required]);
  newListTitle: FormControl = new FormControl("", [Validators.required]);
  columns: WritableSignal<Column[]> = signal([
    {
      title: "To do",
      todos: [
        {
          id: "1",
          title: "Drag and drop",
          completed: false,
        },
        {
          id: "2",
          title: "Take over world",
          completed: false,
        },
        {
          id: "3",
          title: "One more thing",
          completed: false,
        },
      ],
      addNew: false,
      optionsOpen: false,
    },
    {
      title: "Doing",
      todos: [
        {
          id: "4",
          title: "Testing",
          completed: false,
        },
        {
          id: "5",
          title: "Play video games",
          completed: false,
        },
      ],
      addNew: false,
      optionsOpen: false,
    },
    {
      title: "Done",
      todos: [
        {
          id: "6",
          title: "Finish Angular Screencast",
          completed: false,
        },
      ],
      addNew: false,
      optionsOpen: false,
    },
  ]);

  drop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  openOptions(index: number): void {
    this.columns.update((columns: Column[]) => {
      return columns.map((column, current) => {
        if (current === index) {
          return {
            ...column,
            optionsOpen: !column.optionsOpen,
          };
        }
        return column;
      });
    });
  }

  toggleNewCardForm(index: number): void {
    this.columns.update((columns: Column[]) => {
      return columns.map((column, current) => {
        if (current === index) {
          return {
            ...column,
            addNew: !column.addNew,
          };
        }
        return column;
      });
    });
  }

  createCard(index: number): void {
    if(this.todoTitle.valid) {
      this.columns.update((columns: Column[]) => {
        return columns.map((column:Column, current: number) => {
          if(current === index) {
            const newCard = {
              id: new Date().getTime().toString(),
              title: this.todoTitle.value,
              completed: false,
            };
            this.todoTitle.reset();
            return {
              ...column,
              addNew: false,
              todos: [
                  ...column.todos, 
                  newCard
              ],
            }
          }
          return column;
        });
      })
    }
  }

  toggleNewListForm(): void {
    this.isAddingList.set(!this.isAddingList());
  }

  createList(): void {
    if(this.newListTitle.valid) {
      const newTodo = {
        title: this.newListTitle.value,
        todos: [],
        addNew: false,
        optionsOpen: false,
      };

      this.columns.update((prev) => [...prev, newTodo]);
    }
  }

  openDialog(todo: ToDo): void {
    console.log(todo);
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      minWidth: "300px",
      maxWidth: "50%",
      autoFocus: false,
      data: {
        todo,
      },
    });

    dialogRef.closed.subscribe((output) => {
      console.log("Dialog closed", output);
    });
  }
}

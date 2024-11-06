import { Component, inject, OnInit, signal, WritableSignal } from "@angular/core";
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
import { BoardsService } from "@services/boards.service";
import { Router } from "express";
import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";
import { Board } from "@models/board.model";
import { Card } from "@models/card.model";
import { List } from "@models/list.model";

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
export class BoardComponent implements OnInit {
  private dialog: Dialog = inject(Dialog);
  private boardsService: BoardsService = inject(BoardsService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  faPlus = faPlus;
  faTimes = faTimes;
  faEllipsis = faEllipsis;
  faImages = faImages;
  faAngleDown = faAngleDown;
  isAddingList: WritableSignal<boolean> = signal(false);
  todoTitle: FormControl = new FormControl("", [Validators.required]);
  newListTitle: FormControl = new FormControl("", [Validators.required]);
  board: WritableSignal<Board | null> = signal(null);

  private getBoard(boardId: string): void {
    this.boardsService.getBoard(boardId).subscribe((board) => {
      this.board.set(board);
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params): void => {
      const boardId = params.get("boardId");
      if(boardId) {
        this.getBoard(boardId)
      }
    });
  }
  drop(event: CdkDragDrop<Card[]>): void {
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
    /* this.columns.update((columns: Column[]) => {
      return columns.map((column, current) => {
        if (current === index) {
          return {
            ...column,
            optionsOpen: !column.optionsOpen,
          };
        }
        return column;
      });
    }); */
  }

  toggleNewCardForm(index: number): void {
    /* this.columns.update((columns: Column[]) => {
      return columns.map((column, current) => {
        if (current === index) {
          return {
            ...column,
            addNew: !column.addNew,
          };
        }
        return column;
      });
    }); */
  }

  createCard(index: number): void {
   /*  if(this.todoTitle.valid) {
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
    } */
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

      //this.columns.update((prev) => [...prev, newTodo]);
    }
  }

  openDialog(card: Card, listTitle: string): void {
    console.log(card);
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      minWidth: "300px",
      maxWidth: "50%",
      autoFocus: false,
      data: {
        card,
        listTitle,
      },
    });

    dialogRef.closed.subscribe((output) => {
      console.log("Dialog closed", output);
    });
  }
}

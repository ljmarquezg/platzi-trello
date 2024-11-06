import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClose, faCheckToSlot, faBars, faUser, faTag, faCheckSquare, faClock, faClipboard, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { BtnComponent } from '@shared/btn/btn.component';
import ToDo from '@models/todo.model';

interface InputData {
  todo: ToDo;
}

interface OutputData {
  response: boolean;
}

@Component({
  selector: 'app-todo-dialog',
  standalone: true,
  imports: [
    FontAwesomeModule,
    BtnComponent,
  ],
  templateUrl: './todo-dialog.component.html',
})
export class TodoDialogComponent {
  private dialogRef: DialogRef<OutputData> = inject(DialogRef<OutputData>);
  private data: InputData = inject(DIALOG_DATA);

  todo: ToDo = this.data.todo;
  faClose = faClose;
  faCheckToSlot = faCheckToSlot;
  faBars = faBars;
  faUser = faUser;
  faTag = faTag;
  faCheckSquare = faCheckSquare;
  faClock = faClock;
  faPaperclip = faPaperclip;
  faClipboard = faClipboard;

  close() {
    this.dialogRef.close();
  }

  closeWithResponse(response: boolean) {
    this.dialogRef.close({ response });
  }
}

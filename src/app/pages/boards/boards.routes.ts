import { Routes } from "@angular/router";
import { authGuard } from "@guards/auth.guard";
import { BoardsComponent } from "./boards.component";
import { BoardComponent } from "../board/board.component";

export const BOARDS_ROUTES: Routes = [
  {
    path: "",
    canActivate: [authGuard],
    component: BoardsComponent,
  },
  {
    path: ":id",
    canActivate: [authGuard],
    component: BoardComponent,
  },
];

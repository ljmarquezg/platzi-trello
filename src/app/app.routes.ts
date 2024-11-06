import { Routes } from "@angular/router";
import { authGuard } from "@guards/auth.guard";
import { redirectGuard } from "@guards/redirect.guard";

export const routes: Routes = [
  {
    path: "",
    canActivate: [redirectGuard],
    loadChildren: () => import("@auth/auth.routes").then((m) => m.AUTH_ROUTES),
  },
  {
    path: "app",
    canActivate: [authGuard],
    loadChildren: () => import("./layout/layout.routes").then((m) => m.LAYOUT_ROUTES),
  },
];

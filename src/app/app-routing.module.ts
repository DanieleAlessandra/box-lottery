import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {ListComponent} from './pages/list/list.component';
import {BoxComponent} from './pages/box/box.component';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
  {
    path: "", pathMatch: "full", redirectTo: "home"
  },
  {
    path: "home", component: HomeComponent
  },
  {
    path: "list", component: ListComponent, canActivate: [AuthGuard]
  },
  {
    path: "box/:id", component: BoxComponent, canActivate: [AuthGuard]
  },
  {
    path: "**", component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

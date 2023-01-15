import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ListComponent } from './pages/list/list.component';
import { BoxComponent } from './pages/box/box.component';
import { FullComponent } from './layout/full/full.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import {AuthService} from './auth/auth.service';
import {AuthGuard} from './auth/auth.guard';
import { UserComponent } from './widgets/user/user.component';
import {StoreModule} from '@ngrx/store';
import {mainReducer} from './reducers/main-store.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    ListComponent,
    BoxComponent,
    FullComponent,
    FooterComponent,
    HeaderComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({main: mainReducer})
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

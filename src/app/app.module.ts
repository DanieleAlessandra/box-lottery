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
import {userReducer} from './reducers/user.reducer';
import {APOLLO_OPTIONS, ApolloModule} from 'apollo-angular';
import {InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import {HttpClientModule} from '@angular/common/http';
import {boxReducer} from './reducers/box.reducer';
import { BoxCardComponent } from './widgets/box-card/box-card.component';
import { SpinnerComponent } from './widgets/spinner/spinner.component';

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
    UserComponent,
    BoxCardComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApolloModule,
    HttpClientModule,
    StoreModule.forRoot({user: userReducer, boxes: boxReducer})
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'https://api-staging.csgoroll.com/graphql',
            withCredentials: true
          })
        }
      },
      deps: [HttpLink]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

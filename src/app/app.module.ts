import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HitsDetailsComponent } from './Hits/hits-details/hits-details.component';
import { HitsListComponent } from './Hits/hits-list/hits-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HitsDetailsComponent,
    HitsListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

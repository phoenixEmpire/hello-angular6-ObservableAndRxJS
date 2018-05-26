import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CreateObservableComponent } from './create-observable/create-observable.component';
import { MulticastComponent } from './multicast/multicast.component';

const routes: Routes = [
  { path: 'create-observable', component: CreateObservableComponent },
  { path: 'multicast', component: MulticastComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CreateObservableComponent,
    MulticastComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

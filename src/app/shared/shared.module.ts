import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule
  ]
})
export class SharedModule { }

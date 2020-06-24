import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map/components/map/map.component';
import { HomeComponent } from './shared/components/home/home.component';


const routes: Routes = [
  { path: '', redirectTo : '/home', pathMatch: 'full' },
  { path: 'map', component: MapComponent },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

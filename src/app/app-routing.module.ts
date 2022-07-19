import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AppComponent} from "./app.component";
import {AuthScreenComponent} from "./auth-screen/auth-screen.component";
import {HomeScreenComponent} from "./home-screen/home-screen.component";
import {CandidatesComponent} from "./candidates/candidates.component";
import {ListingCandidatesComponent} from "./listing-candidates/listing-candidates.component";


const routes: Routes = [
  { path: '', component: AuthScreenComponent },
  { path: 'home', component: HomeScreenComponent },
  { path: 'candidates', component: CandidatesComponent},

    {
      path: 'candidates/:type',
      component:ListingCandidatesComponent
    }

];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

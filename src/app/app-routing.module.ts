import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultsComponent } from './search-results/search-results.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  { path: 'home', component: SearchResultsComponent },
  { path: 'details/:login', component: DetailsComponent },
  { path: '**', component: SearchResultsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

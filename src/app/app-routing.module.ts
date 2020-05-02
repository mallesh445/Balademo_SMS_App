import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AddeditUserComponent } from './addedit-user/addedit-user.component';
import { CustomPaginationComponent } from './custom-pagination/custom-pagination.component';
import { FullCalenderComponent } from './full-calender/full-calender.component';


const routes: Routes = [
  {
    path: "home-page",
    component: HomePageComponent
  },
  {
    path: "addedit-user",
    component: AddeditUserComponent
  },
  {
    path: "custom-pagination",
    component: CustomPaginationComponent
  },
  {
    path: "full-calender",
    component: FullCalenderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

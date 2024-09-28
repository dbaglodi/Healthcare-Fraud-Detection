import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ModelInfoComponent } from './model-info/model-info.component';
import { TeamComponent } from './team/team.component';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'model-info', component: ModelInfoComponent },
  { path: 'team', component: TeamComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' } // Redirect to home by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

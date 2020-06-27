import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { ItemListComponent } from './item-list/item-list.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { LoginComponent } from './login/login.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [

  //  {path:"signup",component:CreateAccountComponent},
  {path:"login",component:LoginLayoutComponent},
  // {path:"signup",component:CreateAccountComponent},
  {path:"admin",component:MainLayoutComponent,
  canActivate:[AuthGuard],
  children:[
    {path:"home",component:HomeComponent},
    {path:"main",component:MainComponent},
    {path:"signup",component:CreateAccountComponent},
    {path:"item",component:ItemListComponent},
  ]},
  {path:"**",component:LoginLayoutComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

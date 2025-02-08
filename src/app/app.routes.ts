import { Routes } from '@angular/router';
import { DataAddingComponent } from './EnteredComponent/data-adding/data-adding.component';
import { HomeComponent } from './EnteredComponent/home/home.component';
import { LayoutComponent } from './EnteredComponent/layout/layout.component';
import { loginauthGuard } from './loginauth.guard';
import { AboutUsComponent } from './MainComponent/about-us/about-us.component';
import { ContactUsComponent } from './MainComponent/contact-us/contact-us.component';
import { LoginComponent } from './MainComponent/login/login.component';
import { MainpageComponent } from './MainComponent/mainpage/mainpage.component';
import { AdduniversityComponent } from './University/adduniversity/adduniversity.component';

  
export const routes: Routes = [
    {
        path: '',
        redirectTo: 'Home',
        pathMatch: 'full'
    },
    {
        path: 'Home',
        component: MainpageComponent
    },
    {
        path: 'aboutus',
        component: AboutUsComponent
    },
    {
        path: 'contactus',
        component: ContactUsComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [loginauthGuard],
        children: [
            { path: 'dashboard', component: DataAddingComponent },
            { path: 'home', component: HomeComponent },
            { path: 'add', component: DataAddingComponent },
            { path: 'settings', component: HomeComponent },
            {path:'add/:id',component:DataAddingComponent}  ,
            {path:'adduniversity',component:AdduniversityComponent}          
        ]
    }
];

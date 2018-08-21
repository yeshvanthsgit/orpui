import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { Region } from './pages/region/region';
import { Site } from './pages/site/site';
import { Refinery } from './pages/refinery/refinery'; 



const app_routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', pathMatch: 'full', component: Region  },
    { path: 'region', pathMatch: 'full', component:Region },
    { path: 'site', pathMatch: 'full', component: Site },
    { path: 'site/:name', pathMatch: 'full', component: Site },
    { path: 'refinery', pathMatch: 'full', component:Refinery },
    { path: 'refinery/:name', pathMatch: 'full', component:Refinery },
    { path: 'region/:name', pathMatch: 'full', component:Region },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }  
    
     //catch any unfound routes and redirect to home page
];

@NgModule({
    imports: [RouterModule.forRoot(
        app_routes,
        { enableTracing: true,onSameUrlNavigation: 'reload' } // <-- debugging purposes only
    )],
    exports: [RouterModule]
})
export class AppRoutingModule { }

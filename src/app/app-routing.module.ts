import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'mau-progression', loadChildren: './mau-progression/mau-progression.module#MauProgressionPageModule' },
  { path: 'revenue-trend', loadChildren: './revenue-trend/revenue-trend.module#RevenueTrendPageModule' },
  { path: 'pack-activation', loadChildren: './pack-activation/pack-activation.module#PackActivationPageModule' },
  { path: 'login-trend', loadChildren: './login-trend/login-trend.module#LoginTrendPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

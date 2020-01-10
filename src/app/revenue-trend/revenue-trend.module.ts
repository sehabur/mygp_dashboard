import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RevenueTrendPage } from './revenue-trend.page';

const routes: Routes = [
  {
    path: '',
    component: RevenueTrendPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RevenueTrendPage]
})
export class RevenueTrendPageModule {}

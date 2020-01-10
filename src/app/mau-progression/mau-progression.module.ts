import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MauProgressionPage } from './mau-progression.page';

const routes: Routes = [
  {
    path: '',
    component: MauProgressionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MauProgressionPage]
})
export class MauProgressionPageModule {}

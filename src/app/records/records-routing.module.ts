import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecordsComponent } from './records.component';

let routes: Routes = [
  {
    path: '', component: RecordsComponent,
    children: [
      
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RecordsRoutingModule {}
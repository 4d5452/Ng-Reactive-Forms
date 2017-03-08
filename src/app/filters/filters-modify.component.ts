import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  moduleId: module.id,
  templateUrl: './filters-modify.component.html'
})
export class FiltersModifyComponent {
  id = new FormControl();
}
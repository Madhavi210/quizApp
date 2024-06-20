import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-action-renderer',
  template: `
    <button class="btn btn-sm btn-primary mb-2 m-1" title="Edit" (click)="onEdit()" [routerLink]="['users/edit', params.data._id ]" >Edit</button> 
    <button class="btn btn-sm btn-danger mb-2 m-1" title="Delete" (click)="onDelete()">Delete</button>
  `
})
export class ActionRendererComponent {
  @Input() params: any;

  agInit(params: any): void {
    this.params = params;
    }
  onEdit(): void {
    this.params.onEdit(this.params.data._id); 
  }

  onDelete(): void {
    this.params.onDelete(this.params.data._id); 
  }
}



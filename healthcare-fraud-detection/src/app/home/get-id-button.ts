import { Component } from '@angular/core';

@Component({
  selector: 'get-id-button',
  template: `
    <button (click)="findId()">Find ID</button>
    <p *ngIf="id">Found ID: {{ id }}</p>
  `,
  styles: [``]
})
export class FindIdComponent {
  id: string | null = null;

  findId() {
    // Simulating an asynchronous operation to find an ID
    setTimeout(() => {
      this.id = 'USER_' + Math.floor(Math.random() * 1000);
      console.log('ID found:', this.id);
    }, 1000);
  }

  // decryptfile(data: string): string {

  //   return "";  
  // }
}
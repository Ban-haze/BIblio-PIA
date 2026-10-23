import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FirebaseService } from '../../core/services/firebase';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog.html',
  styleUrls: ['./catalog.css']
})
export class CatalogComponent {
  firebase = inject(FirebaseService);
  router = inject(Router);

  async logout() {
    await this.firebase.logout();
    this.router.navigate(['/login']);
  }
}
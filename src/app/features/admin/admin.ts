import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../../core/services/firebase';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class AdminComponent {
  private fb = inject(FormBuilder);
  firebase = inject(FirebaseService);
  router = inject(Router);

  bookForm = this.fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    coverUrl: ['', Validators.required],
    pdfUrl: ['', Validators.required]
  });

  async onSubmit() {
    if (this.bookForm.valid) {
      const success = await this.firebase.addBook(this.bookForm.value);
      if (success) {
        alert('¡Libro guardado en Firestore!');
        this.bookForm.reset();
      }
    }
  }

  async deleteBook(id: string) {
    if (confirm('¿Estás seguro de eliminar este libro?')) {
      await this.firebase.deleteBook(id);
    }
  }

  goToCatalog() {
    this.router.navigate(['/catalog']);
  }

  async logout() {
    await this.firebase.logout();
    this.router.navigate(['/login']);
  }
}
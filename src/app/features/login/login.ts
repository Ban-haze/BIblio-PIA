import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FirebaseService } from '../../core/services/firebase';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  credentials = '';
  password = '';
  firebase = inject(FirebaseService);
  router = inject(Router);

  async login() {
    try {
      if (this.credentials.trim().toLowerCase() === 'admin@jem.edu.pe') {
        await this.firebase.loginAdminAuth(this.credentials, this.password);
        this.router.navigate(['/admin']);
      } else if (this.credentials.trim().length > 0) {
        this.router.navigate(['/catalog']);
      }
    } catch (error) {
      alert("Credenciales incorrectas");
    }
  }

  async loginGoogle() {
    try {
      await this.firebase.loginWithGoogleAuth();
      this.router.navigate(['/catalog']);
    } catch (error) {
      alert("Error con Google");
    }
  }
}
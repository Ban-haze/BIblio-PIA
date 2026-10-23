import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase';

export const adminGuard: CanActivateFn = async (route, state) => {
  const firebase = inject(FirebaseService);
  const router = inject(Router);

  const user = await firebase.getCurrentUser();

  // Reemplaza este correo por el que creaste en Firebase para el admin
  if (user && user.email === 'admin@jem.edu.pe') {
    return true; // Acceso permitido
  }

  // Si no es el admin, lo patea al login
  router.navigate(['/login']);
  return false;
};
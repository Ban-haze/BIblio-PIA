import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login';
import { CatalogComponent } from './features/catalog/catalog';
import { AdminComponent } from './features/admin/admin';
import { adminGuard } from './core/guards/admin-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'catalog', component: CatalogComponent },
  { 
    path: 'admin', 
    component: AdminComponent, 
    canActivate: [adminGuard] // Protegido por el Guard
  },
  { path: '**', redirectTo: 'login' }
];
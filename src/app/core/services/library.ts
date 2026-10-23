import { Injectable, signal } from '@angular/core';

export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  pdfUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  // Estado reactivo con Signals
  books = signal<Book[]>([]);
  userRole = signal<'login' | 'student' | 'admin'>('login');

  addBook(bookData: Omit<Book, 'id'>) {
    const newBook = { ...bookData, id: crypto.randomUUID() };
    this.books.update(currentBooks => [...currentBooks, newBook]);
  }

  setRole(role: 'login' | 'student' | 'admin') {
    this.userRole.set(role);
  }
}
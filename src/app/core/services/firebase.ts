import { Injectable, signal } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { initializeFirestore, collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private app = initializeApp(environment.firebase);
  
  // Inicialización avanzada compatible con la versión 13+ para enlazar la base de datos por defecto sin errores
  // La base de datos del proyecto se creó con el ID "default" (no "(default)",
  // que es el que busca el SDK por defecto), por eso se pasa como tercer argumento.
  private db = initializeFirestore(
    this.app,
    {
      localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
    },
    "default"
  );

  private auth = getAuth(this.app);
  private provider = new GoogleAuthProvider();

  books = signal<any[]>([]);

  constructor() {
    this.loadBooks();
  }

  getCurrentUser(): Promise<any> {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(this.auth, (user) => {
        unsubscribe();
        resolve(user);
      });
    });
  }

  async loginWithGoogleAuth() {
    return await signInWithPopup(this.auth, this.provider);
  }

  async loginAdminAuth(email: string, pass: string) {
    return await signInWithEmailAndPassword(this.auth, email, pass);
  }

  async logout() {
    await signOut(this.auth);
  }

  loadBooks() {
    try {
      const q = query(collection(this.db, "libros"), orderBy("fecha", "desc"));
      onSnapshot(q, (snapshot) => {
        const booksData = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        this.books.set(booksData);
      }, (error) => {
        console.error("Error al leer Firestore:", error);
      });
    } catch (error) {
      console.error("Error en loadBooks:", error);
    }
  }

  async addBook(book: any) {
    try {
      const docRef = await addDoc(collection(this.db, "libros"), { 
        ...book, 
        fecha: new Date() 
      });
      console.log("¡Libro guardado con éxito! ID:", docRef.id);
      return true;
    } catch (error: any) {
      console.error("ERROR AL GUARDAR:", error);
      alert("Error al guardar: " + (error.message || error));
      return false;
    }
  }

  async deleteBook(id: string) {
    try {
      await deleteDoc(doc(this.db, "libros", id));
      return true;
    } catch (error) {
      console.error("Error al eliminar:", error);
      return false;
    }
  }
}
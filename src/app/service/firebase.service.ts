import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Note } from "../modal/Note";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from "@angular/fire/firestore";
import { map, take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class FirebaseService {
  private notes: Observable<Note[]>;
  private noteCollection: AngularFirestoreCollection<Note>;

  constructor(private afs: AngularFirestore) {
    // Definir la colección
    this.noteCollection = this.afs.collection<Note>("notes");

    // Obtener la colección de datos
    this.notes = this.noteCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  // Obtener todas las notas
  getNotes(): Observable<Note[]> {
    return this.notes;
  }

  // Obtener una nota
  getNote(id: string): Observable<Note> {
    return this.noteCollection.doc<Note>(id).valueChanges().pipe(
      take(1),
      map(note => {
        note.id = id;
        return note;
      })
    );
  }

  // Crear una nota
  addNote(note: Note): Promise<DocumentReference> {
    return this.noteCollection.add(note);
  }

  // Modificar una nota
  updateNote(note: Note): Promise<void> {
    return this.noteCollection.doc(note.id).update({title:note.title, content: note.content});
  }

  // Borrar una nota
  deleteNote(id: string): Promise<void> {
    return this.noteCollection.doc(id).delete();
  }


}

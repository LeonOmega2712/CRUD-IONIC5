import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../service/firebase.service';
import { ToastController } from '@ionic/angular';
import { Note } from '../modal/Note';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.page.html',
  styleUrls: ['./add-note.page.scss'],
})
export class AddNotePage implements OnInit {
  note: Note = {
    title: '',
    content: '',
    createdAt: new Date().getTime()
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private fbService: FirebaseService,
    private toastCtrl: ToastController,
    private router: Router
    ) { }

  ngOnInit() {
  }

  addNote(){
    this.fbService.addNote(this.note).then(() => {
      this.router.navigateByUrl('/');
    }, err => {
    });
  }
}

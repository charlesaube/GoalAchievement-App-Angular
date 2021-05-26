import { Component, OnInit } from '@angular/core';
import {ObjectifService} from '../../services/objectifService/objectif.service';
import {Objectif} from '../model/objectif.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../model/user.model';

@Component({
  selector: 'app-objectif',
  templateUrl: './objectif.component.html',
  styleUrls: ['./objectif.component.css']
})
export class ObjectifComponent implements OnInit {
  objectifs: Objectif[] = [];
  number = this.objectifs.length;
  today: number = Date.now();
  user: User;

  constructor(
    private objectifService: ObjectifService) {
    this.user = JSON.parse(localStorage.getItem('currentUser')).body;
    }

  ngOnInit(): void {

    // this.objectifService.getAllObjectif().subscribe(objectif =>  {
    //   console.log(objectif.body);
    //   this.objectifs = objectif.body;
    // });
    this.objectifService.getObjectifByUserId(this.user.userId).subscribe(objectif =>  {

      this.objectifs = objectif.body;
    });

  }

  deleteObjectifById(id: number): void{
   location.reload();
   this.objectifService.deleteObjectif(id).subscribe();


  }

}

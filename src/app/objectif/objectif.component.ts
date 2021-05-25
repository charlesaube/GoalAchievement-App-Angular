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

  constructor(
    private objectifService: ObjectifService) {
    }

  ngOnInit(): void {

    // this.objectifService.getAllObjectif().subscribe(objectif =>  {
    //   console.log(objectif.body);
    //   this.objectifs = objectif.body;
    // });
    this.objectifService.getObjectifByUserId(environment.user.userId).subscribe(objectif =>  {
      console.log(objectif.body);
      this.objectifs = objectif.body;
    });

  }

}

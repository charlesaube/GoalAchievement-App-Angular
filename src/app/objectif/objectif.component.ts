import { Component, OnInit } from '@angular/core';
import {ObjectifService} from '../../services/objectifService/objectif.service';
import {Objectif} from '../model/objectif.model';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-objectif',
  templateUrl: './objectif.component.html',
  styleUrls: ['./objectif.component.css']
})
export class ObjectifComponent implements OnInit {
  objectifs: Objectif[] = [];
  number = this.objectifs.length;
  constructor(
    private objectifService: ObjectifService
    ) { }

  ngOnInit(): void {
    this.objectifService.getAllObjectif().subscribe({
     next: objectif => this.objectifs = objectif.body
    });
    this.objectifService.getAllObjectif().subscribe(objectif =>  {
      console.log(objectif.body);
      this.objectifs = objectif.body;
    });

  }

}

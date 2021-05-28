import { Component, OnInit } from '@angular/core';
import {User} from '../model/user.model';
import {UserService} from '../../services/userService/user.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Objectif} from '../model/objectif.model';
import {Category} from '../model/category.model';
import {environment} from '../../environments/environment';
import {CategoryService} from '../../services/categoryService/category.service';
import {first} from 'rxjs/operators';
import {ObjectifService} from '../../services/objectifService/objectif.service';
import {AchievementService} from '../../services/AchievementService/achievement.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  user: User;
  userService: UserService;
  objectifForm: FormGroup;
  achievementForm: FormGroup;
  objectifCount: number;
  achievementCount: number;
  closeResult: string;
  categories: Category[] = [];
  submitted = false;
  error = '';




  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private objectifService: ObjectifService,
    private achievementService: AchievementService) {

    this.user = JSON.parse(localStorage.getItem('currentUser')).body;

  }

  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe(category =>  {
      console.log(category.body);
      this.categories = category.body;
    });
    this.objectifForm = this.formBuilder.group({
      objectifName: '',
      endDate: '',
      categoryId: 'default'
    });
    this.achievementForm = this.formBuilder.group({
      achievementName: '',
      description: '',
      date: '',
      categoryId: 'default'
    });
    this.objectifService.getObjectifByUserId(this.user.userId).subscribe( count => {
      this.objectifCount = count.body.length;
    });
    this.achievementService.getAchievementByUserId(this.user.userId).subscribe( count => {
      this.achievementCount = count.body.length;
    });

  }

  // tslint:disable-next-line:typedef
  get objectifFormSubmitted() { return this.objectifForm.controls; }

  // tslint:disable-next-line:typedef
  get achievementFormSubmitted()  { return this.achievementForm.controls; }
  // tslint:disable-next-line:typedef
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  private dateToString = (date) => `${date.year}-${date.month}-${date.day}`;
  // tslint:disable-next-line:typedef
  onSubmitObjectif(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.objectifForm.invalid) {
      return;
    }
    const formatDate = this.dateToString(this.objectifFormSubmitted.endDate.value);
    // tslint:disable-next-line:max-line-length label-position no-unused-expression

    // tslint:disable-next-line:max-line-length
    this.objectifService.postObjectif(this.objectifFormSubmitted.objectifName.value, this.objectifFormSubmitted.categoryId.value, formatDate, this.user.userId).subscribe(
      data => {
        location.reload();
      },
      error => {
        this.error = error;
      });
  }

  // tslint:disable-next-line:typedef
  onSubmitAchievement(){
    this.submitted = true;
    console.log(this.achievementFormSubmitted.description.value);
    // stop here if form is invalid
    if (this.objectifForm.invalid) {
      return;
    }
    const formatDate = this.dateToString(this.achievementFormSubmitted.date.value);
    console.log(formatDate);
    // tslint:disable-next-line:max-line-length label-position no-unused-expression

    this.achievementService.postAchievement(this.achievementFormSubmitted.achievementName.value,
      this.achievementFormSubmitted.description.value,
      this.achievementFormSubmitted.categoryId.value,
      formatDate,
      this.user.userId).subscribe(
      data => {
        location.reload();
      },
      error => {
        this.error = error;
      });
  }



}





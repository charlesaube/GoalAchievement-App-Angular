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

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  user: User;
  userService: UserService;
  objectifService: ObjectifService;
  objectifForm: FormGroup;
  closeResult: string;
  categories: Category[] = [];
  submitted = false;
  error = '';



  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService) {

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


  }

  // tslint:disable-next-line:typedef

  // tslint:disable-next-line:typedef
  get f() { return this.objectifForm.controls; }
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

  // tslint:disable-next-line:typedef
  onSubmit(){
    this.submitted = true;
    console.log(this.objectifForm.invalid);
    // stop here if form is invalid
    if (this.objectifForm.invalid) {
      return;
    }
    console.log(this.f.categoryId.value);
    //this.objectifService.postObjectif();


  }



}

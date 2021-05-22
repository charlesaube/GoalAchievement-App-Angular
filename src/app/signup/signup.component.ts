import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../services/Authentification/authentication.service';
import {UserService} from '../../services/userService/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';

  // @ts-ignore
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {

  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      gender: null,
      password: ['', Validators.required],
      coachId: 0

    });

  }

  // convenience getter for easy access to form fields
  // tslint:disable-next-line:typedef
  get f() { return this.signUpForm.controls; }


  // tslint:disable-next-line:typedef
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signUpForm.invalid) {

      return;
    }

    // Je n'arrive pas a retourner la valeur du check box selectionner
    this.userService.postUserComplete(2, this.f.firstName.value, this.f.lastName.value, this.f.email.value,
      // tslint:disable-next-line:max-line-length
      this.f.password.value, this.f.gender.value, /*this.f.coachId.value*/ +document.getElementById('check01').getAttribute('value')).subscribe(
      data => {
        this.router.navigate(['/login']);
      },
      error => {
        this.error = error;
      });

    console.log('ok');
  }

}

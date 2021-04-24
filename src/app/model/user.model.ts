export class User
{
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  password: string;
  coachId: number;

  // tslint:disable-next-line:max-line-length
  constructor(userId: number, firstName: string, lastName: string, email: string, gender: string, password: string, coachId: number) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.gender = gender;
    this.password = password;
    this.coachId = coachId;

  }
}

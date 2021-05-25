import {User} from '../app/model/user.model';

export const environment = {
  production: true,
  apiUrl: 'http://localhost:8080/api',
  user : JSON.parse(localStorage.getItem('currentUser')).body
};


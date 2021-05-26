import { Component, OnInit } from '@angular/core';
import {Achievement} from '../model/achievement.model';
import {AchievementService} from '../../services/AchievementService/achievement.service';
import {User} from '../model/user.model';

@Component({
  selector: 'app-achievement',
  templateUrl: './achievement.component.html',
  styleUrls: ['./achievement.component.css']
})
export class AchievementComponent implements OnInit {
  achievements: Achievement[] = [];
  user: User;
  constructor(private achievementService: AchievementService ) {
    this.user = JSON.parse(localStorage.getItem('currentUser')).body;
  }

  ngOnInit(): void {
    this.achievementService.getAchievementByUserId(this.user.userId).subscribe(achievement => {
      this.achievements = achievement.body;
    });
  }

  deleteAchievementById(id: number): void{
    this.achievementService.deleteAchievementById(id).subscribe();
    location.reload();
  }

}

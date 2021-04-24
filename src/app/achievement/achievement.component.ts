import { Component, OnInit } from '@angular/core';
import {Achievement} from '../model/achievement.model';
import {AchievementService} from '../../services/AchievementService/achievement.service';

@Component({
  selector: 'app-achievement',
  templateUrl: './achievement.component.html',
  styleUrls: ['./achievement.component.css']
})
export class AchievementComponent implements OnInit {
  achievements: Achievement[] = [];
  constructor(private achievementService: AchievementService ) { }

  ngOnInit(): void {
    this.achievementService.getAllAchievement().subscribe(achievement => {
      this.achievements = achievement.body;
    });
  }

}

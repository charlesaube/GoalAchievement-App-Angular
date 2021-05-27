import { Component, OnInit } from '@angular/core';
import {ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {CategoryService} from '../../services/categoryService/category.service';
import {ObjectifService} from '../../services/objectifService/objectif.service';
import {User} from '../model/user.model';
import {Objectif} from '../model/objectif.model';
import {Category} from '../model/category.model';
import {AchievementService} from '../../services/AchievementService/achievement.service';
import {Achievement} from '../model/achievement.model';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public pieChartOptions: ChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(204,255,102,0.6)', 'rgba(255,102,102,0.3)',
        'rgba(46,196,182,0.3)', 'rgba(241,232,184,0.3)', 'rgba(48,43,39,0.3)', 'rgba(0,31,255,0.5)'],
    },
  ];
  user: User;
  objectifs: Objectif[] = [];
  achievements: Achievement[] = [];
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private  objectifService: ObjectifService,
    private achievementService: AchievementService) {

    this.user = JSON.parse(localStorage.getItem('currentUser')).body;
    this.pieChartLabels = this.getCategoriesName();
  }

  ngOnInit(): void {

    this.objectifService.getObjectifByUserId(this.user.userId).subscribe(objectif =>  {
      this.objectifs = objectif.body;

    });
    this.categoryService.getAllCategory().subscribe(category => {
      this.categories = category.body;

      //this.pieChartLabels = this.getCategoriesName();
      this.pieChartData = this.getCategoriesValue();
    });

    this.achievementService.getAchievementByUserId(this.user.userId).subscribe(achievements => {
      this.achievements = achievements.body;
    });
  }

  pourcentageAccomplissement(): number{
    return Math.floor( (this.achievements.length / (this.objectifs.length + this.achievements.length)) * 100);
  }

  achievementForLastMonth(): number{
    let numberOfObjectif = 0;
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    for (const achievement of this.achievements)
    {
      // tslint:disable-next-line:max-line-length
      if (new Date(achievement.date).getMonth() <= lastMonth.getMonth() && new Date(achievement.date).getFullYear() <= lastMonth.getFullYear())
      {
        numberOfObjectif ++;
      }
    }
    return numberOfObjectif;
  }

  failedObjectif(): number{
    let failed = 0;
    for (const objectif of this.objectifs)
    {
      if (new Date(objectif.endDate) < new Date())
      {
        failed ++;
      }
    }
    return failed;

  }
  getCategoriesName(): string[]{
    const array: string[] = [];
    for (let category of this.categories){
      array.push(category.categoryName);
    }
    return array;
  }
  getCategoriesValue(): number[] {
    const array: number[] = [];
    let temp: Objectif[] = [];

    for (let category of this.categories){
      console.log(category.categoryId);
      this.objectifService.getObjectifByUserIdAndCategoryId(this.user.userId, category.categoryId).subscribe(objectifs => {
        temp = objectifs.body;
        if (temp.length > 0) {
          array.push(temp.length);
          this.pieChartLabels.push(category.categoryName);
        }
      });
    }
    console.log(array);
    console.log(this.pieChartLabels);

    return array;
  }

}

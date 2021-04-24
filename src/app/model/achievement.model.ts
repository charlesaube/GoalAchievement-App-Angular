export class Achievement
{
  achievementId: number;
  title: string;
  description: string;
  date: Date;
  categoryId: number;
  userId: number;


  // tslint:disable-next-line:max-line-length
  constructor(achievementId: number, title: string, description: string, date: Date, categoryId: number, userId: number) {
    this.achievementId = achievementId;
    this.title = title;
    this.description = description;
    this.date = date;
    this.categoryId = categoryId;
    this.userId = userId;

  }
}

export class Objectif
{
  objectifId: number;
  objectifName: string;
  categoryId: number;
  isAchieved: boolean;
  startDate: Date;
  endDate: Date;
  userId: number;

  // tslint:disable-next-line:max-line-length
  constructor(objectifId: number, objectifName: string, categoryId: number, isAchieved: boolean, startDate: Date, endDate: Date, userId: number) {
    this.objectifId = objectifId;
    this.objectifName = objectifName;
    this.categoryId = categoryId;
    this.isAchieved = isAchieved;
    this.startDate = startDate;
    this.endDate = endDate;
    this.userId = userId;

  }
}

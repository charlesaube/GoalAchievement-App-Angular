export class Category
{
  categoryId: number;
  categoryName: string;
  imagePath: string;

  constructor(categoryId: number, categoryName: string, imagePath: string) {
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.imagePath = imagePath;
  }
}

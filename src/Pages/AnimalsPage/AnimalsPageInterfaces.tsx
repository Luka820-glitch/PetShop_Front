export interface AnimalDataInterface {
  id:string;
  selectedCategoryId:string[];
  name:string;
  price:number;
  description:string;
  IsPopular:boolean;
  IsStock:number;
}

export interface AnimalInterface {
  id:string;
  selectedCategoryId:string[];
  data:AnimalDataInterface;
  name:string;
  price:number;
  description:string;
  IsPopular:boolean;
  IsStock:number;
}
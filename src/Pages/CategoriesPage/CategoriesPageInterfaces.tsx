export interface CategoryDataInterface {
  id:string;
  name:string;
  description:string;
}

export interface CategoryInterface {
  id:string;
  data:CategoryDataInterface;
  name:string;
  description:string;
}
export interface AnimalInterface {
  id: string;
  data: {
    name: string;
    selectedCategoryId: string[];
  };
}

export interface CategoryInterface {
  id: string;
  data: {
    name: string;
  };
}

export interface AnimalsWithCategoriesInterface {
  category_id: string;
  category_name: string;
  animals: { id: string; name: string }[];
}

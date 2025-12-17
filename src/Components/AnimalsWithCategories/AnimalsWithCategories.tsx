import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../Hooks/Fetch/useFetch";
import styles from "./AnimalsWithCategories.module.css";
import type {
  AnimalInterface,
  CategoryInterface,
  AnimalsWithCategoriesInterface
} from "./AnimalsWithCategoriesInterfaces";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../Redux";
import { assignImagesForAnimals } from "../../Redux/slices/AnimalImageSlice";


const AnimalsWithCategories: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { response: animals, loading: animalsLoading } = useFetch<AnimalInterface[]>({
    url: "http://localhost:5000/api/v1/resource/ANIMALS",
    method: "GET"
  });

  const { response: categories, loading: categoriesLoading } = useFetch<CategoryInterface[]>({
    url: "http://localhost:5000/api/v1/resource/CATEGORIES",
    method: "GET"
  });

  const imageMap = useSelector((state: RootState) => state.animalImages.imageMap);

  useEffect(() => {
    if (animals) {
      const animalIds = animals.map((a) => a.id);
      dispatch(assignImagesForAnimals(animalIds));
    }
  }, [animals, dispatch]);


  const grouped = useMemo<AnimalsWithCategoriesInterface[]>(() => {
  if (!animals || !categories) return [];

  const groups: AnimalsWithCategoriesInterface[] = categories
    .map((cat) => ({
      category_id: cat.id,
      category_name: cat.data.name,
      animals: animals
        .filter((animal) => animal.data.selectedCategoryId?.includes(cat.id))
        .map((a) => ({
          id: a.id,
          name: a.data.name,
        }))
    }))
    .filter((group) => group.animals.length > 0);

  const animalsWithoutCategory = animals.filter(
    (animal) =>
      !animal.data.selectedCategoryId ||
      animal.data.selectedCategoryId.length === 0 ||
      (animal.data.selectedCategoryId.length === 1 && animal.data.selectedCategoryId[0].trim() === "")
  );

  if (animalsWithoutCategory.length > 0) {
    groups.push({
      category_id: "no-category",
      category_name: "Animals Without Category",
      animals: animalsWithoutCategory.map((a) => ({
        id: a.id,
        name: a.data.name
      }))
    });
  }

  return groups;
}, [animals, categories]);


  if (animalsLoading || categoriesLoading) return <p>Loading...</p>;

  return (
    <section className={styles.section}>
      <div className={styles.animalGrid}>
        {grouped.map((group) => {
          const animal = group.animals[0];
          if (!animal) return null;

          return (
            <div
              className={styles.animalCard}
              key={`${group.category_id}-${animal.id}`}
              onClick={() => navigate(`/animalswithcategories/category/${group.category_id}`)}
            >
              <div className={styles.imageWrapper}>
                <img
                  className={styles.animalImage}
                  src={imageMap[animal.id]}
                  alt={animal.name}
                />

                <div className={styles.animalInfoWrapper}>
                  <p className={styles.subtitle}>{group.category_name}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AnimalsWithCategories;

import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../Hooks/Fetch/useFetch';
import type { CategoryInterface } from './CategoriesPageInterfaces';
import { useSelector } from 'react-redux';
import type { RootState } from '../../Redux';
import styles from "../AnimalsPage/DetailedAnimalsPage.module.css";
import arrowImg from "../../assets/Fotos/arrow.png";

const DetailedCategoriesPage :React.FC = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const { response: category, loading, error } = useFetch<CategoryInterface>({
    url: `http://localhost:5000/api/v1/resource/CATEGORIES/${categoryId}`,
    method: "GET",
  });

 

  const imageMap = useSelector((state: RootState) => state.animalImages.imageMap);
  const animalImage = categoryId ? imageMap[categoryId] : undefined;


  if (loading) return <p>Loading category details...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!category) return <p>No category found.</p>;

  const name = category.data?.name || category.name || "Unnamed Category";
  const description = category.data?.description || category.description || "No description provided";

  return (
    <div>
      <div className={styles.ArrowDiv}>
        <img src={arrowImg} alt="Back" onClick={() => navigate("/categories")} />
        <p className={styles.ArrowTitle}>Go back</p>
      </div>

      <div className={styles.DetailedPageContent}>
        <img className={styles.BigPhoto} src={animalImage} alt={name} />
        <div className={styles.DetailedPageText}>
          <h2 className={styles.Title}>{name}</h2>
          <div className={styles.DetailedValues}>
            <div className={styles.DetailedValuesMini}>
            </div>
          </div>
          <h2 className={styles.Description}>{description}</h2>
        </div>
      </div>
    </div>
  );
};
export default DetailedCategoriesPage

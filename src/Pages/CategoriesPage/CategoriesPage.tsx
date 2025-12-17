import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { CategoryInterface } from './CategoriesPageInterfaces';
import styles from '../AnimalsPage/AnimalsPage.module.css';
import qrIcon from "../../assets/Fotos/Qr.png";
import { useResourceData } from '../../Hooks/useResourceData/useResourceData';

const CategoriesPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    data: categories,
    error,
    loading,
    imageMap,
  } = useResourceData<CategoryInterface>(
    'http://localhost:5000/api/v1/resource/CATEGORIES',
    'Categories'
  );

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error loading categories: {error.message}</p>;

  return (
    <section className={styles.section}>
      <div className={styles.headerMini}>
        <h2 className={styles.title}>All Categories</h2>
      </div>

      {categories && categories.length === 0 ? (
        <p>No categories available at the moment.</p>
      ) : (
        <div className={styles.animalGrid}>
          {categories?.map((category) => (
            <div
              key={category.id}
              className={styles.animalCard}
              onClick={() => navigate(`/categories/${category.id}`)}
            >
              <img
                className={styles.animalImage}
                src={imageMap[category.id]}
                alt={category.data?.name || category.name}
              />
              <div className={styles.animalInfoWrapper}>
                <div>
                  <h4 className={styles.h4}>
                    {category.data?.name || category.name}
                  </h4>
                </div>
                <img className={styles.qrIcon} src={qrIcon} alt="Qr-Icon" />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CategoriesPage;

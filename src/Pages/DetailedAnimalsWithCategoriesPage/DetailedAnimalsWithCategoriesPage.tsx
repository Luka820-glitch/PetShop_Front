import { useParams, useNavigate } from "react-router-dom";
import { useResourceData } from "../../Hooks/useResourceData/useResourceData";
import type { AnimalInterface } from "../AnimalsPage/AnimalsPageInterfaces";
import type { CategoryInterface } from "../CategoriesPage/CategoriesPageInterfaces";
import styles from "../AnimalsPage/DetailedAnimalsPage.module.css";
import arrowImg from "../../assets/Fotos/arrow.png";

const DetailedAnimalsWithCategoriesPage: React.FC = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const {
    data: animals,
    loading: animalsLoading,
    error: animalsError,
    imageMap,
  } = useResourceData<AnimalInterface>(
    "http://localhost:5000/api/v1/resource/ANIMALS",
    "Animals"
  );

  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useResourceData<CategoryInterface>(
    "http://localhost:5000/api/v1/resource/CATEGORIES",
    "Categories"
  );

  if (animalsLoading || categoriesLoading) return <p>Loading...</p>;
  if (animalsError) return <p>Error loading animals: {animalsError.message}</p>;
  if (categoriesError) return <p>Error loading categories: {categoriesError.message}</p>;
  if (!animals || !categoryId) return <p>No animals found for this category.</p>;

  const filteredAnimals = categoryId === "no-category"
    ? animals.filter(
        (animal) =>
          !animal.data.selectedCategoryId ||
          animal.data.selectedCategoryId.length === 0 ||
          (animal.data.selectedCategoryId.length === 1 && animal.data.selectedCategoryId[0].trim() === "")
      )
    : animals.filter((animal) =>
        animal.data.selectedCategoryId?.some(
          (id) => String(id).trim() === String(categoryId).trim()
        )
      );

  const categoryName =
    categoryId === "no-category"
      ? "Animals Without Category"
      : categories?.find((cat) => cat.id === categoryId)?.data.name || "Unknown Category";

  return (
    <div className={styles.section}>
      <div className={styles.ArrowDiv}>
        <img src={arrowImg} alt="Back" onClick={() => navigate("/")} />
        <p className={styles.ArrowTitle}>Return to Home</p>
      </div>

      <h1 className={styles.title} style={{ marginLeft: "100px" }}>
        Category: {categoryName}
      </h1>

      <div className={styles.DetailedPageContent}>
        {filteredAnimals.length > 0 && (
          <img
            className={styles.BigPhoto}
            src={imageMap[filteredAnimals[0].id]}
            alt={filteredAnimals[0].data.name}
          />
        )}

        <div className={styles.DetailedPageText}>
          {filteredAnimals.map((animal) => (
            <div className={styles.DetailedPageText} key={animal.id}>
              <h3
                className={styles.Title}
                onClick={() => navigate(`/animals/${animal.id}`)}
                style={{ cursor: "pointer" }}
              >
                Animal: {animal.data.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailedAnimalsWithCategoriesPage;

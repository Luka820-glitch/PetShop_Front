import styles from "./DetailedAnimalsPage.module.css";
import arrowImg from "../../assets/Fotos/arrow.png";
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../Hooks/Fetch/useFetch';
import type { AnimalInterface } from './AnimalsPageInterfaces';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../Redux';
import { toast } from 'react-toastify';
import { addToCart } from '../../Redux/slices/cartSlice';
import { useCurrency } from '../../Hooks/useCurrency/useCurrency';
import { addToWishlist } from "../../Redux/slices/wishlistSlice";

const DetailedAnimalsPage: React.FC = () => {
  const { animalId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { response: animal, loading, error } = useFetch<AnimalInterface>({
    url: `http://localhost:5000/api/v1/resource/ANIMALS/${animalId}`,
    method: "GET",
  });

  const imageMap = useSelector((state: RootState) => state.animalImages.imageMap);
  const animalImage = animalId ? imageMap[animalId] : undefined;

  const { currency, toggleCurrency, formatPrice } = useCurrency();

  if (loading) return <p>Loading animal details...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!animal) return <p>No animal found.</p>;

  const name = animal.data?.name || animal.name || "Unnamed Animal";
  const description = animal.data?.description || animal.description || "No description provided";
  const price = animal.data?.price ?? animal.price ?? null;

  const handleAddToCart = () => {
    const isOutOfStock = !animal.data?.IsStock || animal.data?.IsStock === 0;
    if (isOutOfStock) {
      toast.error("Out of stock");
      return;
    }

    const animalToAdd: AnimalInterface = {
      ...animal,
      data: {
        ...animal.data,
        id: animal.data?.id ?? animal.id,
        selectedCategoryId: animal.data?.selectedCategoryId ?? animal.selectedCategoryId,
        name: animal.data?.name ?? animal.name,
        price: animal.data?.price ?? animal.price,
        description: animal.data?.description ?? animal.description,
        IsPopular: animal.data?.IsPopular ?? animal.IsPopular,
        IsStock: animal.data?.IsStock ?? animal.IsStock,
      },
    };

    dispatch(addToCart(animalToAdd));
    toast.success("The animal was added to the cart successfully");
    navigate("/cart");
  };

  const handleAddToWishlist = () => {
    if (!animal) return;

    const animalToAdd: AnimalInterface = {
      ...animal,
      data: {
        ...animal.data,
        id: animal.data?.id ?? animal.id,
        selectedCategoryId: animal.data?.selectedCategoryId ?? animal.selectedCategoryId,
        name: animal.data?.name ?? animal.name,
        price: animal.data?.price ?? animal.price,
        description: animal.data?.description ?? animal.description,
        IsPopular: animal.data?.IsPopular ?? animal.IsPopular,
        IsStock: animal.data?.IsStock ?? animal.IsStock,
      },
    };

    dispatch(addToWishlist(animalToAdd));
    toast.success("Added to wishlist");
    navigate("/wishlist");
  };

  return (
    <div>
      <div className={styles.ArrowDiv}>
        <img src={arrowImg} alt="Back" onClick={() => navigate("/animals")} />
        <p className={styles.ArrowTitle}>Go back</p>
      </div>

      <div className={styles.DetailedPageContent}>
        <img className={styles.BigPhoto} src={animalImage} alt={name} />
        <div className={styles.DetailedPageText}>
          <h2 className={styles.Title}>{name}</h2>
          <div className={styles.DetailedValues}>
            <div className={styles.DetailedValuesMini}>
              <h2 className={styles.AnimalPrice}>{formatPrice(price)}</h2>
              <button className={styles.CurrencyButton} onClick={toggleCurrency}>
                {currency === "GEL" ? "USD" : "GEL"}
              </button>
            </div>
          </div>
          <div className={styles.content}>
            <p className={styles.Description}>{description}</p>
            <p>Stock: {animal.data?.IsStock ?? 0}</p>

            <div className={styles.addButtons}>
              <button className={styles.CurrencyButton} onClick={handleAddToWishlist}>
                Add to wishlist
              </button>
              <button className={styles.CurrencyButton} onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedAnimalsPage;

import { useNavigate } from 'react-router-dom';
import type { AnimalInterface } from './AnimalsPageInterfaces';
import styles from "../../Pages/AnimalsPage/AnimalsPage.module.css";
import qrIcon from "../../assets/Fotos/Qr.png";
import { useResourceData } from '../../Hooks/useResourceData/useResourceData';
import { useCurrency } from '../../Hooks/useCurrency/useCurrency';

const AnimalsPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: animals, error, loading, imageMap } = useResourceData<AnimalInterface>(
    'http://localhost:5000/api/v1/resource/ANIMALS',
    'Animals'
  );

  const { currency, toggleCurrency, formatPrice } = useCurrency();

  if (loading) return <p>Loading animals...</p>;
  if (error) return <p>Error loading animals: {error.message}</p>;

  return (
    <section className={styles.section}>
      <div className={styles.headerMini}>
        <h2 className={styles.title}>All Animals</h2>
        {animals && animals.length > 0 && (
          <button className={styles.currencyButton} onClick={toggleCurrency}>
            {currency === "GEL" ? "USD" : "GEL"}
          </button>
        )}
      </div>

      {animals && animals.length === 0 ? (
        <p>No animals available at the moment.</p>
      ) : (
        <div className={styles.animalGrid}>
          {animals?.map((animal) => {
            const price = animal.data?.price ?? animal.price;
            return (
              <div
                className={styles.animalCard}
                key={animal.id}
                onClick={() => navigate(`/animals/${animal.id}`)}
              >
                <img
                  className={styles.animalImage}
                  src={imageMap[animal.id]}
                  alt={animal.data?.name || animal.name}
                />
                <div className={styles.animalInfoWrapper}>
                  <div>
                    <h4 className={styles.h4}>
                      {animal.data?.name || animal.name}
                    </h4>
                    <p>{formatPrice(price)}</p>
                  </div>
                  <img className={styles.qrIcon} src={qrIcon} alt="Qr-Icon" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default AnimalsPage;

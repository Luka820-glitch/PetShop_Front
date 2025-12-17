import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../Redux";
import styles from "./WishlistPage.module.css";
import { removeFromWishlist } from "../../Redux/slices/wishlistSlice";

const WishlistPage: React.FC = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const imageMap = useSelector((state: RootState) => state.animalImages.imageMap);

  const handleRemove = (id: string) => {
    dispatch(removeFromWishlist(id));
  };

  if (wishlist.length === 0) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>Your wishlist is empty.</p>;
  }

  return (
    <div className={styles.wishlistPage}>
      <h2>Wishlist</h2>
      <ul className={styles.wishlistList}>
        {wishlist.map((item) => {
          const image = imageMap[item.id]; 

          return (
            <li key={item.id} className={styles.wishlistItem}>
              {image ? (
                <img className={styles.image} src={image} alt={item.name} />
              ) : (
                <div className={styles.placeholder}>No Image</div>
              )}
              <h3>{item.data.name ?? "Unnamed Animal"}</h3>
              <button onClick={() => handleRemove(item.id)} className={styles.removeButton}>
                Remove
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default WishlistPage;

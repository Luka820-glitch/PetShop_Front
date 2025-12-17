import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../../Redux";
import { toast } from "react-toastify";
import styles from "../CartPage/CartPage.module.css";
import {
  removeAllFromCart,
  removeFromCart,
  decreaseQuantity,
  addToCart,
  fetchLatestStock,
} from "../../Redux/slices/cartSlice";
import { useCurrency } from "../../Hooks/useCurrency/useCurrency";

const CartPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const imageMap = useSelector((state: RootState) => state.animalImages.imageMap);

  const { currency, toggleCurrency, formatPrice } = useCurrency();

  useEffect(() => {
    dispatch(fetchLatestStock());
  }, [dispatch]);

  const totalPrice = cartItems.reduce((acc, item) => {
    const price = parseFloat(String(item.data.price ?? 0));
    const quantity = item.quantity ?? 1;
    return acc + (isNaN(price) ? 0 : price * quantity);
  }, 0);

  const handleBuyNow = async () => {
    try {
      let anyIssue = false;

      for (const item of cartItems) {
        if (item.liveStock === null) {
          toast.error(`"${item.data.name}" no longer exists.`);
          anyIssue = true;
          continue;
        }

        const quantity = item.quantity ?? 1;

        if (item.liveStock < quantity) {
          toast.error(`Not enough stock for "${item.data.name}".`);
          anyIssue = true;
          continue;
        }

        await fetch(`http://localhost:5000/api/v1/resource/ANIMALS/${item.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-bypass-token": import.meta.env.VITE_APP_API_KEY,
          },
          body: JSON.stringify({
            data: {
              ...item.data,
              IsStock: item.liveStock - quantity,
            },
          }),
        });
      }

      if (!anyIssue) {
        dispatch(removeAllFromCart());
        toast.success("Purchase successful!");
      } else {
        toast.warn("Some items couldn't be purchased because they are out of stock");
      }
    } catch (err) {
      console.error(err);
      toast.error("Purchase failed.");
    }
  };

  if (cartItems.length === 0) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>Your cart is empty.</p>;
  }

  return (
    <div className={styles.cartPage}>
      <h2>Cart</h2>
      <button className={styles.toggleCurrencyBtn} onClick={toggleCurrency}>
        {currency === "GEL" ? "USD" : "GEL"}
      </button>

      <ul className={styles.cartList}>
        {cartItems.map((item) => {
          const name = item.data.name ?? "Unnamed Animal";
          const price = parseFloat(String(item.data?.price ?? 0));
          const stockDisplay = item.liveStock === null ? "Unavailable (Deleted)" : item.liveStock;
          const quantity = item.quantity ?? 1;

          const handleRemove = () => {
            dispatch(removeFromCart(item.id));
            toast.info(`"${name}" removed from cart.`);
          };

          const handleDecrease = () => {
            if (item.liveStock !== null) dispatch(decreaseQuantity(item.id));
          };

          const handleIncrease = () => {
            if (item.liveStock === null) {
              toast.error(`"${name}" is unavailable.`);
              return;
            }
            if (quantity < item.liveStock) {
              dispatch(addToCart(item));
            } else {
              toast.warn(`Only ${item.liveStock} left.`);
            }
          };

          const image = imageMap[item.id];

          return (
            <li key={item.id} className={styles.cartItem}>
              {image ? (
                <img className={styles.image} src={image} alt={name} />
              ) : (
                <div className={styles.placeholder}>No Image</div>
              )}
              <h3 className={styles.title}>{name}</h3>
              <p className={styles.info}>
                Price: {formatPrice(price)} x {quantity}
              </p>
              <p className={styles.info}>Total: {formatPrice(price * quantity)}</p>
              <p className={styles.info}>Stock: {stockDisplay}</p>

              <div className={styles.quantityControls}>
                <button
                  className={styles.quantityButton}
                  onClick={handleDecrease}
                  disabled={item.liveStock === null || quantity <= 1}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  className={styles.quantityButton}
                  onClick={handleIncrease}
                  disabled={item.liveStock === null || quantity >= (item.liveStock ?? 0)}
                >
                  +
                </button>
              </div>

              <button onClick={handleRemove} className={styles.deleteButton}>
                Remove From Cart
              </button>
            </li>
          );
        })}
      </ul>

      <div className={styles.totalSection}>
        <h3 className={styles.title}>Total Price: {formatPrice(totalPrice)}</h3>
        <button className={styles.buyNowBtn} onClick={handleBuyNow}>
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default CartPage;

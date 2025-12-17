import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { AnimalInterface } from "../../Pages/AnimalsPage/AnimalsPageInterfaces";

interface CartItem extends AnimalInterface {
  quantity: number;
  liveStock: number | null;
}

interface CartState {
  items: CartItem[];
}


interface AnimalResponse {
  data: {
    IsStock?: number;
  };
}


const loadCart = (): CartItem[] => {
  try {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const initialState: CartState = {
  items: loadCart(),
};


export const fetchLatestStock = createAsyncThunk<
  CartItem[],
  void,
  { state: { cart: CartState } }
>(
  "cart/fetchLatestStock",
  async (_, { getState }) => {
    const state = getState();
    const updatedItems = await Promise.all(
      state.cart.items.map(async (item) => {
        try {
          const res = await fetch(`http://localhost:5000/api/v1/resource/ANIMALS/${item.id}`, {
            headers: {
              "x-bypass-token": import.meta.env.VITE_APP_API_KEY,
            },
          });

          if (!res.ok) {
            if (res.status === 404) {
              return { ...item, liveStock: null };
            }
            throw new Error("Fetch failed");
          }

          const data: AnimalResponse = await res.json();
          return { ...item, liveStock: data?.data?.IsStock ?? 0 };
        } catch {
          return { ...item, liveStock: null };
        }
      })
    );

    return updatedItems;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<AnimalInterface>) {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) existing.quantity += 1;
      else state.items.push({ ...action.payload, quantity: 1, liveStock: action.payload.data?.IsStock ?? null, });
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(i => i.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    decreaseQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        if (item.quantity > 1) item.quantity -= 1;
        else state.items = state.items.filter(i => i.id !== action.payload);
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    removeAllFromCart(state) {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLatestStock.fulfilled, (state, action) => {
      state.items = action.payload;
      localStorage.setItem("cart", JSON.stringify(state.items));
    });
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseQuantity,
  removeAllFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;

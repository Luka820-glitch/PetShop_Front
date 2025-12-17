import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getRandomImage } from "../../Components/AnimalImagesdata";

interface AnimalImageState {
  imageMap: Record<string, string>;
}

const initialState: AnimalImageState = {
  imageMap: JSON.parse(localStorage.getItem("animalImageMap") || "{}"),
};

const animalImagesSlice = createSlice({
  name: "animalImages",
  initialState,
  reducers: {
    assignImagesForAnimals(state, action: PayloadAction<string[]>) {
      let updated = false;
      action.payload.forEach((id) => {
        if (!state.imageMap[id]) {
          state.imageMap[id] = getRandomImage();
          updated = true;
        }
      });

      if (updated) {
        localStorage.setItem("animalImageMap", JSON.stringify(state.imageMap));
      }
    },
  },
});

export const { assignImagesForAnimals } = animalImagesSlice.actions;
export default animalImagesSlice.reducer;

import { Route, Routes, Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";
import MainPage from "../Pages/MainPage/MainPage";
import AnimalsPage from "../Pages/AnimalsPage/AnimalsPage";
import CategoriesPage from "../Pages/CategoriesPage/CategoriesPage";
import CartPage from "../Pages/CartPage/CartPage";
import WishlistPage from "../Pages/WishlistPage/WishlistPage";
import DetailedAnimalsPage from "../Pages/AnimalsPage/DetailedAnimalsPage";
import DetailedCategoriesPage from "../Pages/CategoriesPage/DetailedCategoriesPage";
import DetailedAnimalsWithCategoriesPage from "../Pages/DetailedAnimalsWithCategoriesPage/DetailedAnimalsWithCategoriesPage";
import Footer from "../Components/Footer/Footer";

const LayoutWithHeaderAndFooter = () => (
  <>
    <div className="page">
      <Header />
      <main className="content"><Outlet /></main>
      <Footer/>
    </div>
   
  </>
);


const LayoutWithoutHeaderAndFooter = () => (
  <main><Outlet /></main>
);

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<LayoutWithHeaderAndFooter />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/animals" element={<AnimalsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
      </Route>

      <Route element={<LayoutWithoutHeaderAndFooter />}>
        <Route path="/animals/:animalId" element={<DetailedAnimalsPage />} />
        <Route path="/categories/:categoryId" element={<DetailedCategoriesPage/>}/>
        <Route path="/animalswithcategories/category/:categoryId" element={<DetailedAnimalsWithCategoriesPage/>}/>
      </Route>
    </Routes>
  );
};

export default AppRouter;

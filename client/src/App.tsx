import { Route, Routes } from "react-router-dom";
import LayoutWrapper from "./components/wrappers/layout-wrapper";
import LoginPage from "./pages/auth/login-page";
import RegisterPage from "./pages/auth/register-page";
import Home from "./pages/home";
import ProtectedWrapper from "./components/wrappers/protected-wrapper";
import BannerPage from "./pages/banner";
import ProductPage from "./pages/products"
import ProductIdPage from "./pages/products/productId"
import CategoryPage from "./pages/category";
import BannerIDPage from "./pages/banner/bannerIdPage";
import CategoryIdPage from "./pages/category/categoryIdPage";
import StoreIDPage from "./pages/store";

function App() {
  return (
    <Routes>
      {/* auth routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* dashboard routes */}
      <Route path="/" element={<ProtectedWrapper />}>
        {/* Store Routes */}
        <Route index element={<Home />} />

        <Route path=":storeId/" element={<LayoutWrapper />}>
          <Route index element={<StoreIDPage />} />
          {/* Banner Pages */}
          <Route path="banner" element={<BannerPage />} />
          <Route path="banner/:bannerId" element={<BannerIDPage />} />

          {/* Category Pages */}
          <Route path="category" element={<CategoryPage />} />
          <Route path="category/:categoryId" element={<CategoryIdPage />} />

          {/* Product Pages */}
          <Route path="products" element={<ProductPage />} />
          <Route path="products/:productId" element={<ProductIdPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

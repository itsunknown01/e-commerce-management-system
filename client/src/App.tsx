import { Navigate, Route, Routes } from "react-router-dom";

import LayoutWrapper from "./components/wrappers/layout-wrapper";
import LoginPage from "./pages/auth/login-page";
import RegisterPage from "./pages/auth/register-page";
import Home from "./pages/home";
import ProtectedWrapper from "./components/wrappers/protected-wrapper";
import BannerPage from "./pages/banner";
import ProductPage from "./pages/products";
import ProductIdPage from "./pages/products/productId";
import CategoryPage from "./pages/category";
import BannerIDPage from "./pages/banner/bannerIdPage";
import CategoryIdPage from "./pages/category/categoryIdPage";
import StoreIDPage from "./pages/store";
import BillboardPage from "./pages/billboard";
import BillboardIdPage from "./pages/billboard/billboardId";
import SizePage from "./pages/sizes";
import SizeIdPage from "./pages/sizes/sizeId";
import ColorPage from "./pages/color";
import ColorIdPage from "./pages/color/colorId";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
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

          {/* Billboard Pages */}
          <Route path="billboard" element={<BillboardPage />} />
          <Route path="billboard/:billboardId" element={<BillboardIdPage />} />

          {/* Category Pages */}
          <Route path="category" element={<CategoryPage />} />
          <Route path="category/:categoryId" element={<CategoryIdPage />} />

          {/* Product Pages */}
          <Route path="products" element={<ProductPage />} />
          <Route path="products/:productId" element={<ProductIdPage />} />
  
          {/* Size Pages */}
          <Route path="sizes" element={<SizePage />} />
          <Route path="sizes/:sizeId" element={<SizeIdPage />} />
  
          {/* Color Pages */}
          <Route path="colors" element={<ColorPage />} />
          <Route path="colors/:colorId" element={<ColorIdPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

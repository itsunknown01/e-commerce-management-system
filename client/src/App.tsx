import { Route, Routes } from "react-router-dom";
import LayoutWrapper from "./components/wrappers/layout-wrapper";
import LoginPage from "./pages/auth/login-page";
import RegisterPage from "./pages/auth/register-page";
import Home from "./pages/home";
import Test from "./pages/test";

function App() {
  return (
    <Routes>
      {/* auth routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* dashboard routes */}
      <Route path="/" element={<LayoutWrapper />}>
        <Route path="/" element={<Home />} />
      </Route>
      {/* project routes */}
      <Route path="/" element={<LayoutWrapper />}>
        <Route path="/test" element={<Test />} />
      </Route>
    </Routes>
  );
}

export default App;

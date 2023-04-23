import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  lazy,
  Suspense,
} from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import NavBarPage from "./pages/navbar-page";
import FooterPage from "./pages/footer-page";
const NewPage = lazy(() => import("./pages/new-page"));
const ProductDetailPage = lazy(() => import("./pages/product-detail-page"));
const CartPage = lazy(() => import("./pages/cart-page"));
const LoginPage = lazy(() => import("./pages/login-page"));
const CreateAccPage = lazy(() => import("./pages/createAcc-page"));
const PrivatePage = lazy(() => import("./pages/private-page"));
const ProfilePage = lazy(() => import("./pages/profile-page"));
const ChangePasswordPage = lazy(() => import("./pages/change-password-page"));
const ChatBoxPage = lazy(() => import("./pages/chat-box"));
function App() {
  const [sideBar, setSideBar] = useState(false);
  const [activeSearch, setActiveSearch] = useState(false);
  const [scrolled, setScrolled] = useState(0);
  const prevScrolledRef = useRef(window.pageYOffset);
  const handleResize = useCallback(() => {
    if (window.innerWidth > 1024) {
      setSideBar(false);
    } else if (window.innerWidth > 768) {
      setActiveSearch(false);
    }
  }, []);
  const handleScroll = useCallback(() => {
    const currentScrollPos = window.pageYOffset;
    if (currentScrollPos < 1) {
      setScrolled(0);
    } else {
      if (prevScrolledRef.current > currentScrollPos) {
        setScrolled(0);
      } else {
        setScrolled(-150);
      }
    }
    prevScrolledRef.current = currentScrollPos;
  }, []);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleResize, handleScroll]);
  return (
    <>
      <BrowserRouter>
        <NavBarPage
          sideBar={sideBar}
          setSideBar={setSideBar}
          activeSearch={activeSearch}
          setActiveSearch={setActiveSearch}
          scrolled={scrolled}
        />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/New" />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/New/cart" element={<CartPage />} />
            <Route
              path="/New"
              element={
                <NewPage sideBar={sideBar} activeSearch={activeSearch} />
              }
            />
            <Route
              path="/New/products/:id"
              element={
                <ProductDetailPage
                  sideBar={sideBar}
                  activeSearch={activeSearch}
                />
              }
            />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route
              path="/login"
              element={
                <LoginPage sideBar={sideBar} activeSearch={activeSearch} />
              }
            />
            <Route
              path="/createAccount"
              element={
                <CreateAccPage sideBar={sideBar} activeSearch={activeSearch} />
              }
            />
            <Route element={<PrivatePage />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/changePassword" element={<ChangePasswordPage />} />
            </Route>
          </Routes>
          <FooterPage sideBar={sideBar} activeSearch={activeSearch} />
          <ChatBoxPage sideBar={sideBar} activeSearch={activeSearch} />
        </Suspense>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}
export default App;
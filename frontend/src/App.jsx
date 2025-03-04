import './App.css';
import { BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';

import Navbar from "./landing-page/Navbar";
import Footer from "./landing-page/Footer";

import LifestorePage from './landing-page/life-store/LifestorePage';
import HomePage from "./landing-page/home/HomePage";
import NewsEventPage from './landing-page/news&events/NewsEventPage';
import UnderstandDonationPage from './landing-page/understand-donation/UnderstandDonationPage';
import DonorRegister from './landing-page/register/DonorRegister';
import RecipientRegister from './landing-page/register/RecipientRegister';
import NotFound from './landing-page/NotFound';
import AboutPage from './landing-page/about/AboutPage';
import Contribute from './landing-page/contribute/Contribute';
import Story from './landing-page/recipient-story/Story';
import Login from './landing-page/login/Login';
import Signup from './landing-page/login/Signup';
import AdminPage from './admin/AdminPage';
import {AuthProvider} from "./AuthProvider";
import ResetPassword from './landing-page/login/ResetPassword';
import SetNewPassword from "./landing-page/login/SetNewPassword";

const AppRoutes = () => {
  const location = useLocation();

  // Check if the URL starts with "/admin"
  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <AdminPage />; // Render only the admin dashboard without AuthProvider
  }
  return(
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contribute" element={<Contribute />} />
        <Route path="/donate-life-store" element={<LifestorePage />} />
        <Route path="/story" element={<Story />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/news-event" element={<NewsEventPage />} />
        <Route path="/understand-donation" element={<UnderstandDonationPage />} />
        <Route path="/register-donor" element={<DonorRegister />} />
        <Route path="/register-recipient" element={<RecipientRegister />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ResetPassword />} />
        <Route path="/set-newpassword" element={<SetNewPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;


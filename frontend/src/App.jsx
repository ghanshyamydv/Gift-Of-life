import './App.css';
import { BrowserRouter, Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import { useContext, useEffect } from 'react';
import Navbar from "./landing-page/Navbar";
import Footer from "./landing-page/Footer";

import LifestorePage from './landing-page/life-store/LifestorePage';
import HomePage from "./landing-page/home/HomePage";
import NewsEventPage from './landing-page/news&events/NewsEventPage';
import UnderstandDonationPage from './landing-page/understand-donation/UnderstandDonationPage';
import DonorRegister from './landing-page/register/DonorRegister';
import RecipientRegister from './landing-page/register/RecipientRegister';
import PageNotFound from './landing-page/PageNotFound';
import AboutPage from './landing-page/about/AboutPage';
import Contribute from './landing-page/contribute/Contribute';
import Story from './landing-page/story/DonorStories';
import Login from './landing-page/login/Login';
import Signup from './landing-page/login/Signup';
import AdminPage from './admin/AdminPage';
import {AuthProvider} from "./AuthProvider";
import ResetPassword from './landing-page/login/ResetPassword';
import SetNewPassword from "./landing-page/login/SetNewPassword";
import ViewNewsAndEvent from './landing-page/news&events/ViewNewsAndEvent';
import DonorStories from './landing-page/story/DonorStories';
import RecipientStories from './landing-page/story/RecipientStories';
import CreateStory from './landing-page/story/CreateStory';
import ViewDonorStory from './landing-page/story/ViewDonorStory';
import ViewRecipientStory from './landing-page/story/ViewRecipientStory';
import Profile from './landing-page/login/Profile';
import Buy from './landing-page/life-store/Buy';
import ThankYouPage from './landing-page/life-store/ThankYouPage';
import Donors from './landing-page/donor-recipient/Donors';
import Recipients from './landing-page/donor-recipient/Recipients';
import Statistics from './landing-page/Statistics';
import { AdminAuthProvider } from './admin/AdminAuthProvider';
const AppRoutes = () => {
  const location = useLocation();
  // Check if the URL starts with "/admin"
  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <AdminAuthProvider><AdminPage /></AdminAuthProvider>; // Render only the admin dashboard without AuthProvider
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
        <Route path="/statistics" element={<Statistics/>} />
        <Route path="/news-event" element={<NewsEventPage />} />
        <Route path="/understand-donation" element={<UnderstandDonationPage />} />
        <Route path="/register-donor" element={<DonorRegister />} />
        <Route path="/register-recipient" element={<RecipientRegister />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ResetPassword />} />
        <Route path="/set-newpassword" element={<SetNewPassword />} />
        <Route path="/news-event/:id" element={<ViewNewsAndEvent/>} />
        <Route path="/donor-stories" element={<DonorStories/>} />
        <Route path="/recipient-stories" element={<RecipientStories/>} />
        <Route path="/donor-stories/:id" element={<ViewDonorStory/>} />
        <Route path="/recipient-stories/:id" element={<ViewRecipientStory/>} />
        <Route path="/create-story" element={<CreateStory/>} />
        <Route path="/:id/buy" element={<Buy/>} />
        <Route path="/:id/profile" element={<Profile/>} />
        <Route path="/thank-you" element={<ThankYouPage/>} />
        <Route path="/donors" element={<Donors/>} />
        <Route path="/recipients" element={<Recipients/>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
};

const App = () => {
  // useEffect(() => {
  //   const disableZoom = (event) => {
  //     if (event.touches.length > 1) {
  //       event.preventDefault(); // Prevent pinch-to-zoom
  //     }
  //   };

  //   const disableDoubleTapZoom = (event) => {
  //     event.preventDefault(); // Prevent double-tap zoom
  //   };

  //   document.addEventListener("touchmove", disableZoom, { passive: false });
  //   document.addEventListener("dblclick", disableDoubleTapZoom, { passive: false });

  //   return () => {
  //     document.removeEventListener("touchmove", disableZoom);
  //     document.removeEventListener("dblclick", disableDoubleTapZoom);
  //   };
  // }, []);
  // useEffect(() => {
  //   const disableScroll = (event) => {
  //     event.preventDefault();
  //   };

  //   const lockScroll = () => {
  //     document.body.style.overflow = "hidden"; // Disable scroll
  //     document.addEventListener("touchmove", disableScroll, { passive: false });
  //   };

  //   const unlockScroll = () => {
  //     document.body.style.overflow = ""; // Enable scroll
  //     document.removeEventListener("touchmove", disableScroll);
  //   };

  //   return () => {
  //     unlockScroll(); // Cleanup on component unmount
  //   };
  // }, []);
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;


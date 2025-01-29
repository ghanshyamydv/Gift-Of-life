import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import Navbar from "./landing-page/Navbar";
import Footer from "./landing-page/Footer";

import LifestorePage from './landing-page/life-store/LifestorePage';
import HomePage from "./landing-page/home/HomePage";
import NewsEventPage from './landing-page/news&events/NewsEventPage';
import UnderstandDonationPage from './landing-page/understand-donation/UnderstandDonationPage';
import DonorRegister from './landing-page/register/DonorRegister';
import RecepientRegister from './landing-page/register/RecepientRegister';
import NotFound from './landing-page/NotFound';
import AboutPage from './landing-page/about/AboutPage';
import Contribute from './landing-page/contribute/Contribute';
import Story from './landing-page/recepient-story/Story';
function App(){
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/contribute' element={<Contribute/>}/>
        <Route path='/donate-life-store' element={<LifestorePage/>}/>
        <Route path='/story' element={<Story/>}/>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/about' element={<AboutPage/>}/>
        <Route path='/news-event' element={<NewsEventPage/>}/>
        <Route path='/understand-donation' element={<UnderstandDonationPage/>}/>
        <Route path='/register-donor' element={<DonorRegister/>}/>
        <Route path='/register-recepient' element={<RecepientRegister/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;

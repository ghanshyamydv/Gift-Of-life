
import { useContext } from "react";
import "./AdminPage.css"
import AdminDashboard from "./AdminDashboard";
import Sidebar from "./Sidebar";
import { Routes, Route} from 'react-router-dom';
import NewsAndEvent from "./pages/NewsAndEvent";
import PostProduct from "./pages/PostProduct";
import OrderStatus from "./pages/OrderStatus";
import ReviewStoryPage from "./pages/ReviewStories";
import ReviewDonors from "./pages/ReviewDonors";
import ReviewRecipients from "./pages/ReviewRecipients";
import AdminLogin from "./AdminLogin";
import { AdminAuthContext } from "./AdminAuthProvider";
function AdminPage() {
  const {admin, setAdmin, isLoggedIn}=useContext(AdminAuthContext);
  if(!isLoggedIn){
   return <AdminLogin/>
  }
  return (
    <div style={{ display: "flex" }}>
      <Sidebar className="sidebar"/>
      <div  className="content">
      <Routes>
        <Route path="/admin/login" element={<AdminLogin/>}/>
        <Route path="/admin" element={<AdminDashboard/>}/>
        <Route path="/admin/news-events" element={<NewsAndEvent/>}/>
        <Route path="/admin/stories" element={<ReviewStoryPage/>}/>
        <Route path="/admin/donors" element={<ReviewDonors/>}/>
        <Route path="/admin/recipients" element={<ReviewRecipients/>}/>
        <Route path="/admin/post-product" element={<PostProduct/>}/>
        <Route path="/admin/order-status" element={<OrderStatus/>}/>
      </Routes>
      </div>
    </div>
  );
}

export default AdminPage;

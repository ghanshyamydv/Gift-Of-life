import "./AdminPage.css"
import AdminDashboard from "./AdminDashboard";
import Sidebar from "./Sidebar";
import { Routes, Route} from 'react-router-dom';
import NewsAndEvent from "./pages/NewsAndEvent";
import LifeStore from "./pages/LifeStore";
import Donors from "./pages/Donors";
import Recipients from "./pages/Recipients";
import UserDetail from "./pages/UserDetail";
function AdminPage() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar className="sidebar"/>
      <div  className="content">
      <Routes>
        <Route path="/admin" element={<AdminDashboard/>}/>
        <Route path="/admin/news-events" element={<NewsAndEvent/>}/>
        <Route path="/admin/donors" element={<Donors/>}/>
        <Route path="/admin/recipients" element={<Recipients/>}/>
        <Route path="/admin/life-store" element={<LifeStore/>}/>
        <Route path="/admin/users" element={<UserDetail/>}/>
      </Routes>
      </div>
    </div>
  );
}

export default AdminPage;

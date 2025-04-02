import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DailyTask from './components/DailyTask';
import AttendanceHeader from "./components/Attendance/AttendanceHeader";
import DailyReport from "./components/DailyReport/DailyReport";
import NewReport from "./components/NewReport";
import MdAdminPanel from "./components/LC Request/AdminPanel";
import Form from "./components/LC Request/Form";
import Navbar from "./components/Navbar";
import EmployeeDashboard from "./components/EmployeeDashboard";
import Welcome from './components/Welcome';
import LoginSignup from './components/LoginSignup';
import LoginForm from './components/LoginForm';
import Loginaccess from './components/Loginaccess';
import Track from './components/Track';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import MapCard from './components/MapCard';
import Workers from './components/Workers';
import Workers1 from './components/Workers1';
import Announcement from './components/Announcement';
import Add from './components/Add';
import ParentComponent from './components/ParentComponent';
import Leave from './components/Leave';
import Hour from './components/Hour';
import Workerdetail from './components/Workerdetail';
import { Task } from '@mui/icons-material';
import Tasks from './components/Task';
import Workerdetails from './components/WorkerDetails';
import Categorypage from './components/Categerypage';
import Employeprofile from './components/EmployeeDashboard';
import Report from './components/DailyReport/DailyReport';
import UAttendance from './components/AttendanceHeader';
import NavbarMain from "./components/Navbarmain";
import Login from './components/login';
import DriverLocationTracker from './components/sharelocation';
import Location1 from './components/NewReport';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/attendance" element={<AttendanceHeader />} />
        <Route path="/reports" element={<DailyReport />} />
        <Route path="/new" element={<NewReport />} />
        <Route path="/admin" element={<MdAdminPanel />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/detailss" element={<EmployeeDashboard />} />
        <Route path="/main" element={<NavbarMain />} />
        <Route path="/lc-request" element={<Form />} />
        

                  
                  <Route path="/login-signup" element={<LoginSignup />} />
                  <Route path="/login-form" element={<LoginForm />} />
                  <Route path="/login" element={<Loginaccess />} />
                  <Route path="/track" element={<Track />} />
                  <Route path="/header" element={<Header />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/map-card" element={<MapCard />} />
                  <Route path="/workers" element={<Workers />} />
                  <Route path="/workers1" element={<Workers1 />} />
                  <Route path="/announcement" element={<Announcement />} />
                  <Route path="/add" element={<Add />} />
                  <Route path="/parent" element={<ParentComponent />} />
                  <Route path="/leave" element={<Leave />} />
                  <Route path="/hour" element={<Hour />} />
                  {/* Redirect for any unknown routes */}
                  <Route path="/Workerdetail" element={<Workerdetail />} />
                  <Route path="/task" element={<Tasks />} />
                  <Route path="/workerdetails" element={<Workerdetails />} />
                  <Route path="/category" element={<Categorypage />} />
                  <Route path="/dailytask" element={<DailyTask />} />
                  <Route path="/employeeprofile" element={<Employeprofile />} />
                  <Route path="/reportss" element={<Report />} />
                  <Route path="/attendances" element={<UAttendance />} />
                  <Route path="/loginn" element={<Login />} />
                  <Route path="/sharelocation" element={<DriverLocationTracker />} />
                  <Route path="/report" element={<Location1 />} />
                
      </Routes>
    </Router>
  );
}

export default App;


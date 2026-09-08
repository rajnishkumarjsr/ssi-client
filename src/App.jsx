import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Courses from './pages/Courses.jsx';
import Contact from './pages/Contact.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Enroll from './pages/Enroll.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Certificates from './pages/Certificates.jsx';
import Paths from './pages/Paths.jsx';
import Resources from './pages/Resources.jsx';
import Tutorials from './pages/Tutorials.jsx';
import Community from './pages/Community.jsx';
import Chat from './pages/Chat.jsx';
import Help from './pages/Help.jsx';
import Faq from './pages/Faq.jsx';
import Careers from './pages/Careers.jsx';
import Privacy from './pages/Privacy.jsx';
import Terms from './pages/Terms.jsx';
import GmatOnline from './pages/CourseDetail/gmt-online.jsx';
import Gre from './pages/CourseDetail/gre.jsx';
import Sat from './pages/CourseDetail/sat.jsx';
import Ielts from './pages/CourseDetail/ielts.jsx';
import SatOnline from './pages/CourseDetail/sat-online.jsx';
import CatOnline from './pages/CourseDetail/cat-online.jsx';
import GMAT from './pages/CourseDetail/gmt.jsx';


export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programs" element={<Courses />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/enroll" element={<Enroll />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/paths" element={<Paths />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/tutorials" element={<Tutorials />} />
        <Route path="/community" element={<Community />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/help" element={<Help />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/gmt-online" element={<GmatOnline />} />
        <Route path="/gre" element={<Gre />} />
        <Route path="/sat" element={<Sat />} />
        <Route path="/ielts" element={<Ielts />} />
        <Route path="/sat-online" element={<SatOnline />} />
        <Route path='/cat-online' element={<CatOnline />} />
        <Route path='/gmt' element={<GMAT />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

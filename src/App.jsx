import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Conferences from "./pages/Conferences";
import Navbar from "./components/Navbar";
import "./App.css";
import "./index.css";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Search from "./pages/Search";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import EventDetails from "./pages/EventDetails";
import Booking from "./pages/Booking";
import BookingSuccess from "./pages/BookingSuccess";
import ApiTest from "./ApiTest";
import MyBookings from "./pages/MyBookings";
import BookingTicket from "./pages/BookingTicket";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/conferences" element={<Conferences />} />
        <Route path="/events/:slug" element={<EventDetails />} />
        <Route path="/conferences/:slug" element={<EventDetails />} />
        <Route path="/booking/:slug" element={<Booking />} />
        <Route path="/booking-success"element={<BookingSuccess />}/>
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/apitest" element={<ApiTest />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/booking-ticket" element={<BookingTicket />} />


      </Routes>
      <Footer />
    </>
  );
}

export default App;

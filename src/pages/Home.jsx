import { NavLink } from "react-router-dom";
import heroImage from "../assets/images/hero-image.png";
import EventTypes from "../components/EventTypes";
import EventCard from "../components/EventCard";
import MahfelFeatures from "../components/MahfelFeatures";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getEvents, getConferences } from "../services/api";
import { UsersRound, CalendarCheck, Mic2, MapPin } from "lucide-react";

function Home() {
  const [events, setEvents] = useState([]);
  const [conferences, setConferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);

        const [eventsData, conferencesData] = await Promise.all([
          getEvents(),
          getConferences(),
        ]);

        setEvents(eventsData);
        setConferences(conferencesData);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const homeEvents = events.slice(0, 3);
  const homeConferences = conferences.slice(0, 3);

  const [search, setSearch] = useState("");
  const nvigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;
    nvigate(`/search?query=${encodeURIComponent(search)}`);
  };

  return (
    <>
      <section
        className="hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-content">
          <h1>كن جزءًا من الحدث</h1>

          <p>فعاليات ملهمة وتجارب مميزة بانتظارك.</p>

          <NavLink to="/events" className="btn-primary">
            اكتشف الفعاليات
          </NavLink>
        </div>
      </section>

      <section className="search-box">
        <div className="hero-search">
          <form onSubmit={handleSearch}>
            <label htmlFor="event-search">ابحث عن الفعاليات</label>

            <input
              type="search"
              name="search"
              id="event-search"
              placeholder="ابحث عن الفعاليات والمؤتمرات "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button type="submit">ابحث</button>
          </form>
        </div>
      </section>

      <EventTypes />

      <section className="home-events">
        <h2>الفعاليات القادمة</h2>
        {loading && <p>جاري تحميل البيانات...</p>}

        {error && (
          <p className="error-message">
            حدث خطأ أثناء جلب البيانات. يرجى المحاولة مرة أخرى.
          </p>
        )}

        <div className="events-container">
          {homeEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        <div className="events-container">
          {homeConferences.map((conference) => (
            <EventCard key={conference.id} event={conference} />
          ))}
        </div>
      </section>

      <MahfelFeatures />

      <section className="statistics-section">
        <h2>محفل يجمعنا</h2>

        <p className="statistics-description">
          أرقام تعكس أثر الفعاليات والتجارب التي تجمعنا
        </p>

        <div className="statistics-container">
          <div className="statistics-item">
            <UsersRound className="statistics-icon" />
            <h3>300+</h3>
            <p>حضور</p>
          </div>

          <div className="statistics-item">
            <CalendarCheck className="statistics-icon" />
            <h3>20+</h3>
            <p>فعالية</p>
          </div>

          <div className="statistics-item">
            <Mic2 className="statistics-icon" />
            <h3>10+</h3>
            <p>مؤتمر</p>
          </div>

          <div className="statistics-item">
            <MapPin className="statistics-icon" />
            <h3>7+</h3>
            <p>مدينة</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;

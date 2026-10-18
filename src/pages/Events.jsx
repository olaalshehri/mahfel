import { useEffect, useState } from "react";
import heroEvens from "../assets/images/hero-events.png";
import EventFilters from "../components/EventFilters";
import EventCard from "../components/EventCard";
import { getEvents } from "../services/api";

function Events() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await getEvents();

        setEvents(data);
        setFilteredEvents(data);
      } catch (error) {
        setError("تعذّر تحميل الفعاليات. حاولي مرة أخرى.");
        console.error("خطأ في تحميل الفعاليات:", error);
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  const handleFilter = (filters) => {
    let result = [...events];

    if (filters.category) {
      result = result.filter((event) => event.type === filters.category);
    }

    if (filters.city) {
      result = result.filter((event) => event.city === filters.city);
    }

    if (filters.date) {
      const day = String(filters.date.getDate()).padStart(2, "0");
      const month = String(filters.date.getMonth() + 1).padStart(2, "0");
      const year = filters.date.getFullYear();
      const selectedDate = `${year}-${month}-${day}`;
      result = result.filter((event) => event.date === selectedDate);
    }

    result.sort((a, b) => {
      const dataA = new Date(a.date);
      const dataB = new Date(b.date);

      return filters.sort === "newest" ? dataB - dataA : dataA - dataB;
    });

    setFilteredEvents(result);
  };

  return (
    <>
      <section
        className="hero-event"
        style={{ backgroundImage: `url(${heroEvens})` }}
      >
        <div className="hero-event-content">
          <h2>في محفل ، كل فعالية لها حكاية</h2>
          <p>تعرّف على أبرز الفعاليات القادمة واستعد لتجربة مميزة.</p>
        </div>
      </section>

      <EventFilters onFilter={handleFilter} />

      {loading ? (
        <div className="no-results">
          <p>جاري تحميل الفعاليات...</p>
        </div>
      ) : error ? (
        <div className="no-results">
          <h3>{error}</h3>
        </div>
      ) : events.length === 0 ? (
        <div className="no-results">
          <h3>لا توجد فعاليات حاليًا</h3>
          <p>ترقب فعالياتنا القادمة.</p>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="no-results">
          <h3>لم نجد فعاليات مطابقة لبحثك</h3>
          <p>جرّب تغيير خيارات البحث.</p>
        </div>
      ) : (
        <div className="events-container">
          {filteredEvents.map((event) => (
            <EventCard 
            key={event.id} 
            event={event} 
            showDescription />
          ))}
        </div>
      )}
    </>
  );
}

export default Events;

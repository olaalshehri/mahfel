import { useParams, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getEvents,
  getConferences,
  getEventById,
  getConferenceById,
} from "../services/api";
import { formatDate } from "../utils/formatdata";

const images = import.meta.glob("../assets/images/*", {
  eager: true,
  query: "?url",
  import: "default",
});
function EventDetails() {
  const { slug } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDetails() {
      try {
        setLoading(true);
        setError("");

        const [events, conferences] = await Promise.all([
          getEvents(),
          getConferences(),
        ]);

        const event = events.find((item) => item.slug === slug);
        const conference = conferences.find((item) => item.slug === slug);

        if (event) {
          const details = await getEventById(event.id);
          setItem(details);
        } else if (conference) {
          const details = await getConferenceById(conference.id);
          setItem(details);
        } else {
          setItem(null);
        }
      } catch (err) {
        console.error("خطأ في جلب التفاصيل:", err);
        setError("تعذّر تحميل التفاصيل. حاولي مرة أخرى.");
      } finally {
        setLoading(false);
      }
    }

    loadDetails();
  }, [slug]);

  if (loading) {
    return <main className="details-page">جارٍ تحميل التفاصيل...</main>;
  }

  if (error) {
    return <main className="details-page">{error}</main>;
  }

  if (!item) {
    return (
      <main className="details-not-found">
        <h2>عذرًا، لم يتم العثور على الفعالية</h2>
        <NavLink to="/events" className="btn btn-primary">
          العودة إلى الفعاليات
        </NavLink>
      </main>
    );
  }
  const imageName = item.image.split(/[\\/]/).pop();

  const imagePath = images[`../assets/images/${imageName}`];

  const formattedDate = formatDate(item.date);
  const isFree = Number(item.price) === 0;
  return (
    <>
      <main className="details-page">
        <section className="details-hero">
          <img src={imagePath} alt={item.title} />

          <div className="details-overlay">
            <span className="details-category">
              {item.category === "conference" ? "مؤتمر" : "فعالية"}
            </span>

            <h1>{item.title}</h1>
            <p>{item.city}</p>
          </div>
        </section>

        <section className="details-content">
          <div className="details-info">
            <h2>
              عن {item.category === "conference" ? "المؤتمر" : "الفعالية"}
            </h2>
            <p className="details-description">{item.description}</p>

            <div className="details-grid">
              <div className="details-item">
                <span>التاريخ</span>
                <p>{formattedDate}</p>{" "}
              </div>

              {item.time && (
                <div className="details-item">
                  <span>الوقت</span>
                  <p>{item.time}</p>
                </div>
              )}

              <div className="details-item">
                <span>المدينة</span>
                <p>{item.city}</p>
              </div>

              <div className="details-item">
                <span>الموقع</span>
                <p>{item.venue}</p>
              </div>

              {item.organizer && (
                <div className="details-item">
                  <span>الجهة المنظمة</span>
                  <p>{item.organizer}</p>
                </div>
              )}

              <div className="details-item">
                <span>سعر التذكرة</span>
                <p>{isFree ? "مجانية" : `${Number(item.price)} ريال`}</p>{" "}
              </div>
            </div>
          </div>

          <aside className="details-booking">
            <h3>هل أنت مستعد للمشاركة؟</h3>
            <p>
              {item.category === "conference"
                ? "التقِ بالخبراء، وكن جزءًا من حوار يجمع الأفكار والخبرات والتطلعات."
                : "احجز مكانك واستمتع بتجربة فعالية مميزة."}
            </p>

            <NavLink
              to={`/booking/${item.slug}`}
              className="btn btn-primary details-book-btn"
            >
              {isFree ? "احجز مقعدك" : "احجز الآن"}
            </NavLink>
          </aside>
        </section>
      </main>
    </>
  );
}
export default EventDetails;

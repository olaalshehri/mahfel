
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { getMyBookings } from "../services/api";

const images = import.meta.glob("../assets/images/*", {
  eager: true,
  query: "?url",
  import: "default",
});

function MyBookings() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBookings() {
      try {
        const data = await getMyBookings();
        setBookings(data.bookings || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadBookings();
  }, []);

  if (loading) {
    return (
      <main className="my-bookings-page">
        <p className="my-bookings-message">
          جاري تحميل حجوزاتك...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="my-bookings-page">
        <div className="my-bookings-container">
          <h1>حجوزاتي</h1>
          <p className="my-bookings-message">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="my-bookings-page">
      <div className="my-bookings-container">
        <h1>حجوزاتي</h1>

        <p className="my-bookings-description">
          وجهتك لمراجعة حجوزاتك وتفاصيلها بكل سهولة.
        </p>

        {bookings.length === 0 ? (
          <div className="my-bookings-empty">
            <h2>رحلتك مع محفل تبدأ من هنا</h2>
            <p>
              اكتشفي فعاليات ملهمة ومؤتمرات تجمعك بالمعرفة
              والأفكار الجديدة.
            </p>
          </div>
        ) : (
          <div className="my-bookings-list">
            {bookings.map((booking) => {
              const imageName = booking.image
                ?.split("/")
                .pop();

              const imagePath = images[
                `../assets/images/${imageName}`
              ];

              return (
                <article
                  className="my-booking-card"
                  key={booking.id}
                >
                  {imagePath && (
                    <img
                      className="my-booking-image"
                      src={imagePath}
                      alt={booking.title}
                    />
                  )}

                  <h2>{booking.title}</h2>

                  <div className="my-booking-info">
                    <p>
                      <span>تاريخ الفعالية</span>
                      <span>{booking.event_date}</span>
                    </p>

                    <p>
                      <span>رقم الحجز</span>
                      <span>{booking.id}</span>
                    </p>

                    <p>
                      <span>رمز الحجز</span>
                      <span>{booking.booking_code}</span>
                    </p>
                  </div>

                  <div className="my-booking-qr">
                    <QRCode
                      value={booking.booking_code}
                      size={150}
                      level="H"
                      title={`رمز حجز ${booking.booking_code}`}
                    />
                  </div>

                  <p className="my-booking-note">
                    احتفظ بالباركود لإبرازه عند الحضور.
                  </p>
                </article>
              );
            })}
          </div>
        )}

        <button
          type="button"
          className="my-bookings-btn"
          onClick={() => navigate("/")}
        >
          العودة إلى الرئيسية
        </button>
      </div>
    </main>
  );
}

export default MyBookings;

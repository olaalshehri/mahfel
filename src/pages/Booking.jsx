import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { events } from "../data/events";
import { conferences } from "../data/conferences";
import { formatDate } from "../utils/formatdata";
import { createBooking, getCurrentUser } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { addTicket, removeTicket } from "../redux/bookingSlice";

function Booking() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const quantity = useSelector((state) => state.booking.quantity);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const event = [...events, ...conferences].find((item) => item.slug === slug);

  if (!event) {
    return <p>لم يتم العثور على الفعالية</p>;
  }

  const isConference = conferences.some((item) => item.slug === slug);

  const ticketPrice = Number(event.price) || 0;
  const subtotal = ticketPrice * quantity;
  const tax = subtotal * 0.15;
  const total = subtotal + tax;
  const formattedDate = formatDate(event.date);

  async function handleBooking() {
    setError("");
    setIsSubmitting(true);

    try {
      // التأكد من تسجيل الدخول
      await getCurrentUser();

      // إرسال الحجز إلى PHP لحفظه في قاعدة البيانات
      const data = await createBooking({
        slug: event.slug,
        type: isConference ? "conference" : "event",
        quantity,
      });

      const booking = data.booking;

      // الانتقال إلى صفحة تأكيد الحجز بعد نجاح الحفظ
      navigate("/booking-success", {
        state: {
          ...booking,
          title: event.title,
          date: formattedDate,
          city: event.city,
          venue: event.venue,
          quantity: booking.quantity,
          ticketPrice: booking.ticket_price,
          subtotal: booking.subtotal,
          tax: booking.tax,
          total: booking.total,
        },
      });
    } catch (err) {
      if (err.message === "غير مسجل الدخول") {
        navigate("/login", {
          state: {
            from: `/booking/${event.slug}`,
          },
        });
        return;
      }

      setError(err.message || "تعذّر إتمام الحجز، حاولي مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="booking-page">
      <div className="booking-heading">
        <h1>إتمام الحجز</h1>
        <p>أنت على بُعد خطوة من حضور تجربة مميزة.</p>
      </div>

      <div className="booking-layout">
        <section className="booking-details">
          <h2>تفاصيل الحجز</h2>

          <div className="booking-event">
            <img src={event.image} alt={event.title} />

            <div>
              <h3>{event.title}</h3>
              <p>{formattedDate}</p>
              <p>
                {event.city} - {event.venue}
              </p>
            </div>
          </div>

          <div className="booking-tickets">
            <div>
              <h3>عدد التذاكر</h3>
              <p>اختر عدد التذاكر التي ترغب بحجزها</p>
            </div>

            <div className="booking-counter">
              <button
                type="button"
                disabled={quantity === 1 || isSubmitting}
                onClick={() => dispatch(removeTicket())}
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                disabled={quantity === 10 || isSubmitting}
                onClick={() => dispatch(addTicket())}
              >
                +
              </button>
            </div>
          </div>
        </section>

        <aside className="booking-summary">
          <h2>ملخص الحجز</h2>

          <div className="booking-summary-row">
            <span>عدد التذاكر</span>
            <span>{quantity}</span>
          </div>

          <div className="booking-summary-row">
            <span>سعر التذكرة</span>
            <span>{ticketPrice} ريال</span>
          </div>

          <div className="booking-summary-row">
            <span>المجموع الفرعي</span>
            <span>{subtotal.toFixed(2)} ريال</span>
          </div>

          <div className="booking-summary-row">
            <span>ضريبة القيمة المضافة (15%)</span>
            <span>{tax.toFixed(2)} ريال</span>
          </div>

          <div className="booking-summary-total">
            <strong>الإجمالي شامل الضريبة</strong>
            <strong>{total.toFixed(2)} ريال</strong>
          </div>

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <button
            type="button"
            className="booking-confirm-btn"
            onClick={handleBooking}
            disabled={isSubmitting}
          >
            {isSubmitting ? "جارٍ حفظ الحجز..." : "متابعة الحجز"}
          </button>
        </aside>
      </div>
    </main>
  );
}

export default Booking;

import { useLocation, useNavigate } from "react-router-dom";

function BookingSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <main className="booking-success">
        <h2>لا توجد بيانات للحجز</h2>
        <button onClick={() => navigate("/events")}>
          العودة إلى الفعاليات
        </button>
      </main>
    );
  }

  return (
    <>
      <main className="booking-success">
        <div className="booking-success-card">
          <div className="booking-success-icon">✓</div>

          <h1>تم تأكيد حجزك بنجاح!</h1>
          <p>شكرًا لك، يسعدنا انضمامك إلى محفل.</p>

          <div className="booking-success-details">
            <h2>{state.title}</h2>

            <p>التاريخ: {state.date}</p>
            <p>المدينة: {state.city}</p>
            <p>الموقع: {state.venue}</p>
            <p>عدد التذاكر: {state.quantity}</p>
            <p>
              سعر التذكرة:
              {Number(state.ticketPrice) === 0
                ? "مجانية"
                : `${Number(state.ticketPrice)} ريال`}
            </p>
            <p>المجموع الفرعي: {state.subtotal.toFixed(2)} ريال</p>
            <p>الضريبة: {state.tax.toFixed(2)} ريال</p>
            <div className="booking-success-total">
              <strong>الإجمالي:</strong>
              <strong>{state.total.toFixed(2)} ريال</strong>
            </div>
          </div>

          <button
            type="button"
            className="booking-success-btn"
            onClick={() =>
              navigate("/booking-ticket", {
                state,
              })
            }>
            عرض التذكرة والباركود
          </button>
        </div>
      </main>
    </>
  );
}

export default BookingSuccess;

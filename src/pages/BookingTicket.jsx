import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";

function BookingTicket() {
  const { state } = useLocation();
  const navigate = useNavigate();

  function downloadQR() {
    const svg = document.getElementById("booking-qr");

    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });

    const url = URL.createObjectURL(svgBlob);
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 400;
      canvas.height = 400;

      const context = canvas.getContext("2d");

      if (!context) {
        URL.revokeObjectURL(url);
        return;
      }

      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, 400, 400);

      URL.revokeObjectURL(url);

      const link = document.createElement("a");
      link.download = `mahfel-ticket-${state.booking_code}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      console.error("تعذّر إنشاء صورة الباركود.");
    };

    image.src = url;
  }

  if (!state || !state.booking_code) {
    return (
      <main className="booking-success">
        <div className="booking-success-card">
          <h2>لا توجد بيانات للتذكرة</h2>

          <button
            type="button"
            className="booking-success-btn"
            onClick={() => navigate("/events")}
          >
            العودة إلى الفعاليات
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="booking-success">
      <div className="booking-success-card">
        <div className="booking-success-icon">✓</div>

        <h1>تذكرتك الإلكترونية</h1>
        <p>احتفظي بالباركود لإبرازه عند الحضور.</p>

        <div className="booking-success-details">
          <h2>{state.title}</h2>

          <p>رقم الحجز: {state.id}</p>
          <p>رمز الحجز: {state.booking_code}</p>

          <div
            className="booking-qr"
            style={{
              backgroundColor: "#ffffff",
              padding: "16px",
              width: "fit-content",
              margin: "20px auto",
            }}
          >
            <QRCode
              id="booking-qr"
              value={state.booking_code}
              size={200}
              level="H"
              title={`رمز حجز ${state.booking_code}`}
            />
          </div>

          <p>امسحي الرمز للتحقق من رمز حجزك.</p>
        </div>

        <button
          type="button"
          className="booking-success-btn"
          onClick={downloadQR}
        >
          تنزيل الباركود
        </button>

        <button
          type="button"
          className="booking-success-btn"
          onClick={() => navigate("/")}
        >
          العودة إلى الرئيسية
        </button>
      </div>
    </main>
  );
}

export default BookingTicket;

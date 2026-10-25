
import {
  Medal,
  Landmark,
  Wheat,
  Stethoscope,
  Monitor,
  ChartNoAxesCombined,
} from "lucide-react";

function EventTypes() {
  return (
    <section className="event-types">
      <h2>مجالات الفعاليات والمؤتمرات</h2>

      <div className="event-types-container">
        <div className="event-type-card">
          <Medal className="event-type-icon" />
          <h3> الرياضية</h3>
        </div>

        <div className="event-type-card">
          <Landmark className="event-type-icon" />
          <h3> الثقافية</h3>
        </div>

        <div className="event-type-card">
          <Wheat className="event-type-icon" />
          <h3> الزراعية</h3>
        </div>

        <div className="event-type-card">
          <Monitor className="event-type-icon" />
          <h3> التقنية</h3>
        </div>

        <div className="event-type-card">
          <Stethoscope className="event-type-icon" />
          <h3> الصحية</h3>
        </div>

        <div className="event-type-card">
          <ChartNoAxesCombined className="event-type-icon" />
          <h3> ريادة الأعمال</h3>
        </div>
      </div>
    </section>
  );
}

export default EventTypes;

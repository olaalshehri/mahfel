import { Link } from "react-router-dom";

function EventTypes() {
  return (
    <section className="event-types">
      <h2>أنواع الفعاليات</h2>

      <div className="event-types-container">

        <Link to="/events?type=sports" 
         className="event-type-card">
          <span className="event-type-icon">🏆</span>
          <h3>الفعاليات الرياضية</h3>
        </Link>

        <Link to="/events?type=education" 
         className="event-type-card">
          <span className="event-type-icon">🎓</span>
          <h3>الفعاليات التعليمية</h3>
        </Link>

        <Link to="/conferences?type=technology" 
         className="event-type-card">
          <span className="event-type-icon">💻</span>
          <h3>مؤتمر التقنية</h3>
        </Link>

        <Link to="/conferences?type=business" 
         className="event-type-card">
          <span className="event-type-icon">🤝</span>
          <h3>ملتقى رجال الأعمال</h3>
        </Link>

      </div>
    </section>
  );
}

export default EventTypes;

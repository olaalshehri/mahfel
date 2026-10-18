import { NavLink } from "react-router-dom";
import { formatDate } from "../utils/formatdata";

const images = import.meta.glob("../assets/images/*", {
  eager: true,
  query: "?url",
  import: "default",
});

function EventCard({ event, showDescription }) {
  const isConference = event.category === "conference";

  //console.log("تاريخ الفعالية:", event.date);

  const detailsPath = isConference
    ? `/conferences/${event.slug}`
    : `/events/${event.slug}`;

  const imageName = event.image.split("/").pop();
  const imagePath = images[`../assets/images/${imageName}`] || event.image;

  return (
    <div className="event-card">
      <img src={imagePath} alt={event.title} className="event-card-image" />

      <div className="event-card-content">
        <h3>{event.title}</h3>

        <p>{formatDate(event.date)}</p>
        <p>{event.city}</p>
        {showDescription && (
          <p className="event-description">{event.description}</p>
        )}

        <NavLink to={detailsPath} className="event-card-btn">
          عرض التفاصيل
        </NavLink>
      </div>
    </div>
  );
}

export default EventCard;

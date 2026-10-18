import { useSearchParams } from "react-router-dom";
import { events } from "../data/events";
import { conferences } from "../data/conferences";
import EventCard from "../components/EventCard";

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const normalizeSearchPhrase = (text) => {
    return text
      .replace(/أ|إ|آ|ا/g, "ا")
      .replace(/ي|ى/g, "ي")
      .toLowerCase()
      .trim();
  };

  const allItems = [...events, ...conferences];
  const normalizedQuery = normalizeSearchPhrase(query);

  const results = allItems.filter((item) =>
    normalizeSearchPhrase(item.title).includes(normalizedQuery),
  );

  return (
    <>
      <section className="search-page">
        <h2>نتائج البحث "{query}"</h2>

        {results.length > 0 ? (
          <div className="events-container">
            {results.map((item) => (
              <EventCard key={item.id} event={item} />
            ))}
          </div>
        ) : (
          <p>لم نجد نتائج مطابقة لبحثك.</p>
        )}
      </section>
    </>
  );
}

export default Search;

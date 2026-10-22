import { useSearchParams } from "react-router-dom";
import EventCard from "../components/EventCard";
import { useEffect, useState } from "react";
import { getEvents, getConferences } from "../services/api";

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);

        const [eventsData, conferencesData] = await Promise.all([
          getEvents(),
          getConferences(),
        ]);

        setAllItems([...eventsData, ...conferencesData]);
      } catch (err) {
        console.error("Error fetching search data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const normalizeSearchPhrase = (text) => {
    return text
      .replace(/أ|إ|آ|ا/g, "ا")
      .replace(/ي|ى/g, "ي")
      .toLowerCase()
      .trim();
  };

  const normalizedQuery = normalizeSearchPhrase(query);

  const results = allItems.filter((item) =>
    normalizeSearchPhrase(item.title).includes(normalizedQuery),
  );

  return (
    <>
      <section className="search-page">
        <h2>نتائج البحث "{query}"</h2>

        {loading ? (
          <p>جاري تحميل البيانات...</p>
        ) : error ? (
          <p>حدث خطأ أثناء جلب البيانات. يرجى المحاولة مرة أخرى.</p>
        ) : results.length > 0 ? (
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

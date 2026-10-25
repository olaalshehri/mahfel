import ConferenceVideo from "../assets/images/video22.mp4";
import EventCard from "../components/EventCard";
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { getConferences } from "../services/api";

function Conferences() {
  const [conferences, setConferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const conference = conferences.find(
      (item) => item.slug === "cyber-security",
    );

    if (!conference?.date) return;

    const updateTimer = () => {
      const target = new Date(
        `${conference.date.slice(0, 10)}T00:00:00+03:00`,
      ).getTime();

      const diff = target - Date.now();

      if (diff <= 0) {
        setTimeLeft(null);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    updateTimer();

    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [conferences]);

  useEffect(() => {
    async function loadConferences() {
      try {
        const data = await getConferences();
        setConferences(data);
      } catch (error) {
        setError("تعذّر تحميل المؤتمرات. حاولي مرة أخرى.");
        console.error("خطأ في تحميل المؤتمرات:", error);
      } finally {
        setLoading(false);
      }
    }

    loadConferences();
  }, []);

  const keywords = [
    "ابتكار",
    "تقنية",
    "معرفة",
    "مستقبل",
    "ريادة",
    "تأثير",
    "إلهام",
  ];

  const speakers = [
    {
      id: 1,
      name: "أحمد الخويطر",
      category: "تقنية",
      bio: "قيادي في أرامكو متخصص في التقنية والابتكار والتحول الرقمي.",
    },
    {
      id: 2,
      name: "أضواء العريفي",
      category: "رياضة",
      bio: "قيادية سعودية ساهمت في تطوير الرياضة وتعزيز مشاركة المرأة في القطاع الرياضي.",
    },
    {
      id: 3,
      name: "منى أبو سليمان",
      category: "ريادة الأعمال",
      bio: "قيادية وإعلامية سعودية تهتم بريادة الأعمال والتنمية المجتمعية.",
    },
    {
      id: 4,
      name: "د. وليد فتيحي",
      category: "صحة",
      bio: "طبيب ورائد في قطاع الرعاية الصحية، يهتم بالتوعية الصحية وتعزيز جودة الحياة.",
    },
    {
      id: 5,
      name: "د. نبيل كوشك",
      category: "تعليم",
      bio: "قيادي أكاديمي سعودي مهتم بالتعليم وريادة الأعمال.",
    },
    {
      id: 6,
      name: "ريانة برناوي",
      category: "تقنية وفضاء",
      bio: "رائدة فضاء سعودية وباحثة في العلوم الطبية الحيوية، شاركت في أبحاث علمية على متن محطة الفضاء الدولية.",
    },
  ];
  const speakersRef = useRef(null);

  const scrollSpeakers = (amount) => {
    speakersRef.current.scrollBy({
      left: amount,
      behavior: "smooth",
    });
  };

  return (
    <>
      <section className="conferences-hero">
        <div className="conference-video">
          <video autoPlay muted loop playsInline>
            <source src={ConferenceVideo} type="video/mp4" />
          </video>
        </div>

        <div className="conferences-hero-title">
          <h4>قريبًا | مؤتمر الأمن السيبراني</h4>
          <h1>مستقبل رقمي أكثر أمانًا</h1>
          <p>حيث تلتقي العقول والخبرات لصناعة مستقبل رقمي آمن.</p>

          {timeLeft && (
            <div className="conference-countdown">
              <p>الوقت المتبقي لانطلاق المؤتمر</p>

              <div className="countdown-boxes">
                {[
                  { value: timeLeft.days, label: "يوم" },
                  { value: timeLeft.hours, label: "ساعة" },
                  { value: timeLeft.minutes, label: "دقيقة" },
                  { value: timeLeft.seconds, label: "ثانية" },
                ].map((item) => (
                  <div className="countdown-box" key={item.label}>
                    <strong>{String(item.value).padStart(2, "0")}</strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="scroll-container">
          <div className="infinite-scroll">
            <div className="text-scroll">
              {keywords.map((keyword, index) => (
                <span className="text-item" key={index}>
                  {keyword}
                  <span className="star">★</span>
                </span>
              ))}
            </div>

            <div className="text-scroll" aria-hidden="true">
              {keywords.map((keyword, index) => (
                <span className="text-item" key={index}>
                  {keyword}
                  <span className="star">★</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Conferences */}
      <section className="home-events">
        <h2>المؤتمرات القادمة</h2>

        {loading ? (
          <div className="no-results">
            <p>جاري تحميل المؤتمرات...</p>
          </div>
        ) : error ? (
          <div className="no-results">
            <h3>{error}</h3>
          </div>
        ) : conferences.length === 0 ? (
          <div className="no-results">
            <h3>لا توجد مؤتمرات حاليًا</h3>
            <p>ترقب مؤتمراتنا القادمة.</p>
          </div>
        ) : (
          <div className="events-container">
            {conferences.map((conference) => (
              <EventCard
                key={conference.id}
                event={{ ...conference, category: "conference" }}
                showDescription
              />
            ))}
          </div>
        )}
      </section>

      <section className="speakers-section">
        <h2>متحدثون المؤتمرات </h2>

        <div className="speakers-slider">
          <button className="speaker-arrow" onClick={() => scrollSpeakers(300)}>
            →
          </button>

          <div className="speakers-cards" ref={speakersRef}>
            {speakers.map((speaker) => (
              <article className="speaker-card" key={speaker.id}>
                <div className="speaker-info">
                  <span className="speaker-category">{speaker.category}</span>
                  <h3>{speaker.name}</h3>
                  <p>{speaker.bio}</p>

                  <div className="speaker-socials">
                    <a href="#" aria-label="LinkedIn">
                      <FaLinkedinIn />
                    </a>

                    <a href="#" aria-label="X">
                      <FaXTwitter />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <button
            className="speaker-arrow"
            onClick={() => scrollSpeakers(-300)}
          >
            ←
          </button>
        </div>
      </section>
      <section className="">
        <div></div>
        <div></div>
        <div></div>
      </section>
    </>
  );
}

export default Conferences;

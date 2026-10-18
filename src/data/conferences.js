import cybersecurity from "../assets/images/cybersecurity.jpg";
import technology from "../assets/images/technology.jpg";
import health from "../assets/images/health.png";
import environment from "../assets/images/environment.png";

export const conferences = [
  {
    id: 1,
    slug: "cyber-security",
    title: "مؤتمر الأمن السيبراني",
    description:
      "يجمع المتخصصين والخبراء لمناقشة أحدث تقنيات الأمن السيبراني وحماية المعلومات ومواجهة التهديدات الرقمية.",
    date: "11-01-2027",
    time: "9:00 صباحًا - 5:00 مساءً",
    city: "الرياض",
    venue: "مركز الملك عبدالله المالي",
    image: cybersecurity,
    category: "conference",
    type: "technology",
    organizer: "",
    price: 0,
  },

  {
    id: 2,
    slug: "tech",
    title: "مؤتمر التقنية والابتكار",
    description:
      "يستعرض أحدث الحلول التقنية والابتكارات، ويجمع المهتمين بالتقنية لتبادل الخبرات والأفكار.",
    date: "10-11-2027",
    time: "9:00 صباحًا - 5:00 مساءً",
    city: "جدة",
    venue: "مركز جدة للمنتديات والفعاليات",
    image: technology,
    category: "conference",
    type: "innovation",
    organizer: "",
    price: 0,
  },

  {
    id: 3,
    slug: "health",
    title: "لقاء الصحة والرعاية الصحية",
    description:
      "لقاء يجمع المختصين والمهتمين في مجال الصحة والرعاية الصحية لمناقشة أحدث التطورات وتبادل الخبرات والأفكار.",
    date: "13-12-2027",
    time: "10:00 صباحًا - 4:00 مساءً",
    city: "الظهران",
    venue: "معرض الظهران الدولي",
    image: health,
    category: "conference",
    type: "health",
    organizer: "",
    price: 0,
  },

  {
    id: 4,
    slug: "environment",
    title: "معرض البيئة والاستدامة",
    description:
      "يستعرض المبادرات والحلول المبتكرة في مجال البيئة والاستدامة، مع التعريف بأحدث التقنيات والممارسات البيئية.",
    date: "3-02-2028",
    time: "10:00 صباحًا - 6:00 مساءً",
    city: "الرياض",
    venue: "مركز الرياض الدولي للمؤتمرات والمعارض",
    image: environment,
    category: "conference",
    type: "environment",
    organizer: "",
    price: 0,
  },
];

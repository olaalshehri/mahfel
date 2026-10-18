import taifRose from "../assets/images/taif-rose.jpg";
import saudiNationalDay from "../assets/images/saudi-national-day.jpg";
import ithraWorkshop from "../assets/images/ithra-Workshop.jpg";
import alulaSkiesFestival from "../assets/images/alulaSkiesFestival.jpg";

//sports /cultural/ education / arts / health / technology / business/organizer:
export const events = [
  {
    id: 1,
    slug:"rose-festival",
    title: "مهرجان الورد الطائفي",
    description:
      "فعالية ثقافية وترفيهية تحتفي بالورد الطائفي، وتقدم أنشطة متنوعة وتجارب تفاعلية للتعرف على تراث مدينة الطائف ومنتجاتها المحلية.",
    date: "12-10-2027",
    time: "4:00 مساءً - 10:00 مساءً",
    city: "الطائف",
    venue: "منتزه الردف",
    image: taifRose,
    category: "event",
    type: "cultural",
    organizer: "" ,
    price: 50,
  },
  {
    id: 2,
    slug:"national-day",
    title: "اليوم الوطني السعودي",
    description:
      "احتفالات وطنية تتضمن فعاليات ثقافية وترفيهية للاحتفاء باليوم الوطني السعودي.",
    date: "23-09-2027",
    time: "",
    city: "الرياض",
    venue: "الدرعية",
    image: saudiNationalDay,
    category: "event",
    type: "cultural",
    organizer: "هيئة تطوير بوابة الدرعية",
    price: 0,
  },
  {
    id: 3,
    slug:"ithra-workshop",
    title: "ورشة الإبداع والتصميم في إثراء",
    description:
      "ورشة تعليمية تفاعلية تهدف إلى تطوير مهارات الإبداع والتصميم من خلال أنشطة عملية وتجارب ملهمة.",
    date: "07-8-2028",
    time: "10:00 صباحًا - 12:00 مساءً",
    city: "الظهران",
    venue: "مركز الملك عبدالعزيز الثقافي العالمي (إثراء)",
    image: ithraWorkshop,
    category: "event",
    type: "education",
    organizer: "مركز الملك عبدالعزيز الثقافي العالمي (إثراء)",
    price: 120,
  },
  {
    id: 4,
    slug:"alula-skies",
    title: "مهرجان سماء العلا",
    description:
      "مهرجان مميز في سماء العلا يجمع بين التجارب والفعاليات المتنوعة وسط المناظر الطبيعية الخلابة لمحافظة العلا.",
    date: "06-11-2028",
    time: "",
    city: "العلا",
    venue: "العلا",
    image: alulaSkiesFestival,
    category: "event",
    type: "cultural",
    organizer: "الهيئة الملكية لمحافظة العلا",
    price: 200,
  },
];

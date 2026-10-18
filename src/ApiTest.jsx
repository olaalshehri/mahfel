
import { useEffect } from "react";
import { getEvents, getConferences } from "./services/api";

function ApiTest() {
  useEffect(() => {
    async function testAPI() {
      try {
        const events = await getEvents();
        const conferences = await getConferences();

        console.log("الفعاليات:", events);
        console.log("صورة أول فعالية:", events[0]?.image);
        console.log("المؤتمرات:", conferences);
      } catch (error) {
        console.error("خطأ في الاتصال:", error);
      }
      
    }

    testAPI();
  }, []);

  return <p>اختبار الاتصال بقاعدة بيانات محفل</p>;
}

export default ApiTest;

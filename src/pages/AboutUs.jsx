import { NavLink } from "react-router-dom";

function AboutUs() {
  return (
    <section className="section-about">

      <div className="about-intro">
        <h2>أكثر من منصة للفعاليات</h2>

        <p>
          حيث تلتقي الفعاليات بالأفكار، وتبدأ من هنا تجارب تستحق الاكتشاف.
        </p>
      </div>


      <div className="about-story">
        <h2>لماذا اخترنا اسم محفل؟</h2>

        <p>
          كلمة <strong>«محفل»</strong> تحمل معنى الاجتماع واللقاء حول مناسبة
          أو حدث يجمع الناس باهتمام واحد.
        </p>

        <p>
          ومن هنا جاء <strong>محفل</strong>؛ منصة صُممت لتجمع الفعاليات
          والمؤتمرات في مكان واحد، وتقرّبك من التجارب التي تهمك، بدءًا من
          اكتشافها والتعرّف على تفاصيلها، وصولًا إلى حجزها بسهولة.
        </p>
      </div>


      <div className="about-vision">
        <h2>رؤيتنا</h2>

        <p>
          نطمح إلى تطوير محفل ليكون وجهة موثوقة تجمع الفعاليات والمؤتمرات في
          مختلف مدن المملكة العربية السعودية، وتمنح المستخدم تجربة واضحة وسهلة
          تبدأ من اكتشاف الفعالية والتعرّف على تفاصيلها، وصولًا إلى حجزها،
          لنكون جزءًا من مستقبل قطاع الفعاليات والمؤتمرات في المملكة ونسهم في
          جعل الوصول إليها أكثر سهولة وتنظيمًا.
        </p>
      </div>


      <div className="about-services">
        <h2>ماذا يقدم محفل؟</h2>

        <div className="about-cards">

          <div className="about-card">
            <span className="about-number">1</span>

            <h3>اكتشف</h3>

            <p>
              تصفح مجموعة متنوعة من الفعاليات والمؤتمرات واكتشف ما يناسب
              اهتماماتك.
            </p>
          </div>


          <div className="about-card">
            <span className="about-number">2</span>

            <h3>تعرّف</h3>

            <p>
              اطّلع على تفاصيل كل فعالية، من الموعد والموقع إلى أبرز ما
              يميزها.
            </p>
          </div>


          <div className="about-card">
            <span className="about-number">3</span>

            <h3>احجز</h3>

            <p>
              انتقل من الاكتشاف إلى الحجز بسهولة، واستعد لفعاليتك القادمة.
            </p>
          </div>

        </div>
      </div>


      <div className="about-cta">
        <h2>
          خطوتك الأولى نحو تجربة جديدة تبدأ من هنا
        </h2>

        <div className="about-actions">
          <NavLink to="/events" 
          className="btn btn-primary">
            اكتشف الفعاليات
          </NavLink>

          <NavLink
            to="/conferences"
            className="btn btn-secondary">
            اكتشف المؤتمرات
          </NavLink>
        </div>
      </div>

    </section>
  );
}

export default AboutUs;

import { NavLink } from "react-router-dom";
import {
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
  FaFacebookF,
} from "react-icons/fa6";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-grid">

        <div className="footer-about">
          <h3 className="footer-title">محفل</h3>
          <p>
            منصتك لاكتشاف الفعاليات والمؤتمرات وتجارب مميزة
            في مكان واحد.
          </p>
        </div>

        <div className="footer-links">
          <h3 className="footer-title">روابط الموقع</h3>

          <NavLink to="/home">الرئيسية</NavLink>
          <NavLink to="/events">الفعاليات</NavLink>
          <NavLink to="/conferences">المؤتمرات</NavLink>
          <NavLink to="/contact">تواصل معنا</NavLink>
        </div>

        <div className="footer-links">
          <h3 className="footer-title">الدعم</h3>

          <NavLink>الأسئلة الشائعة</NavLink>
          <NavLink >سياسة الخصوصية</NavLink>
          <NavLink >الشروط والأحكام</NavLink>
        </div>

        <div className="footer-social">

          <h3 className="footer-title">تابعنا</h3>

          <div className="social-icons">
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>

            <a href="#" aria-label="X">
              <FaXTwitter />
            </a>

            <a href="#" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>

            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>
          </div>

        </div>

      </div>

      <div className="footer-copyright">
        <p>© 2026 محفل. جميع الحقوق محفوظة.</p>
      </div>

    </footer>
  );
}

export default Footer;
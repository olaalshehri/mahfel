import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { logoutUser } from "../services/api";

function Navbar() {
  const [navmenuOpen, setNavMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const closeMenu = () => {
    setNavMenuOpen(false);
    setDropdownOpen(false);
  };

  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  useEffect(() => {
    function updateUser() {
      const savedUser = sessionStorage.getItem("user");
      setUser(savedUser ? JSON.parse(savedUser) : null);
    }

    window.addEventListener("userUpdated", updateUser);

    return () => {
      window.removeEventListener("userUpdated", updateUser);
    };
  }, []);

  async function handleLogout() {
    try {
      await logoutUser();

      sessionStorage.removeItem("user");
      setUser(null);
      closeMenu();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      alert("تعذّر تسجيل الخروج، حاولي مرة أخرى");
    }
  }

  return (
    <nav className="nav-section">
      <NavLink to="/" onClick={closeMenu}>
        <img className="nav-logo" src="/logo.svg" alt="Logo Mahfel" />
      </NavLink>

      <button
        className="nav-menu-btn"
        type="button"
        aria-label={navmenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
        aria-expanded={navmenuOpen}
        aria-controls="nav-mobile-content"
        onClick={() => setNavMenuOpen(!navmenuOpen)}
      >
        {navmenuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      <div
        id="nav-mobile-content"
        className={`nav-content ${navmenuOpen ? "nav-open" : ""}`}
      >
        <div className="nav-links">
          <NavLink to="/" onClick={closeMenu}>
            الرئيسية
          </NavLink>
          <NavLink to="/events" onClick={closeMenu}>
            الفعاليات
          </NavLink>
          <NavLink to="/conferences" onClick={closeMenu}>
            المؤتمرات
          </NavLink>
          {user && (
            <NavLink to="/mybookings" onClick={closeMenu}>
              حجوزاتي
            </NavLink>
          )}
          <div
            className={`nav-dropdown ${dropdownOpen ? "dropdown-open" : ""}`}
          >
            <button
              type="button"
              aria-expanded={dropdownOpen}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              من نحن
              <span className="dropdown-arrow">⌄</span>
            </button>

            <div className="dropdown-menu">
              <NavLink to="/aboutus" onClick={closeMenu}>
                عن محفل
              </NavLink>
              <NavLink to="/contact" onClick={closeMenu}>
                تواصل معنا
              </NavLink>
            </div>
          </div>
        </div>

        <div className="nav-actions">
          {user ? (
            <>
              <span className="nav-user-name">
                مرحبًا بك، {user.first_name}
              </span>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleLogout}
              >
                تسجيل الخروج
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="nav-btn-login"
                onClick={closeMenu}
              >
                تسجيل الدخول
              </NavLink>

              <NavLink
                to="/signup"
                className="nav-btn-signup"
                onClick={closeMenu}
              >
                إنشاء حساب
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;

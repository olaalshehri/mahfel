import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import LoginImage from "../assets/images/E-flowers-Login.jpg";
import { Eye, EyeOff } from "lucide-react";
import { loginUser } from "../services/api";

function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPasspword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  function validate() {
    const nextErrors = {};

    if (!email) {
      nextErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      nextErrors.email = "أدخل بريدًا إلكترونيًا صحيحًا";
    }

    if (!password) {
      nextErrors.password = "كلمة المرور مطلوبة";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}/.test(password)) {
      nextErrors.password =
        "كلمة المرور يجب أن تحتوي على حرف كبير وحرف صغير ورقم";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
   }

   
async function handleSubmit(e) {
  e.preventDefault();

  if (!validate()) return;

  try {
    const data = await loginUser({
      email: email.trim(),
      password,
    });

    sessionStorage.setItem("user", JSON.stringify(data.user));

    window.dispatchEvent(new Event("userUpdated"));

    const from = location.state?.from || "/";
    navigate(from, { replace: true });
  } catch (error) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: error.message,
    }));
  }
}


  
  return (
    <div className="login-page">
      <div className="account-image">
        <img src={LoginImage} alt="فعالية محفل -ورد" />
      </div>

      <div className="account-form">
        <h1>تسجيل الدخول</h1>

        <p>مرحبًا بعودتك إلى محفل</p>

        <form onSubmit={handleSubmit}>
          <label>
            البريد الإلكتروني
            <input
              type="email"
              value={email}
              placeholder="أدخل بريدك الإلكتروني"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <span className="field-error">{errors.email}</span>
            )}
          </label>

          <label>
            كلمة المرور
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="أدخل كلمة المرور"
                onChange={(e) => setPasspword(e.target.value)}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"
                }
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <span className="field-error">{errors.password}</span>
            )}
          </label>

          <button type="submit" className="btn-login">
            تسجيل الدخول
          </button>
        </form>

        <div className="account-divider">أو</div>

        <button type="button" className="btn-google">
          تسجيل الدخول باستخدام Google
        </button>

        <p className="account-switch">
          ليس لديك حساب؟
          <NavLink to="/signup" state={location.state}>
            إنشاء حساب
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;

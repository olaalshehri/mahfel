import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import SignupImage from "../assets/images/C-AI-Signup.jpg";
import { Eye, EyeOff } from "lucide-react";
import { registerUser, loginUser } from "../services/api";

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  function validate() {
    const nextErrors = {};

    if (!firstName) {
      nextErrors.firstName = "الاسم الأول مطلوب";
    }

    if (!lastName) {
      nextErrors.lastName = "اسم العائلة مطلوب";
    }

    if (!phone) {
      nextErrors.phone = "رقم الجوال مطلوب";
    }

    if (!email) {
      nextErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      nextErrors.email = "أدخل بريدًا إلكترونيًا صحيحًا";
    }

    if (!password) {
      nextErrors.password = "كلمة المرور مطلوبة";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}/.test(password)) {
      nextErrors.password = "كلمة المرور غير مستوفية للشروط";
    }
    if (!confirmPassword) {
      nextErrors.confirmPassword = "تأكيد كلمة المرور مطلوب";
    } else if (confirmPassword !== password) {
      nextErrors.confirmPassword = "كلمتا المرور غير متطابقتين";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    try {
      await registerUser({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
      });

      const data = await loginUser({
        email: email.trim(),
        password,
      });

      sessionStorage.setItem("user", JSON.stringify(data.user));

      window.dispatchEvent(new Event("userUpdated"));

      navigate("/", { replace: true });
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: error.message || "تعذّر إنشاء الحساب، حاولي مرة أخرى.",
      }));
    }
  }

  return (
    <div className="signup-page">
      <div className="account-image">
        <img src={SignupImage} alt="مؤتمر محفل-الذكاء الاصطناعي" />
      </div>

      <div className="account-form">
        <h1>إنشاء حساب</h1>

        <p>أنشئ حسابك وابدأ باكتشاف الفعاليات</p>

        <form onSubmit={handleSubmit}>
          <div className="name-fields">
            <div>
              <label>
                الاسم الأول
                <input
                  type="text"
                  name="firstName"
                  autoComplete="given-name"
                  value={firstName}
                  placeholder="الاسم الأول"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && (
                  <span className="field-error">{errors.firstName}</span>
                )}
              </label>
            </div>

            <div>
              <label>
                اسم العائلة
                <input
                  type="text"
                  name="lastName"
                  autoComplete="family-name"
                  placeholder="اسم العائلة"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && (
                  <span className="field-error">{errors.lastName}</span>
                )}
              </label>
            </div>
          </div>

          <label>
            البريد الإلكتروني
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              placeholder="أدخل بريدك الإلكتروني"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <span className="field-error">{errors.email}</span>
            )}
          </label>

          <label>
            رقم الجوال
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              value={phone}
              placeholder="05xxxxxxxx"
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && (
              <span className="field-error">{errors.phone}</span>
            )}
          </label>

          <label>
            كلمة المرور
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="new-password"
                value={password}
                placeholder="أدخل كلمة المرور"
                onChange={(e) => setPassword(e.target.value)}
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
            <span className="password-hint">
              يجب أن تحتوي على حرف كبير وحرف صغير ورقم، وأن تكون 8 أحرف على
              الأقل.
            </span>
            {errors.password && (
              <span className="field-error">{errors.password}</span>
            )}
          </label>

          <label>
            تأكيد كلمة المرور
            <div className="password-field">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                autoComplete="new-password"
                value={confirmPassword}
                placeholder="أعد إدخال كلمة المرور"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={
                  showConfirmPassword
                    ? "إخفاء كلمة المرور"
                    : "إظهار كلمة المرور"
                }
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="field-error">{errors.confirmPassword}</span>
            )}
          </label>

          <button type="submit" className="btn-signup">
            إنشاء حساب
          </button>
        </form>

        <div className="account-divider">أو</div>

        <button type="button" className="btn-google">
          التسجيل باستخدام Google
        </button>

        <p className="account-switch">
          لديك حساب بالفعل؟
          <NavLink to="/login" state={location.state}>
            تسجيل الدخول
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Signup;

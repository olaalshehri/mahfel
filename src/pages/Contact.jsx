import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
  const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

    console.log(formData);
  };

  return (
    <section className="contact-page">
      <div className="contact-card">
        <div className="contact-intro">
          <h1>تواصل معنا</h1>
          <p>نسعد بتواصلك معنا، ويسعدنا استقبال استفساراتك وملاحظاتك.</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            الاسم
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="أدخل اسمك"
              required
            />
          </label>

          <label>
            البريد الإلكتروني
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="أدخل البريد الإلكتروني"
              required
            />
          </label>

          <label>
            الموضوع
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="موضوع الرسالة"
              required
            />
          </label>

          <label>
            الرسالة
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="اكتب رسالتك هنا"
              rows="5"
              required
            />
          </label>

          <button type="submit" className="btn btn-primary">
            إرسال الرسالة
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;

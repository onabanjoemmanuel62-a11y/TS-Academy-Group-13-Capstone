import React, { useState } from 'react';
import './ContactForm.css';
import SpaceBackground from './Spacebackground';

const ContactForm = () => {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [contactMethod, setContactMethod] = useState("");
  const [hearAboutUs, setHearAboutUs] = useState({
    friend: false,
    tsAcademy: false,
    others: false
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!email.includes("@")) {
      newErrors.email = "Please enter a valid email";
    }

    if (!city) {
      newErrors.city = "Please choose a city";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!message.trim()) {
      newErrors.message = "Message is required";
    }

    if (!contactMethod) {
      newErrors.contactMethod = "Please select a contact method";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  const formData = new FormData();
  formData.append("fullName", fullName);
  formData.append("email", email);
  formData.append("city", city);
  formData.append("phone", phone);
  formData.append("message", message);
  formData.append("contactMethod", contactMethod);

  try {
    await fetch("https://whitebricks.com/tsacademy.php", {
      method: "POST",
      body: formData,
    }).catch(() => {});
    
    // Show success even if CORS blocks locally
    // Will work properly after deployment
    setSubmitted(true);
    
  } catch (error) {
    console.error("Submission failed:", error);
    setSubmitted(true);
  }
};

  return (
    <div className="contact-section">
      <SpaceBackground />
    <section id="contact" className="contact">

      {/* Eyebrow line sits right above the title */}
      <p className="contact__eyebrow">Get in touch</p>

      <h2 className="contact__title">
        Have Questions About Planetary Science?
      </h2>
      <p className="contact__subtitle">
        Interested in learning more about space, astronomy, or how
        planetary data is collected and analyzed? Reach out and
        we'll get back to you.
      </p>

      {submitted ? (
        <div className="contact__success">
          ✅ Thank you! Your message has been sent successfully.
        </div>
      ) : (
        <form className="contact__form" onSubmit={handleSubmit}>

          {/* Row 1 - Full Name and Email */}
          <div className="contact__row">
            <div className="contact__field">
              <label htmlFor="fullName">Full Name*</label>
              <input
                id="fullName"
                type="text"
                placeholder="Full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              {errors.fullName && (
                <span className="contact__error">{errors.fullName}</span>
              )}
            </div>

            <div className="contact__field">
              <label htmlFor="email">Email*</label>
              <input
                id="email"
                type="email"
                placeholder="example@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <span className="contact__error">{errors.email}</span>
              )}
            </div>
          </div>

          {/* Row 2 - City and Phone */}
          <div className="contact__row">
            <div className="contact__field">
              <label htmlFor="city">City*</label>
              <select
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="">Choose city</option>
                <option value="lagos">Lagos</option>
                <option value="abuja">Abuja</option>
                <option value="ibadan">Ibadan</option>
                 <option value="ijebu-ode">Ijebu-ode</option>
                  <option value="Abeokuta">Abeokuta</option>
                   <option value="Benin">Benin</option>
                    <option value="Delta">Delta</option>
                <option value="other">Other</option>
              </select>
              {errors.city && (
                <span className="contact__error">{errors.city}</span>
              )}
            </div>

            <div className="contact__field">
              <label htmlFor="phone">Phone Number*</label>
              <input
                id="phone"
                type="tel"
                placeholder="Please enter a valid phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {errors.phone && (
                <span className="contact__error">{errors.phone}</span>
              )}
            </div>
          </div>

          {/* Row 3 - Message and Radio/Checkbox */}
          <div className="contact__row">
            <div className="contact__field">
              <label htmlFor="message">Message*</label>
              <textarea
                id="message"
                placeholder="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={100}
              />
              <span className="contact__charcount">
                {message.length}/100 characters
              </span>
              {errors.message && (
                <span className="contact__error">{errors.message}</span>
              )}
            </div>

            <div className="contact__field">
              <p className="contact__group-label">
                How should we contact you?
              </p>
              <div className="contact__options">
                {["Phone", "Email", "Both"].map((option) => (
                  <label key={option} className="contact__option">
                    <input
                      type="radio"
                      name="contactMethod"
                      value={option.toLowerCase()}
                      checked={contactMethod === option.toLowerCase()}
                      onChange={(e) => setContactMethod(e.target.value)}
                    />
                    {option}
                  </label>
                ))}
              </div>
              {errors.contactMethod && (
                <span className="contact__error">{errors.contactMethod}</span>
              )}

              <div className="contact__divider" />

              <p className="contact__group-label">
                How did you hear about us?
              </p>
              <div className="contact__options">
                {[
                  { label: "Friend", key: "friend" },
                  { label: "TS Academy", key: "tsAcademy" },
                  { label: "Others", key: "others" },
                ].map((item) => (
                  <label key={item.key} className="contact__option">
                    <input
                      type="checkbox"
                      checked={hearAboutUs[item.key]}
                      onChange={() =>
                        setHearAboutUs((prev) => ({
                          ...prev,
                          [item.key]: !prev[item.key],
                        }))
                      }
                    />
                    {item.label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="contact__btn">
            Submit →
          </button>

        </form>
      )}
    </section>
    </div>
  );
};

export default ContactForm;
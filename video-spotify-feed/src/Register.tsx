import { useState } from "react";

type FormState = {
  username: string;
  email: string;
  password: string;
};

export default function Registrieren() {
  const [form, setForm] = useState<FormState>({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (!form.username.trim()) errs.username = "Benutzername ist erforderlich.";
    if (!form.email.trim()) errs.email = "E-Mail ist erforderlich.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Ungültige E-Mail-Adresse.";
    if (form.password.length < 6)
      errs.password = "Passwort muss mindestens 6 Zeichen haben.";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    console.log("Submitting form:", form);

    fetch("https://react-vid-app.vercel.app/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Registration successful:", data);
        alert("Registrierung erfolgreich!");
        setForm({ username: "", email: "", password: "" });
        setErrors({});
      })
      .catch((error) => {
        console.error("Registration error:", error);
        setErrors({ submit: `Fehler: ${error.message}` });
      });
  }

  return (
    <div className="register-container">
      <h2 className="register-title">Registrieren</h2>
      <form className="register-form" onSubmit={handleSubmit} noValidate>
        <div className="register-row">
          <label className="register-label">
            Benutzername
            <br />
            <input
              className="register-input"
              name="username"
              value={form.username}
              onChange={handleChange}
            />
          </label>
          {errors.username && (
            <div className="register-error">{errors.username}</div>
          )}
        </div>

        <div className="register-row">
          <label className="register-label">
            E-Mail
            <br />
            <input
              className="register-input"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
          </label>
          {errors.email && <div className="register-error">{errors.email}</div>}
        </div>

        <div className="register-row">
          <label className="register-label">
            Passwort
            <br />
            <input
              className="register-input"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
          </label>
          {errors.password && (
            <div className="register-error">{errors.password}</div>
          )}
        </div>

        <div className="register-actions">
          <button className="register-button" type="submit">
            Registrieren
          </button>
        </div>
        {errors.submit && <div className="register-error">{errors.submit}</div>}
      </form>
    </div>
  );
}

import React, { useState } from "react";

type Props = {
  onLogin?: (token: string) => void;
};

const Login: React.FC<Props> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !password) {
      setError("Passwort und Name dürfen nicht leer sein.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        "https://react-vid-app.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg =
          (data && (data.error || data.message)) ||
          `Login fehlgeschlagen (${res.status})`;
        throw new Error(msg);
      }

      const token = data?.token || data?.accessToken || null;
      if (!token) {
        throw new Error("Ungültige Server-Antwort: kein Token empfangen.");
      }

      try {
        localStorage.setItem("Token", token);
      } catch (e) {}
      if (onLogin) onLogin(token);
      window.location.href = "/";
    } catch (err: any) {
      setError(err?.message || "Login fehlgeschlagen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "2rem auto", padding: 20 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} aria-describedby="login-error">
        <div style={{ marginBottom: 12 }}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              display: "block",
              width: "100%",
              padding: 8,
              marginTop: 4,
            }}
            autoComplete="username"
            required
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              display: "block",
              width: "100%",
              padding: 8,
              marginTop: 4,
            }}
            autoComplete="current-password"
            required
          />
        </div>

        {error && (
          <div
            id="login-error"
            role="alert"
            style={{ color: "#b00020", marginBottom: 12 }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{ padding: "8px 16px" }}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
};

export default Login;

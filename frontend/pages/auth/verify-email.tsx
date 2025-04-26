import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function VerifyEmailPage() {
  const router = useRouter();
  const { token } = router.query;
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    if (typeof token === "string") {
      fetch("http://localhost:4000/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })
        .then((res) => res.json())
        .then((data) => setMessage(data.message || "Unknown response"))
        .catch(() => setMessage("Verification failed. Please try again later."));
    }
  }, [token]);

  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>
      <h1>Email Verification</h1>
      <p>{message}</p>
      {message === "Email successfully verified." && (
        <div style={{ marginTop: "2rem" }}>
          <p>Thank you! You can now <a href="https://vetoralia.com/login" style={{ color: '#0070f3', textDecoration: 'underline' }}>log in to Vetoralia</a>.</p>
        </div>
      )}
    </div>
  );
}

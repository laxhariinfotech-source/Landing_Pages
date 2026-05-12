import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.code}>404</h1>
        <h2 style={styles.title}>Page Not Found</h2>
        <p style={styles.message}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button style={styles.button} onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    backgroundColor: "#f9fafb",
  },
  card: {
    textAlign: "center",
    maxWidth: "480px",
    width: "100%",
  },
  code: {
    fontSize: "7rem",
    fontWeight: 800,
    lineHeight: 1,
    color: "#6366f1",
    marginBottom: "0.5rem",
  },
  title: {
    fontSize: "1.75rem",
    fontWeight: 700,
    color: "#111827",
    marginBottom: "0.75rem",
  },
  message: {
    fontSize: "1rem",
    color: "#6b7280",
    marginBottom: "2rem",
    lineHeight: 1.6,
  },
  button: {
    display: "inline-block",
    padding: "0.75rem 2rem",
    backgroundColor: "#6366f1",
    color: "#ffffff",
    fontSize: "1rem",
    fontWeight: 600,
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default NotFound;

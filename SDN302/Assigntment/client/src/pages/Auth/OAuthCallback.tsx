import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useAuth } from "../../hooks/useAuth";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { loginWithToken } = useAuth();
  const [error, setError] = useState<string>("");
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const handleCallback = async () => {
      const token = searchParams.get("token");
      const errorParam = searchParams.get("error");

      if (errorParam) {
        setError("Authentication failed. Please try again.");
        setTimeout(() => {
          navigate("/auth/login");
        }, 2000);
        return;
      }

      if (token) {
        try {
          await loginWithToken(token);
          navigate("/");
        } catch (err) {
          console.error("Login with token failed:", err);
          setError("Failed to authenticate. Please try again.");
          setTimeout(() => {
            navigate("/auth/login");
          }, 2000);
        }
      } else {
        setError("No token received.");
        setTimeout(() => {
          navigate("/auth/login");
        }, 2000);
      }
    };

    handleCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
      <div className="text-center">
        {error ? (
          <div>
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">{error}</h2>
            <p className="text-slate-600 dark:text-slate-400">
              Redirecting to login...
            </p>
          </div>
        ) : (
          <div>
            <div className="animate-spin text-6xl mb-4">🔄</div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Authenticating...
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Please wait while we log you in.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OAuthCallback;

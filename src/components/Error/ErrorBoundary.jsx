import React, { useEffect, useState } from "react";

function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (error, errorInfo) => {
      setHasError(true);
      console.error("Error caught by error boundary:", error, errorInfo);
    };

    window.addEventListener("error", handleError);

    return () => {
      window.removeEventListener("error", handleError);
    };
  }, []);

  if (hasError) {
    return <div>Something went wrong!</div>;
  } else {
    return children;
  }
}

export default ErrorBoundary;

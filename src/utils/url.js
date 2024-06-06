export const baseUrl =
  import.meta.env.VITE_REACT_APP_NODE_ENV === "development"
    ? "http://localhost:5000/api/v1"
    : "https://server.pnc-nikah.com/api/v1";

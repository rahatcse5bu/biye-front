import toast from "react-hot-toast";

const successToast = (message) => {
  return toast.success(message, {
    position: "bottom-right",
    duration: 3000,
    style: { backgroundColor: "green", color: "#fff" },
  });
};

const errorToast = (message) => {
  return toast.error(message, {
    position: "bottom-right",
    duration: 3000,
    style: { backgroundColor: "#FF0000", color: "#fff" },
  });
};

export const Toast = {
  successToast,
  errorToast,
};

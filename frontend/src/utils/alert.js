import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

export const showSuccess = (text) => Toast.fire({ icon: "success", title: text });
export const showError = (text) => Toast.fire({ icon: "error", title: text });
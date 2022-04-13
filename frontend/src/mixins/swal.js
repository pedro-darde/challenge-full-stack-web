import Swal from "sweetalert2";

export default {
  methods: {
    showErrorSwal(error) {
      Swal.mixin({
        toast: true,
        icon: "error",
        timer: 2500,
        confirmButtonText: "Vou corrigir!",
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      }).fire({ title: error });
    },
    success(title = "Sucesso") {
      Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      }).fire({ icon: "success", title: title });
    },
  },
};

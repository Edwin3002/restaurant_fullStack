import * as yup from "yup";

export const yupMenuCrud = yup.object({
  name: yup.string().min(5, "Mínimo 5 caracteres")
    .max(25, "Máximo 30 caracteres")
    .typeError("El campo debe ser alfanumérico")
    .required("Campo requerido"),
  description: yup.string().min(10, "Mínimo 10 caracteres")
    .max(200, "Máximo 200 caracteres")
    .typeError("El campo debe ser númerico").required("Campo requerido"),
  img: yup.string().required("Campo requerido"),
  price: yup.number()
    .positive("El campo debe ser positivo")
    .integer("El campo debe ser entero")
    .min(1000, "Mínimo el número 1000")
    .typeError("El campo debe ser númerico")
    .required("Campo requerido"),
  category: yup.string().min(5, "Mínimo 5 caracteres")
    .max(25, "Máximo 25 caracteres")
    .typeError("El campo debe ser alfanumérico")
    .required("Campo requerido"),
})

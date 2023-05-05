import * as yup from "yup";

export const yupConfirmCart = yup.object({
  nameCustomer: yup.string().min(5,"Mínimo 5 caracteres").max(30,"Máximo 30 caracteres").typeError("El campo debe ser alfanumérico").required("Campo requerido"),
  tableOrder: yup.number().min(1,"Mínimo el número 1").max(100,"Máximo el número 100").positive("El campo debe ser positivo").integer("El campo debe ser entero").typeError("El campo debe ser númerico").required("Campo requerido"),
})
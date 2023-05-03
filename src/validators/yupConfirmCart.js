import * as yup from "yup";

export const yupConfirmCart = yup.object({
  nameCustomer: yup.string().min(5,"Mínimo 5 caracteres").max(30,"Máximo 30 caracteres").typeError("El campo es un alfanumérico").required("Campo requerido"),
  tableOrder: yup.number().min(1,"Mínimo el número 1").max(100,"Máximo el número 100").positive("El campo es positivo").integer("El campo es un entero").typeError("El campo es un número").required("Campo requerido"),
}).required("Campo requerido");
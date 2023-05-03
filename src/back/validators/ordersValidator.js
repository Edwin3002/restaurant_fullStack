import { check, checkExact } from "express-validator";
import { validateRequest } from "../helpers/validateRequest.js";

export const createUpdateOrderValidator = [
  //_id
  check("_id")
    .optional()
    .isMongoId().withMessage("El campo debe ser un ID")
    .notEmpty().withMessage("El campo esta vacio")
    .trim(),
  //nameCustomer
  check("nameCustomer")
    .isString().withMessage("El campo debe ser alfanumerico")
    .isLength({ min: 5, max: 30 }).withMessage("El campo debe ser min. 5 y max. 30 caracteres")
    .exists().withMessage("El campo no existe")
    .notEmpty().withMessage("El campo esta vacio")
    .trim(),
  //tableOrder
  check("tableOrder")
    .isInt({ gt: 0, lt: 100 }).withMessage("El campo debe ser numerico 1")
    .exists().withMessage("El campo no existe")
    .notEmpty().withMessage("El campo esta vacio"),
  // check("codeOrder")
  //   .optional()
  //   .isString().withMessage("El campo debe ser alfanumerico")
  //   .isLength({ min: 5, max: 5 }).withMessage("El campo debe ser min. 5")
  //   .notEmpty().withMessage("El campo esta vacio")
  //   .trim(),
  //amountOrder
  check("amountOrder")
    .isInt({ gt: 0 }).withMessage("El campo debe ser numerico 2")
    .exists().withMessage("El campo no existe")
    .notEmpty().withMessage("El campo esta vacio").trim(),
  //totalPriceOrder
  check("totalPriceOrder")
    .isInt({ gt: 999 }).withMessage("El campo debe ser numerico 3 y debe ser min. 1000")
    .exists().withMessage("El campo no existe")
    .notEmpty().withMessage("El campo esta vacio").trim(),
  //listOrder
  check("listOrder")
    .isArray({ min: 1 }).withMessage("El campo debe ser una lista/array y debe tener min. una orden")
    .exists().withMessage("El campo no existe")
    .notEmpty().withMessage("El campo esta vacio"),
  //"listOrder[*].name"
  check("listOrder[*].name")
    .isString().withMessage("El campo debe ser alfanumerico")
    .isLength({ min: 5, max: 25 }).withMessage("El campo debe ser min. 5 y max. 25 caracteres")
    .exists().withMessage("El campo no existe")
    .notEmpty().withMessage("El campo esta vacio")
    .trim(),
  //"listOrder[*].amount"
  check("listOrder[*].amount")
    .isInt({ gt: 0 }).withMessage("El campo debe ser numerico 4")
    .exists().withMessage("El campo no existe")
    .notEmpty().withMessage("El campo esta vacio"),
  //"listOrder[*].price"
  check("listOrder[*].price")
    .isInt().withMessage("El campo debe ser numerico 5")
    .isFloat({ min: 1000 }).withMessage("El campo debe ser min. 1000")
    .exists().withMessage("El campo no existe")
    .notEmpty().withMessage("El campo esta vacio").trim(),
  //listOrder[*].category
  check("listOrder[*].category")
    .isString().withMessage("El campo debe ser alfanumerico")
    .isLength({ min: 5, max: 25 }).withMessage("El campo debe ser min. 5 y max. 25 caracteres")
    .exists().withMessage("El campo no existe")
    .notEmpty().withMessage("El campo esta vacio").trim(),
  //listOrder[*].img
  check("listOrder[*].img")
    .isString().withMessage("El campo debe ser alfanumerico")
    .isLength({ min: 15 }).withMessage("El campo debe ser min. 15 caracteres")
    .exists().withMessage("El campo no existe")
    .notEmpty().withMessage("El campo esta vacio").trim(),
  checkExact([], { message: "Los campos solo pueden ser [ nameCustomer, tableOrder, amountOrder, totalPriceOrder, listOrder ]" }),
  (req, res, next) => {
    validateRequest(req, res, next);
  }
];

export const updateStateOrderValidator = [ //TODO:name, age, email
  //id
  check("_id")
    .isMongoId().withMessage("El campo debe ser un ID")
    .exists().withMessage("El campo no existe")
    .notEmpty().withMessage("El campo esta vacio")
    .trim(),
  check("stateOrder")
    .isString().withMessage("El campo debe ser alfanumerico")
    .isIn(["cancelado", "cocinandose", "entregandose"]).withMessage("Los campos solo pueden ser [ cancelado, cocinandose, entregandose ]")
    .exists().withMessage("El campo no existe")
    .notEmpty().withMessage("El campo esta vacio")
    .trim(),
  (req, res, next) => {
    validateRequest(req, res, next);
  }
];
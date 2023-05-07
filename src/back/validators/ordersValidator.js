import { body, check, checkExact } from "express-validator";
import { validationResult } from "express-validator";
import { initMiddleware, validateRequest } from "../utils/handlerValidator";

export const createUpdateOrderValidator = initMiddleware(validateRequest([
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
    .isInt({ gt: 0, lt: 100 }).withMessage("El campo debe ser numerico")
    .exists().withMessage("El campo no existe")
    .notEmpty().withMessage("El campo esta vacio"),
  //amountOrder
  check("amountOrder")
    .isInt({ gt: 0 }).withMessage("El campo debe ser numerico")
    .exists().withMessage("El campo no existe")
    .notEmpty().withMessage("El campo esta vacio"),
  //totalPriceOrder
  check("totalPriceOrder")
    .isInt({ gt: 999 }).withMessage("El campo debe ser numerico y min. 1000")
    .exists().withMessage("El campo no existe")
    .notEmpty().withMessage("El campo esta vacio"),
  // listOrder
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
    .isInt({ min: 1 }).withMessage("El campo debe ser numerico y min. 1")
    .exists().withMessage("El campo no existe")
    .notEmpty().withMessage("El campo esta vacio"),
  //"listOrder[*].price"
  check("listOrder[*].price")
    .isInt({ min: 999 }).withMessage("El campo debe ser numerico y min. 1000")
    .exists().withMessage("El campo no existe")
    .notEmpty().withMessage("El campo esta vacio"),
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
    .notEmpty().withMessage("El campo esta vacio"),
  checkExact([body('nameCustomer'), body('tableOrder'), body('amountOrder'), body('totalPriceOrder'), body('listOrder')], { message: "Los campos solo pueden ser [ nameCustomer, tableOrder, amountOrder, totalPriceOrder, listOrder ]" }),
], validationResult));

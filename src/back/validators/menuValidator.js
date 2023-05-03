import { check, checkExact, param } from "express-validator";
import { validateRequest } from "../helpers/validateRequest.js";
import { starValidation } from "../utils/handlerValidator.js";

export const listMenusValidator = starValidation([
  param("category").isString().withMessage("El campo debe ser una palabra"),
  (req, res, next) => {
    validateRequest(req, res, next);
  },
  param("page").isInt().withMessage("El campo debe ser un numero entero"),
  (req, res, next) => {
    validateRequest(req, res, next);
  }
]);

export const createMenuValidator =   [
    //name
    check("name")
      .isString().withMessage("El campo debe ser alfanumerico")
      .isLength({ min: 5, max: 25 }).withMessage("El campo debe ser min. 5 y max. 25 caracteres")
      .exists().withMessage("El campo no existe")
      .notEmpty().withMessage("El campo esta vacio")
      .trim(),
    //description
    check("description")
      .isString().withMessage("El campo debe ser alfanumerico")
      .isLength({ min: 10, max: 200 }).withMessage("El campo debe ser min. 10 y max. 200 caracteres")
      .exists().withMessage("El campo no existe")
      .notEmpty().withMessage("El campo esta vacio").trim(),
    //img
    check("img")
      .isString().withMessage("El campo debe ser alfanumerico")
      .isLength({ min: 15 }).withMessage("El campo debe ser min. 15 caracteres")
      .exists().withMessage("El campo no existe")
      .notEmpty().withMessage("El campo esta vacio").trim(),
    //price
    check("price")
      .isNumeric().withMessage("El campo debe ser numerico")
      .isFloat({ min: 1000 }).withMessage("El campo debe ser min. 1000")
      .exists().withMessage("El campo no existe")
      .notEmpty().withMessage("El campo esta vacio").trim(),
    //category
    check("category")
      .isString().withMessage("El campo debe ser alfanumerico")
      .isLength({ min: 5, max: 25 }).withMessage("El campo debe ser min. 5 y max. 25 caracteres")
      .exists().withMessage("El campo no existe")
      .notEmpty().withMessage("El campo esta vacio").trim(),
  ]

export const updateMenuValidator = [ //TODO:name, age, email
//_id
  check("_id")
    .isMongoId().withMessage("El campo debe ser un ID")
    .exists().withMessage("El campo no existe")
    .notEmpty().withMessage("El campo esta vacio")
    .trim(),
  //name
  check("name")
    .optional()
    .isString().withMessage("El campo debe ser alfanumerico")
    .notEmpty().withMessage("El campo esta vacio")
    .isLength({ min: 5, max: 25 }).withMessage("El campo debe ser min. 5 y max. 25 caracteres")
    .trim(),
  //description
  check("description")
    .optional()
    .isString().withMessage("El campo debe ser alfanumerico")
    .notEmpty().withMessage("El campo esta vacio")
    .isLength({ min: 10, max: 200 }).withMessage("El campo debe ser min. 10 y max. 200 caracteres")
    .trim(),
  //img
  check("img")
    .optional()
    .isString().withMessage("El campo debe ser alfanumerico")
    .notEmpty().withMessage("El campo esta vacio")
    .isLength({ min: 15 }).withMessage("El campo debe ser min. 15 caracteres")
    .trim(),
  //price
  check("price")
    .optional()
    .isNumeric().withMessage("El campo debe ser numerico")
    .notEmpty().withMessage("El campo esta vacio")
    .isFloat({ min: 1000 }).withMessage("El campo debe ser min. 1000")
    .trim(),
  //category
  check("category")
    .optional()
    .isString().withMessage("El campo debe ser alfanumerico")
    .notEmpty().withMessage("El campo esta vacio")
    .isLength({ min: 5, max: 25 }).withMessage("El campo debe ser min. 5 y max. 25 caracteres")
    .trim(),
  checkExact([], { message: "Los campos pueden ser [ name, description, img, price, category ]" }),
  (req, res, next) => {
    validateRequest(req, res, next);
  }
];

export const deleteMenuValidator = [ //TODO:name, age, email
  check("_id")
    .isMongoId().withMessage("El campo debe ser un ID")
    .exists().withMessage("El campo no existe")
    .notEmpty().withMessage("El campo esta vacio")
    .trim(),
  checkExact([], { message: "El campo solo puede ser _id]" }),
  (req, res, next) => {
    validateRequest(req, res, next);
  }
];

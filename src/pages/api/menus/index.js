import menuModel from "@/back/models/menuModel";
import { startBackend } from "@/back/startBackend";
import handlerValidator, { post, validateRequest } from "@/back/utils/handlerValidator";
import { body, check, checkExact, param } from "express-validator";

startBackend();

const createMenuValidator = validateRequest([
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
    .isLength({ min: 10, max: 100 }).withMessage("El campo debe ser min. 10 y max. 200 caracteres")
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
  checkExact([body('name'), body('description'), body('img'), body('price'), body('category')], { message: "Los campos solo pueden ser [ name, description, img, price, category ]" }),

])
export default handlerValidator.use(post(createMenuValidator))
  .post(async (req, res) => {
    const data = req.body;
    try {
      await menuModel.create(data);
      return res.status(200).json({ code: 200, msg: "Creacion exitosa" });
    } catch (err) {
      console.log("error" + err + "fallo la creacion");
    }
    return res.status(404).json({ code: 404, msg: "Error inesperado, intente nuevamente" });
  })
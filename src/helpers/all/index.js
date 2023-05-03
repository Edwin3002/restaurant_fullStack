import menuModel from "@/back/models/menuModel.js";
import { check, checkExact } from "express-validator";
import { startBackend } from "@/back/startBackend.js";
import handlerValidator, { post, validateRequest } from "@/back/utils/handlerValidator";

startBackend();
const createMenuValidator = validateRequest(
  [
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
    checkExact([], { message: "Los campos solo pueden ser [ name, description, img, price, category ]" }),
  ]
)


export default handlerValidator.use(post(createMenuValidator))

  .get(async (req, res) => {
    // try {
    //   console.log(" hola 2");
    //   console.log(req.query);
    //   let data = [];
    //   if (Object.values(req.body)[0]) {
    //     return res.status(404).json({ code: 404, msg: "No envies nada en el body" });
    //   }
    //   data = await menuModel.find({ available: true }).limit(10);
    //   if (data[0]) return res.json({ code: 200, msg: "Busqueda exitosa", data: data });

    //   return res.status(404).json({ code: 404, msg: "Busqueda fallida, no hay resgistros, intente otra pagina o la anterior" });
    // } catch (err) {
    //   console.log(" error" + err + "fallo la peticion");
    // }
    try {
      let data = [];
      console.log("hola 2");
      console.log(req.query, 2);
      if (Object.values(req.body)[0]) {
        return res.status(404).json({ code: 404, msg: "No envies nada en el body" });
      }
      data = await menuModel.find({ available: true }).limit(10);
      if (data[0]) return res.json({ code: 200, msg: "Busqueda exitosa", data: data });

      return res.status(404).json({ code: 404, msg: "Busqueda fallida, no hay resgistros, intente otra pagina o la anterior" });
    } catch (err) {
      console.log(" error" + err + "fallo la peticion");
    }
  })
  .post(async (req, res) => {
    console.log(res.body);
    res.status(200).json({ success: true, data: req.body })
  })
// (req, res) {
//   startBackend();

//   let method = req.method;
//   if (methods.GET === method) {
//     try {
//       let data = [];
//       data = await menuModel.find({ available: true }).limit(10);
//       if (data[0]) return res.json({ code: 200, msg: "Busqueda exitosa", data: data });

//       return res.status(404).json({ code: 404, msg: "Busqueda fallida, no hay resgistros, intente otra pagina o la anterior" });
//     } catch (err) {
//       console.log(" error" + err + "fallo la peticion");
//     }
//   } else if (methods.POST === method) {
//     await validateBody(req, res);

//     const errors = validationResult(req);
//     console.log(errors);
//     try {
//       const data = req.body;
//       await menuModel.create(data);
//       return res.status(200).json({ code: 200, msg: "Creacion exitosa" });
//     } catch (err) {
//       console.log("error" + err + "fallo la creacion");
//     }
//     return res.status(404).json({ code: 404, msg: "Error inesperado, intente nuevamente" });
//   }
//   return res.status(404).json({ code: 404, msg: "Error inesperado, intente nuevamente" });
// };


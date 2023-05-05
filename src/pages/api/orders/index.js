import { startBackend } from "@/back/startBackend";
import ordersModel from "@/back/models/ordersModel";
import handlerValidator, { post, put, validateRequest } from "@/back/utils/handlerValidator";
import { body, check, checkExact } from "express-validator";
import { methods } from "@/back/utils/methods";

startBackend();

const createUpdateOrderValidator = validateRequest([
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
    .notEmpty().withMessage("El campo esta vacio").trim(),
  checkExact([body('nameCustomer'), body('tableOrder'), body('amountOrder'), body('totalPriceOrder'), body('listOrder')], { message: "Los campos solo pueden ser [ nameCustomer, tableOrder, amountOrder, totalPriceOrder, listOrder ]" }),
]);

// export default handlerValidator.use(post(createUpdateOrderValidator), put(createUpdateOrderValidator))
//   .get(async (req, res) => {
//     try {
//       let data;
//       if (Object.values(req.body)[0]) {
//         return res.status(404).json({ code: 404, msg: "No envies nada en el body" });
//       }
//       data = await ordersModel.find();
//       if (data[0]) {
//         return res.json({ code: 200, msg: "Busqueda exitosa", data: data });
//       }
//       return res.status(404).json({ code: 404, msg: "Busqueda fallida, no hay resgistros, intente otra pagina o la anterior" });
//     } catch (err) {
//       console.log(err, "fallo");
//     }
//     return res.status(404).json({ code: 404, msg: "Error inesperado, intente nuevamente", route: "orders, get" });
//   })
//   .post(async (req, res) => {
//     try {
//       const data = req.body;
//       if (data._id) {
//         return res.status(404).json({ code: 404, msg: "No envies un id, estas creando", route: "orders, post" });
//       }
//       await ordersModel.create(data);
//       res.status(200).json({ code: 200, msg: "Creacion exitosa" });
//       // io.emit("message", (await ordersModel.find()).reverse());
//       return;
//     } catch (err) {
//       console.log("error" + err + "fallo la creacion");
//     }
//     return res.status(404).json({ code: 404, msg: "Error inesperado, intente nuevamente", route: "orders, post" });
//   })
//   .put(async (req, res) => {
//     try {
//       const data = req.body;
//       const id = data._id;
//       delete data._id;
//       if (await ordersModel.findById(id)) {
//         await ordersModel.findByIdAndUpdate(id, data);
//         return res.status(200).json({ code: 200, msg: "Actualizacion exitosa" });
//       }
//       return res.status(404).json({ code: 404, msg: "El ID no se encuentra registrado", route: "orders, put" });
//     } catch (error) {
//       console.log("error" + error + "fallo la actualizacion");
//     }
//     return res.status(404).json({ code: 404, msg: "Error inesperado, intente nuevamente", route: "orders, psot" });
//   })



export default async function handler(req, res) {
  const method = req.method;
  if (methods.GET === method) {
    try {
      let data;
      if (Object.values(req.body)[0]) {
        return res.status(404).json({ code: 404, msg: "No envies nada en el body" });
      }
      data = await ordersModel.find();
      if (data[0]) {
        return res.json({ code: 200, msg: "Busqueda exitosa", data: data });
      }
      return res.status(404).json({ code: 404, msg: "Busqueda fallida, no hay resgistros, intente otra pagina o la anterior" });
    } catch (err) {
      console.log(err, "fallo");
    }
  } else if (methods.POST === method) {
    try {
      const data = req.body;
      if (data._id) {
        return res.status(404).json({ code: 404, msg: "No envies un id, estas creando", route: "orders, post" });
      }
      await ordersModel.create(data);
      res.status(200).json({ code: 200, msg: "Creacion exitosa" });
      // io.emit("message", (await ordersModel.find()).reverse());
      return;
    } catch (err) {
      console.log("error" + err + "fallo la creacion");
    }
  } else if (methods.PUT === method) {
    try {
      const data = req.body;
      const id = data._id;
      delete data._id;
      if (await ordersModel.findById(id)) {
        await ordersModel.findByIdAndUpdate(id, data);
        return res.status(200).json({ code: 200, msg: "Actualizacion exitosa" });
      }
      return res.status(404).json({ code: 404, msg: "El ID no se encuentra registrado", route: "orders, put" });
    } catch (error) {
      console.log("error" + error + "fallo la actualizacion");
    }
  }

  return res.status(404).json({ code: 404, msg: "Error inesperado, intente nuevamente", route: "orders, get" });
}
import { startBackend } from "@/back/startBackend";
import ordersModel from "@/back/models/ordersModel";
import { methods } from "@/back/constants/methods";
import { createUpdateOrderValidator } from "@/back/validators/ordersValidator";

startBackend();

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
      data = (await ordersModel.find()).reverse();
      if (data[0]) {
        return res.json({ code: 200, msg: "Busqueda exitosa", data: data, route: "orders, get" });
      }
      return res.status(404).json({ code: 404, msg: "Busqueda fallida, no hay resgistros, intente otra pagina o la anterior" });
    } catch (err) {
      console.log(err, "fallo");
    }
  } else if (methods.POST === method) {
    try {
      await createUpdateOrderValidator(req, res);
      const data = req.body;
      if (data._id) {
        return res.status(404).json({ code: 404, msg: "No envies un id, estas creando", route: "orders, post" });
      }
      await ordersModel.create(data);
      res.status(200).json({ code: 200, msg: "Creacion exitosa", route: "orders, post" });
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
        return res.status(200).json({ code: 200, msg: "Actualizacion exitosa", route: "orders, put" });
      }
      return res.status(404).json({ code: 404, msg: "El ID no se encuentra registrado", route: "orders, put" });
    } catch (error) {
      console.log("error" + error + "fallo la actualizacion");
    }
  }
  return res.status(404).json({ code: 404, msg: "Error inesperado, intente nuevamente", route: "orders" });
}
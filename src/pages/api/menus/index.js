import { methods } from "@/back/constants/methods";
import menuModel from "@/back/models/menuModel";
import { startBackend } from "@/back/startBackend";
import { createMenuValidator } from "@/back/validators/menuValidator";

startBackend();

export default async function handler(req, res) {
  const method = req.method;
  if (methods.POST === method) {
    try {
      await createMenuValidator(req, res)
      const data = req.body;
      await menuModel.create(data);
      return res.status(200).json({ code: 200, msg: "Creacion exitosa", route: "menus, post" });
    } catch (err) {
      console.log("error" + err + "fallo la creacion");
    }
  } else if (methods.PUT === method) {
    return res.status(404).json({ code: 404, route: "menus, pust" });
  } else if (methods.DELETE === method) {
    return res.status(404).json({ code: 404, route: "menus, delete" });
  }
  return res.status(404).json({ code: 404, msg: "Error inesperado, intente nuevamente", route: "menus, post" });
}
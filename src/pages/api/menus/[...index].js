import { methods } from "@/back/constants/methods";
import menuModel from "@/back/models/menuModel";
import { startBackend } from "@/back/startBackend";
import { listMenusValidator } from "@/back/validators/menuValidator";

startBackend();

export default async function handler(req, res) {
  const method = req.method;
  if (methods.GET === method) {
    try {
      await listMenusValidator(req, res)
      let data = [];
      if (Object.values(req.body)[0]) {
        return res.status(404).json({ code: 404, msg: "No envies nada en el body", route: "menus, get" });
      }
      let category = req.query?.index[0];
      let page = req.query?.index[1];
      page = Number(page);

      if (category === "all" && !page || category === "all" && page === 1) {
        data = await menuModel.find({ available: true }).limit(10);
        if (data[0]) return res.json({ code: 200, msg: "Busqueda exitosa", data: data });
      }
      if (isNaN(page)) {
        return res.status(400).json({ code: 400, data: "El paginado debe ser un numero" });
      }
      if (page % 1 !== 0 || page <= 0) {
        return res.status(400).json({ code: 400, data: "El paginado debe ser un numero entero positivo" });
      }
      if (category === "all" && page > 1) {
        data = await menuModel.find({ available: true }).skip((page - 1) * 10).limit(10);
        if (data[0]) {
          return res.json({ code: 200, msg: "Busqueda exitosa", data: data });
        }
      }
      if (!await menuModel.findOne({ category: category })) {
        return res.status(400).json({ code: 400, data: "La categoria no existe" });
      }
      if (page === 1) {
        data = await menuModel.find({ available: true, category: category }).limit(10);
      }
      if (page) {
        data = await menuModel.find({ available: true, category: category }).skip((page - 1) * 10).limit(10);
      }
      if (data[0]) {
        return res.json({ code: 200, msg: "Busqueda exitosa", data: data });
      }
      return res.status(404).json({ code: 404, msg: "Busqueda fallida, no hay resgistros, intente otra pagina o la anterior", route: "menus, get" });
    } catch (err) {
      console.log(" error" + err + "fallo la peticion");
    }
    return res.status(404).json({ code: 404, msg: "Error inesperado, intente nuevamente", route: "menus, get 21" });
  }
}
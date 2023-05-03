import { startBackend } from "@/back/startBackend";
import ordersModel from "@/back/models/ordersModel";
import { methods } from "@/back/utils/methods";

export default async function handler(req, res) {
  startBackend();
  let method = req.method;
  if (methods.GET === method) {
    let data;
    try {
   
      if (Object.values(req.body)[0]) {
        return res.status(404).json({ code: 404, msg: "No envies nada en el body" });
      }
      data = (await ordersModel.find()).reverse();
         return res.status(404).json({ code: 404, msg: "Error inesperado, intente nuevamente get", data: data });
      
      if (data[0]) {
        return res.json({ code: 200, msg: "Busqueda exitosa", data: data });
      }
      return res.status(404).json({ code: 404, msg: "Busqueda fallida, no hay resgistros" });
    } catch (err) {
      console.log(err, "fallo");
    }
  
    } else if (methods.POST === method) {
    return res.status(404).json({ code: 404, msg: "Error inesperado, intente nuevamente post" });
  }
  else if (methods.PUT === method) {
    return res.status(404).json({ code: 404, msg: "Error inesperado, intente nuevamente put" });
  }
  else if (methods.DELELTE === method) {
    return res.status(404).json({ code: 404, msg: "Error inesperado, intente nuevamente delete" });
  }
  return res.status(404).json({ code: 404, msg: "Error inesperado, intente nuevamente" });
}

import menuModel from "@/back/models/menuModel";
import { startBackend } from "@/back/startBackend";



export default async (req, res, next) => {
  // run morgan before the return response
  startBackend();
  const data = await menuModel.find({ available: true }).limit(10);
  if (data[0]) return res.json({ code: 200, msg: "Busqueda exitosa", data: data });
  // return response to the client
  return res.json({ msg: "Siuuu" });
};

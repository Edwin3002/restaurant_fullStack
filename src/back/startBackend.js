import { startMongo } from "./db/startMongo";


export const startBackend = async () => {
  startMongo();
  // const morgan = Morgan("dev");
  // export default async (req, res, next) => {
  //   // run morgan before the return response
  //   await runMiddleware(req, res, morgan);

  //   // return response to the client
  //   return res.json({ msg: "Pong!" });
  // }
}
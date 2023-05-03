import { connect, connection } from "mongoose";

const urlMongo = "mongodb://127.0.0.1:27017/restaurant";
connect(process.env.URLMONGO || urlMongo, {
  useNewUrlParser: true,
});

export const startMongo = () => {
  try {
    if (connection._readyState === 1) return
    connection.once("open", () => {
      console.log("Mongo is Alive");
    });
  } catch (error) {
    console.log(error, "fallo");
  }
};
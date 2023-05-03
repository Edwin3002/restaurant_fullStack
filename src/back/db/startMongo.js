import { connect, connection } from "mongoose";

const urlMongo="mongodb+srv://edwin:xtelar2020@xtelardb.skvhbmg.mongodb.net/?retryWrites=true&w=majority"

// const urlMongo = "mongodb://127.0.0.1:27017/restaurant";
connect(urlMongo, {
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

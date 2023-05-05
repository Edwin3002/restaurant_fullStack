import { toast } from "react-hot-toast";

export const sizeInputFile = 5000000;

export const formatsInputFile = ["png", "jpeg", "jpg"];

export const convertToBase64 = (file, nameValue, callBack) => {
if (!file) return
  if (file.size > sizeInputFile) {
    toast.error("La imagen pesa demasido comprimela!");
    callBack(nameValue, "");
    return null;
  }
  if (!formatsInputFile.some(item => file.type.includes(item))) {
    toast.error("El archivo debe ser una imagen!");
    callBack(nameValue, "");
    return null;
  }
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
      callBack(nameValue, fileReader.result);
    };

    fileReader.onerror = (error) => {
      console.log(error, "base64");
      callBack(nameValue, "");
      return null;
    };
  });
};
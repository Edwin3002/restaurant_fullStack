export const uploadImage = async (base64) => {
  const res = await fetch("https://api.cloudinary.com/v1_1/edwin3002/image/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
      upload_preset: "resCloudinary",
      file: base64
    })
  });
  return await res.json();
}
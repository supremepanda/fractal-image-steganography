const getBase64 = (img, callback) => {
  const reader = new FileReader();

  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

export default getBase64;

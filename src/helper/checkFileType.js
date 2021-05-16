import { message } from "antd";

const checkFileType = (file, validTypes, errorMessage) => {
  const isValid = validTypes.some((validType) => file.type === validType);

  if (!isValid) {
    message.error(errorMessage);
  }

  return isValid;
};

export default checkFileType;

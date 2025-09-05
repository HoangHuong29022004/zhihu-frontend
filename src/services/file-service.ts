/* eslint-disable @typescript-eslint/no-explicit-any */
import imageCompression from "browser-image-compression";

import { apiClient } from "@/configs/axios-interceptor";
import { API_ENDPOINT } from "@/data/constants/api-endpoints";

export const compressImage = async (file: File): Promise<File> => {
  const options = {
    maxSizeMB: 1, // Giới hạn dung lượng ảnh sau nén (MB)
    maxWidthOrHeight: 1920, // Giới hạn kích thước ảnh
    useWebWorker: true,
  };
  try {
    console.log(
      `[ImageCompression] Before: ${(file.size / 1024).toFixed(2)} KB`
    );
    const compressedFile = await imageCompression(file, options);
    console.log(
      `[ImageCompression] After: ${(compressedFile.size / 1024).toFixed(2)} KB`
    );
    return compressedFile;
  } catch (error) {
    console.error("Image compression error:", error);
    return file; // fallback nếu lỗi
  }
};

export const uploadFile = async (file: File, token: string): Promise<any> => {
  // optimize file size
  const compressedFile = await compressImage(file);
  // console.log("check file before: ", file);
  // console.log("check compressedFile: ", compressedFile);

  const fileToUpload =
    compressedFile instanceof File
      ? compressedFile
      : new File([compressedFile], file.name, { type: file.type });

  // console.log("check file after: ", fileToUpload);

  // pass to formData
  const formData = new FormData();
  formData.append("File", fileToUpload);
  // Check env node
  const baseUrl =
    process.env.NEXT_PUBLIC_ENV_NODE === "development"
      ? process.env.NEXT_PUBLIC_API_URL_DEV_NO_VERSION
      : process.env.NEXT_PUBLIC_API_URL_NO_VERSION;

  try {
    const response = await apiClient(
      baseUrl,
      true,
      "multipart/form-data",
      token
    ).post(`${API_ENDPOINT.FILE_UPLOAD}`, formData, {});
    return response.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const uploadAudio = async (file: File, token: string): Promise<any> => {
  const formData = new FormData();
  formData.append("File", file);
  // Check env node
  const baseUrl =
    process.env.NEXT_PUBLIC_ENV_NODE === "development"
      ? process.env.NEXT_PUBLIC_API_URL_DEV_NO_VERSION
      : process.env.NEXT_PUBLIC_API_URL_NO_VERSION;

  try {
    const response = await apiClient(
      baseUrl,
      true,
      "multipart/form-data",
      token
    ).post(`${API_ENDPOINT.FILE_UPLOAD_AUDIO}`, formData, {});
    return response.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

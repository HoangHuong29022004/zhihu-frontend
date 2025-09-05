/* eslint-disable @typescript-eslint/no-explicit-any */

import { uploadAudio, uploadFile } from "@/services/file-service";
import { useMutation } from "@tanstack/react-query";

export const useUploadFile = (token: string) => {
  return useMutation({
    mutationFn: ({ file }: { file: File }) => uploadFile(file, token),
    onSuccess: (res: any) => {
      return res;
    },
    onError: (error: any) => {
      return error;
    },
  });
};

export const useUploadAudio = (token: string) => {
  return useMutation({
    mutationFn: ({ file }: { file: File }) => uploadAudio(file, token),
    onSuccess: (res: any) => {
      return res;
    },
    onError: (error: any) => {
      return error;
    },
  });
};

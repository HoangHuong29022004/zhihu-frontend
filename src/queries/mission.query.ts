/* eslint-disable @typescript-eslint/no-explicit-any */

import { getListMissions, updateMission } from "@/services/mission-service";
import { IApiResponse } from "@/types/global";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetMissions = ({
  token,
  pageNumber,
  pageSize,
  enabled = true,
}: {
  token: string;
  pageNumber: number;
  pageSize: number;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ["missions", { pageNumber, pageSize }],
    queryFn: async () => {
      try {
        return await getListMissions(token, { pageNumber, pageSize });
      } catch (error) {
        return error;
      }
    },
    enabled,
  });
};

export const useUpdateMission = (token: string) => {
  return useMutation({
    mutationFn: (id: string) => updateMission(token, id),
    onSuccess: (res: IApiResponse<any>) => {
      return res;
    },
    onError: (error: any) => {
      return error;
    },
  });
};

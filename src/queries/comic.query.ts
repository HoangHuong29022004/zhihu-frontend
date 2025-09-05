import {
  getListUserPurchasedComics,
  rejectedComic,
  updateComicStatus,
} from "./../services/comic-service";
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  TAddComicRequest,
  TOutStandingRequest,
  TUpdateComicRequest,
} from "@/schemas/comic.schema";
import {
  addNewComic,
  approvedComic,
  deleteComic,
  getComicDetailBySlug,
  getComicDetails,
  getListComics,
  getListComicsRequesting,
  getListUserComics,
  outStandingComic,
  updateComic,
} from "@/services/comic-service";
import { IApiResponse, IDeletedRequest } from "@/types/global";
import { isSuccessResponse } from "@/utils/api-handler";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetComics = ({
  pageNumber,
  pageSize,
  search,
  categorySlug,
  enabled = true,
}: {
  pageNumber: number;
  pageSize: number;
  search: string;
  categorySlug: string;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ["comics", { pageNumber, pageSize, search, categorySlug }],
    queryFn: async () => {
      try {
        if (search) {
          return await getListComics({
            pageNumber,
            pageSize,
            search,
          });
        } else if (categorySlug) {
          return await getListComics({
            pageNumber,
            pageSize,
            categorySlug,
          });
        } else {
          return await getListComics({ pageNumber, pageSize });
        }
      } catch (error) {
        return error;
      }
    },
    enabled,
  });
};

export const useGetUserComics = (
  token: string,
  {
    pageNumber,
    pageSize,
    search,
    enabled = true,
  }: {
    pageNumber: number;
    pageSize: number;
    search: string;
    enabled?: boolean;
  }
) => {
  return useQuery({
    queryKey: ["user-comics", { pageNumber, pageSize, search }],
    queryFn: async () => {
      try {
        if (search) {
          return await getListUserComics(token, {
            pageNumber,
            pageSize,
            search,
          });
        } else {
          return await getListUserComics(token, { pageNumber, pageSize });
        }
      } catch (error) {
        return error;
      }
    },
    enabled,
  });
};

export const useGetUserPurchasedComics = (
  token: string,
  {
    pageNumber,
    pageSize,
    search,
    enabled = true,
  }: {
    pageNumber: number;
    pageSize: number;
    search: string;
    enabled?: boolean;
  }
) => {
  return useQuery({
    queryKey: ["purchased-comics", { pageNumber, pageSize, search }],
    queryFn: async () => {
      try {
        if (search) {
          return await getListUserPurchasedComics(token, {
            pageNumber,
            pageSize,
            search,
          });
        } else {
          return await getListUserPurchasedComics(token, {
            pageNumber,
            pageSize,
          });
        }
      } catch (error) {
        return error;
      }
    },
    enabled,
  });
};

export const useGetComicsRequesting = ({
  pageNumber,
  pageSize,
  search,
  enabled = true,
}: {
  pageNumber: number;
  pageSize: number;
  search: string;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ["comics-requesting", { pageNumber, pageSize, search }],
    queryFn: async () => {
      try {
        if (search) {
          return await getListComicsRequesting({
            pageNumber,
            pageSize,
            search,
          });
        } else {
          return await getListComicsRequesting({ pageNumber, pageSize });
        }
      } catch (error) {
        return error;
      }
    },
    enabled,
  });
};

export const useAddComic = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: TAddComicRequest) => addNewComic(token, request),
    onSuccess: (res: IApiResponse<any>) => {
      if (res && isSuccessResponse(res.statusCode, res?.success)) {
        queryClient.invalidateQueries({
          queryKey: ["comics"],
          exact: false,
        });
      }
      return res;
    },
    onError: (error: any) => {
      return error;
    },
  });
};

export const useApprovedComic = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => approvedComic(token, id),
    onSuccess: (res: IApiResponse<any>) => {
      if (res && isSuccessResponse(res.statusCode, res?.success)) {
        queryClient.invalidateQueries({
          queryKey: ["comics-requesting"],
          exact: false,
        });
      }
      return res;
    },
    onError: (error: any) => {
      return error;
    },
  });
};

export const useRejectedComic = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, note }: { id: string; note: string }) =>
      rejectedComic(token, id, note),
    onSuccess: (res: IApiResponse<any>) => {
      if (res && isSuccessResponse(res.statusCode, res?.success)) {
        queryClient.invalidateQueries({
          queryKey: ["comics-requesting"],
          exact: false,
        });
      }
      return res;
    },
    onError: (error: any) => {
      return error;
    },
  });
};

export const useUpdateComicStatus = (token: string) => {
  return useMutation({
    mutationFn: ({ id, request }: { id: string; request: number }) =>
      updateComicStatus(token, id, request),
    onSuccess: (res: IApiResponse<any>) => {
      return res;
    },
    onError: (error: any) => {
      return error;
    },
  });
};

export const useUpdateComic = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      request,
    }: {
      id: string;
      request: TUpdateComicRequest;
    }) => updateComic(token, id, request),
    onSuccess: (res: IApiResponse<any>) => {
      if (res && isSuccessResponse(res.statusCode, res?.success)) {
        queryClient.invalidateQueries({
          queryKey: ["comics", "user-comics"],
          exact: false,
        });
      }
      return res;
    },
    onError: (error: any) => {
      return error;
    },
  });
};

export const useGetDetailsComicBySlug = (token: string, slug: string) => {
  return useQuery({
    queryKey: ["comicDetailsSlug", { slug }],
    queryFn: async () => {
      try {
        if (slug) {
          return await getComicDetailBySlug(slug, token);
        } else {
          return null;
        }
      } catch (error) {
        return error;
      }
    },
  });
};

export const useGetDetailsComic = (token: string, id: string) => {
  return useQuery({
    queryKey: ["comicDetailsId", { id }],
    queryFn: async () => {
      try {
        if (id) {
          return await getComicDetails(token, id);
        } else {
          return null;
        }
      } catch (error) {
        return error;
      }
    },
  });
};

export const useDeleteComic = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: IDeletedRequest) => deleteComic(token, request.id),
    onSuccess: (res: IApiResponse<any>) => {
      if (res && isSuccessResponse(res.statusCode, res?.success)) {
        queryClient.invalidateQueries({
          queryKey: ["comics", "user-comics"],
          exact: false,
        });
      }
      return res;
    },
    onError: (error: any) => {
      return error;
    },
  });
};

export const useDeleteUserComic = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: IDeletedRequest) => deleteComic(token, request.id),
    onSuccess: (res: IApiResponse<any>) => {
      if (res && isSuccessResponse(res.statusCode, res?.success)) {
        queryClient.invalidateQueries({
          queryKey: ["user-comics"],
          exact: false,
        });
      }
      return res;
    },
    onError: (error: any) => {
      return error;
    },
  });
};

export const useOutStanding = (token: string) => {
  return useMutation({
    mutationFn: (request: TOutStandingRequest) =>
      outStandingComic(token, request),
    onSuccess: (res: IApiResponse<any>) => {
      return res;
    },
    onError: (error: any) => {
      return error;
    },
  });
};

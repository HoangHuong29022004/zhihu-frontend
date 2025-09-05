export const getComicStatusNumber = (status: string): number => {
  switch (status) {
    case "REQUESTING":
      return 0;
    case "REJECTED":
      return 1;
    case "APPROVED":
      return 2;
    case "COMPLETED":
      return 4;
    case "PENDING":
      return 5;
    default:
      return -1;
  }
};

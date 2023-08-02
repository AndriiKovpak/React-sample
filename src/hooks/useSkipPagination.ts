import { useCallback, useState } from "react";

export const useSkipPagination = (take: number) => {
  const [skip, setSkip] = useState(0);
  return { skip, take, loadMore: useCallback(() => setSkip((skip) => skip + take), []) };
};

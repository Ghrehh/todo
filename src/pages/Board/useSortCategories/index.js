import { useMemo, useCallback } from "react";
import useBoard from "hooks/useBoard";

import { crypto } from "utils/window";

const useSortBoards = (boardId) => {
  const [board, setBoard] = useBoard(boardId);

  const onDropReceived = useCallback(
    (categoryId, index) => {
      if (typeof categoryId !== "string")
        throw new Error("categoryId is required");

      const newCategories = [...board.categories];
      newCategories.splice(index, 0, {
        sortableId: crypto.randomUUID(),
        categoryId,
      });

      setBoard({
        ...board,
        categories: newCategories,
      });
    },
    [board, setBoard]
  );

  const onDropped = useCallback(
    (sortableId) => {
      if (typeof sortableId !== "string")
        throw new Error("sortableId is required");

      const newCategories = [...board.categories];
      const removeIndex = newCategories.findIndex(
        (category) => category.sortableId === sortableId
      );

      if (removeIndex === -1) throw new Error("cannot find category to remove");

      newCategories.splice(removeIndex, 1);

      setBoard({
        ...board,
        categories: newCategories,
      });
    },
    [board, setBoard]
  );

  return useMemo(
    () => ({
      onDropReceived,
      onDropped,
    }),
    [onDropReceived, onDropped]
  );
};

export default useSortBoards;

import { useCallback } from "react";
import useBoard from "hooks/useBoard";

import { crypto, localStorage } from "utils/window";

const useCreateCategory = (boardId) => {
  const [board, setBoard] = useBoard(boardId);

  return useCallback(
    ({ name }) => {
      if (typeof name !== "string") throw new Error("name is required");

      const newCategoryId = crypto.randomUUID();
      const newCategories = [
        ...board.categories,
        { sortableId: crypto.randomUUID(), categoryId: newCategoryId },
      ];

      localStorage.setItem(
        `category-${newCategoryId}`,
        JSON.stringify({
          name,
          todos: [],
        })
      );

      setBoard({ ...board, categories: newCategories });
    },
    [board, setBoard]
  );
};

export default useCreateCategory;

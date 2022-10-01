import { useCallback, useContext } from "react";
import CacheContext from "contexts/cache";
import { localStorage } from "utils/window";

const useDeleteCategory = (deleteCategoryId) => {
  const cache = useContext(CacheContext);

  return useCallback(() => {
    Object.keys(cache.keys)
      .filter((key) => key.includes("board"))
      .forEach((boardKey) => {
        const board = cache.get(boardKey);
        const categoryDeleteIndex = board.categories.findIndex(
          (category) => category.categoryId === deleteCategoryId
        );

        if (categoryDeleteIndex !== -1) {
          const newCategories = [...board.categories];
          newCategories.splice(categoryDeleteIndex, 1);

          const newBoard = {
            ...board,
            categories: newCategories,
          };

          localStorage.setItem(boardKey, JSON.stringify(newBoard));
          cache.set(boardKey, newBoard);
        }
      });
  }, [cache, deleteCategoryId]);
};

export default useDeleteCategory;

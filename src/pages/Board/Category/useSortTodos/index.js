import { useMemo, useCallback } from "react";
import useCategory from "hooks/useCategory";

import { crypto } from "utils/window";

const useSortTodos = (categoryId) => {
  const [category, setCategory] = useCategory(categoryId);

  const onDropReceived = useCallback(
    (todoId, index) => {
      if (typeof todoId !== "string") throw new Error("todoId is required");

      const newTodos = [...category.todos];
      newTodos.splice(index, 0, {
        sortableId: crypto.randomUUID(),
        todoId,
      });

      setCategory({
        ...category,
        todos: newTodos,
      });
    },
    [category, setCategory]
  );

  const onDropped = useCallback(
    (sortableId) => {
      if (typeof sortableId !== "string")
        throw new Error("sortableId is required");

      const newTodos = [...category.todos];
      const removeIndex = newTodos.findIndex(
        (todo) => todo.sortableId === sortableId
      );

      if (removeIndex === -1) throw new Error("cannot find todo to remove");

      newTodos.splice(removeIndex, 1);

      setCategory({
        ...category,
        todos: newTodos,
      });
    },
    [category, setCategory]
  );

  return useMemo(
    () => ({
      onDropReceived,
      onDropped,
    }),
    [onDropReceived, onDropped]
  );
};

export default useSortTodos;

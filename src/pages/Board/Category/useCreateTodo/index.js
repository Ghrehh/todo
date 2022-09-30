import { useCallback } from "react";
import useCategory from "hooks/useCategory";

import { crypto, localStorage } from "utils/window";

const useCreateTodo = (categoryId) => {
  const [category, setCategory] = useCategory(categoryId);

  return useCallback(
    ({ title }) => {
      if (typeof title !== "string") throw new Error("title is required");

      const newTodoId = crypto.randomUUID();
      const newTodos = [
        ...category.todos,
        { sortableId: crypto.randomUUID(), todoId: newTodoId },
      ];

      localStorage.setItem(
        `todo-${newTodoId}`,
        JSON.stringify({
          title,
          text: "",
        })
      );

      setCategory({ ...category, todos: newTodos });
    },
    [category, setCategory]
  );
};

export default useCreateTodo;

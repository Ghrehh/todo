import { useCallback, useContext } from "react";
import CacheContext from "contexts/cache";
import { localStorage } from "utils/window";

const useDeleteTodo = (deleteTodoId) => {
  const cache = useContext(CacheContext);

  return useCallback(() => {
    Object.keys(cache.keys)
      .filter((key) => key.includes("category"))
      .forEach((categoryKey) => {
        const category = cache.get(categoryKey);
        const todoDeleteIndex = category.todos.findIndex(
          (todo) => todo.todoId === deleteTodoId
        );

        if (todoDeleteIndex !== -1) {
          const newTodos = [...category.todos];
          newTodos.splice(todoDeleteIndex, 1);

          const newCategory = {
            ...category,
            todos: newTodos,
          };

          localStorage.setItem(categoryKey, JSON.stringify(newCategory));
          cache.set(categoryKey, newCategory);
        }
      });
  }, [cache, deleteTodoId]);
};

export default useDeleteTodo;

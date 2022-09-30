import { useCallback } from "react";

import Sortable from "components/Sortable";
import useCategory from "hooks/useCategory";

import useCreateTodo from "./useCreateTodo";

import styles from "./styles.module.css";

const Category = ({ id }) => {
  const [{ name, todos }] = useCategory(id);
  const createTodo = useCreateTodo(id);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      createTodo({ title: e.target.title.value });
      e.target.title.value = "";
    },
    [createTodo]
  );

  return (
    <div className={styles.category}>
      <h1>{name}</h1>
      <div className={styles.todos}>
        {todos.map(({ sortableId, todoId }, index) => (
          <Sortable
            className={styles.todo}
            group="todos"
            key={sortableId}
            data={todoId}
            onDropReceived={(movedTodoId) =>
              onDropReceived(movedTodoId, index)
            }
            onDropped={() => onDropped(sortableId)}
          >
            <p></p>
          </Sortable>
        ))}
        <form onSubmit={handleSubmit}>
          <input required minLength="1" name="title" placeholder="title" />
          <input type="submit" value="Add Todo" />
        </form>
      </div>
    </div>
  );
};

export default Category;

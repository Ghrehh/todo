import PropTypes from "prop-types";
import { useCallback } from "react";

import Sortable from "components/Sortable";
import useCategory from "hooks/useCategory";

import useSortTodos from "./useSortTodos";
import useCreateTodo from "./useCreateTodo";
import useDeleteCategory from "./useDeleteCategory";
import Todo from "./Todo";

import styles from "./styles.module.css";

const Category = ({ id }) => {
  const [{ name, todos }] = useCategory(id);
  const createTodo = useCreateTodo(id);
  const { onDropReceived, onDropped } = useSortTodos(id);
  const deleteCategory = useDeleteCategory(id);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      createTodo({ title: e.target.title.value });
      e.target.title.value = "";
    },
    [createTodo]
  );

  const handleDelete = () => {
    const shouldDelete = window.confirm("Do you want to delete this category?");

    if (shouldDelete) deleteCategory();
  };

  return (
    <div className={styles.category}>
      <div className={styles.heading}>
        <h1>{name}</h1>
        <button className={styles.delete} onClick={handleDelete}>
          X
        </button>
      </div>
      <div className={styles.todos}>
        {todos.map(({ sortableId, todoId }, index) => (
          <Sortable
            className={styles.todo}
            group="todos"
            key={sortableId}
            data={todoId}
            onDropReceived={(movedTodoId) => onDropReceived(movedTodoId, index)}
            onDropped={() => onDropped(sortableId)}
          >
            <Todo id={todoId} />
          </Sortable>
        ))}
        <Sortable
          className={styles.todoLast}
          draggable={false}
          group="todos"
          onDropReceived={(movedTodoId) =>
            onDropReceived(movedTodoId, todos.length)
          }
        ></Sortable>
        <form onSubmit={handleSubmit}>
          <input required minLength="1" name="title" placeholder="title" />
          <input type="submit" value="Add Todo" />
        </form>
      </div>
    </div>
  );
};

Category.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Category;

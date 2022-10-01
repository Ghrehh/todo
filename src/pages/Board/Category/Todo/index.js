import PropTypes from "prop-types";
import useTodo from "hooks/useTodo";
import useDeleteTodo from "hooks/useDeleteTodo";
import styles from "./style.module.css";

const Todo = ({ id }) => {
  const [{ title }] = useTodo(id);
  const deleteTodo = useDeleteTodo(id);

  const handleDelete = () => {
    const shouldDelete = window.confirm("Do you want to delete this todo?");

    if (shouldDelete) deleteTodo();
  };

  return (
    <div className={styles.todo}>
      {title}
      <button className={styles.delete} onClick={handleDelete}>
        X
      </button>
    </div>
  );
};

Todo.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Todo;

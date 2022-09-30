import PropTypes from "prop-types";
import useTodo from "hooks/useTodo";
import styles from "./style.module.css";

const Todo = ({ id }) => {
  const [{ title }] = useTodo(id);
  return <div className={styles.todo}>{title}</div>;
};

Todo.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Todo;

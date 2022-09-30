import React from "react";
import useTodo from "hooks/useTodo";
import styles from "./style.module.css";

const Todo = ({ id }) => {
  const [{ title }] = useTodo(id);
  return <div className={styles.todo}>{title}</div>;
};

export default Todo;


import useLocalStorage from "hooks/useLocalStorage";

const useTodo = (id) => {
  const [todo, setTodo] = useLocalStorage(`todo-${id}`);

  if (todo === null) throw new Error("cannot find todo");

  return [todo, setTodo];
};

export default useTodo;

import useLocalStorage from "hooks/useLocalStorage";

const useBoard = (id) => {
  const [board, setBoard] = useLocalStorage(`board-${id}`);

  if (board === null) throw new Error("cannot find board");

  return [board, setBoard];
};

export default useBoard;

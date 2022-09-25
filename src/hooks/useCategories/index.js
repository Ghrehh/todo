/*
const useBoards = () => {
  const [boards, setBoards] = useLocalStorage("boards", []);

  const create = useCallback(
    ({ name }) => {
      if (typeof name !== "string") throw new Error("name is required");

      const newBoards = [...boards];
      newBoards.push({
        id: crypto.randomUUID(),
        iteration: 0,
        name,
      });

      setBoards(newBoards);
    },
    [boards, setBoards]
  );

  const insertAtIndex = useCallback(
    ({ name, id, iteration }, index) => {
      if (typeof name !== "string") throw new Error("name is required");
      if (typeof id !== "string") throw new Error("id is required");
      if (typeof iteration !== "number")
        throw new Error("iteration is required");

      const newBoards = [...boards];
      newBoards.splice(index, 0, {
        id,
        iteration: iteration + 1,
        name,
      });

      setBoards(newBoards);
    },
    [boards, setBoards]
  );

  const find = useCallback(
    ({ id }) => {
      if (typeof id !== "string") throw new Error("id is required");

      const board = boards.find((board) => board.id === id);

      if (board === undefined) throw new Error("cannot find board");

      return board;
    },
    [boards]
  );

  const update = useCallback(
    ({ id, name }) => {
      if (typeof id !== "string") throw new Error("id is required");

      const newBoards = [...boards];
      const updateIndex = newBoards.findIndex((board) => board.id === id);

      if (updateIndex === -1) throw new Error("cannot find board to update");

      newBoards[updateIndex] = {
        ...newBoards[updateIndex],
        name,
      };

      setBoards(newBoards);
    },
    [boards, setBoards]
  );

  const remove = useCallback(
    ({ id, iteration }) => {
      if (typeof id !== "string") throw new Error("id is required");
      if (typeof iteration !== "number")
        throw new Error("iteration is required");

      const newBoards = [...boards];
      const removeIndex = newBoards.findIndex(
        (board) => board.id === id && board.iteration === iteration
      );

      console.log(removeIndex);

      if (removeIndex === -1) throw new Error("cannot find board to update");

      newBoards.splice(removeIndex, 1);

      setBoards(newBoards);
    },
    [boards, setBoards]
  );

  return useMemo(
    () => ({
      data: boards,
      create,
      insertAtIndex,
      update,
      remove,
      find,
    }),
    [boards, create, insertAtIndex, update, remove, find]
  );
};

export default useBoards;
*/

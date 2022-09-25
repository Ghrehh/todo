import { useMemo, useCallback } from "react";

import { crypto } from "utils/window";

import useLocalStorage from "hooks/useLocalStorage";

const useBoards = () => {
  const [boards, setBoards] = useLocalStorage("boards", []);

  const create = useCallback(
    ({ name }) => {
      if (typeof name !== "string") throw new Error("name is required");

      const newBoards = [...boards];
      newBoards.push({
        id: crypto.randomUUID(),
        data: {
          name,
        },
      });

      setBoards(newBoards);
    },
    [boards, setBoards]
  );

  const update = useCallback(
    (id, { name }) => {
      if (typeof id !== "string") throw new Error("id is required");

      const newBoards = [...boards];
      const updateIndex = newBoards.find((board) => board.id === id);

      if (updateIndex < 0) throw new Error("cannot find board to update");

      newBoards[updateIndex].data = {
        name,
      };

      setBoards(newBoards);
    },
    [boards, setBoards]
  );

  const remove = useCallback(
    (id) => {
      if (typeof id !== "string") throw new Error("id is required");

      const newBoards = [...boards];
      const removeIndex = newBoards.find((board) => board.id === id);

      if (removeIndex < 0) throw new Error("cannot find board to update");

      newBoards.splice(removeIndex, 1);

      setBoards(newBoards);
    },
    [boards, setBoards]
  );

  return useMemo(
    () => ({
      data: boards,
      create,
      update,
      remove,
    }),
    [boards, create, update, remove]
  );
};

export default useBoards;

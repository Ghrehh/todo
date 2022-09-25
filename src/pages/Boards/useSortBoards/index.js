import { useMemo, useCallback } from "react";

import { crypto } from "utils/window";

import useBoards from "../useBoards";

const useSortBoards = () => {
  const [boards, setBoards] = useBoards();

  const onDropReceived = useCallback(
    (boardId, index) => {
      if (typeof boardId !== "string") throw new Error("boardId is required");

      const newBoards = [...boards];
      newBoards.splice(index, 0, {
        sortableId: crypto.randomUUID(),
        boardId,
      });

      setBoards(newBoards);
    },
    [boards, setBoards]
  );

  const onDropped = useCallback(
    (sortableId) => {
      if (typeof sortableId !== "string")
        throw new Error("sortableId is required");

      const newBoards = [...boards];
      const removeIndex = newBoards.findIndex(
        (board) => board.sortableId === sortableId
      );

      if (removeIndex === -1) throw new Error("cannot find board to remove");

      newBoards.splice(removeIndex, 1);

      setBoards(newBoards);
    },
    [boards, setBoards]
  );

  return useMemo(
    () => ({
      onDropReceived,
      onDropped,
    }),
    [onDropReceived, onDropped]
  );
};

export default useSortBoards;

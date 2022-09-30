import { useCallback } from "react";

import { crypto, localStorage } from "utils/window";

import useBoards from "../useBoards";

const useCreateBoard = () => {
  const [boards, setBoards] = useBoards();

  return useCallback(
    ({ name }) => {
      if (typeof name !== "string") throw new Error("name is required");

      const newBoardId = crypto.randomUUID();
      // sortableId is a unique identifer used by drag and drop operations
      // boardId represents the actual board, the same boardId may temporarilly appear twice in
      // boards array due to how drag and drops are handled.
      const newBoards = [
        ...boards,
        { sortableId: crypto.randomUUID(), boardId: newBoardId },
      ];

      localStorage.setItem(
        `board-${newBoardId}`,
        JSON.stringify({
          name,
          categories: [],
        })
      );

      setBoards(newBoards);
    },
    [boards, setBoards]
  );
};

export default useCreateBoard;

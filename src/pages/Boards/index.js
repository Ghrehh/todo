import { useCallback } from "react";
import Sortable from "components/Sortable";
import useBoards from "./useBoards";
import useCreateBoard from "./useCreateBoard";
import useSortBoards from "./useSortBoards";
import BoardCard from "./BoardCard";

import styles from "./styles.module.css";

const Boards = () => {
  const [boards] = useBoards();
  const createBoard = useCreateBoard();
  const { onDropReceived, onDropped } = useSortBoards();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      createBoard({ name: e.target.name.value });
      e.target.name.value = "";
    },
    [createBoard]
  );

  return (
    <div className={styles.boards}>
      {boards.map(({ sortableId, boardId }, index) => (
        <Sortable
          className={styles.board}
          group="note"
          key={sortableId}
          data={boardId}
          onDropReceived={(movedBoardId) => onDropReceived(movedBoardId, index)}
          onDropped={() => onDropped(sortableId)}
        >
          <BoardCard id={boardId} />
        </Sortable>
      ))}
      <Sortable
        className={styles.boardLast}
        draggable={false}
        group="note"
        onDropReceived={(movedBoardId) =>
          onDropReceived(movedBoardId, boards.length)
        }
      ></Sortable>
      <form onSubmit={handleSubmit}>
        <input required minLength="1" name="name" placeholder="name" />
        <input type="submit" value="Add Board" />
      </form>
    </div>
  );
};

export default Boards;

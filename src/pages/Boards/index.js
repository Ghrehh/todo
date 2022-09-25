import { useCallback } from "react";
import Sortable from "components/Sortable";
import { Link } from "react-router-dom";
import useBoards from "hooks/useBoards";

import styles from "./styles.module.css";

const Boards = () => {
  const {
    data: boards,
    create: createBoard,
    insertAtIndex: insertBoardAtIndex,
    remove: removeBoard,
  } = useBoards();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      createBoard({ name: e.target.name.value});
      e.target.name.value = "";
    },
    [createBoard]
  );

  return (
    <div className={styles.boards}>
      {boards.map((board, index) => (
        <Sortable
          className={styles.board}
          group="note"
          key={board.id + board.iteration}
          data={board}
          onDropReceived={(movedBoard) => insertBoardAtIndex(movedBoard, index)}
          onDropped={() => removeBoard(board)}
        >
          <Link className={styles.boardLink} to={`boards/${board.id}`}>
            <p className={styles.sortableOne}>{board.name}</p>
          </Link>
        </Sortable>
      ))}
      <Sortable
        className={styles.boardLast}
        draggable={false}
        group="note"
        data={[]}
        onDropReceived={(movedBoard) =>
          insertBoardAtIndex(movedBoard, boards.length)
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

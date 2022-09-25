import Sortable from "components/Sortable";
import { Link } from 'react-router-dom';
import useBoards from "hooks/useBoards";

import styles from "./styles.module.css";

const Boards = () => {
  const {
    data: boards,
    create: createBoard,
    insertAtIndex: insertBoardAtIndex,
    update: updateBoard,
    remove: removeBoard,
  } = useBoards();

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
    </div>
  );
};

export default Boards;

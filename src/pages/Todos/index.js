import Sortable from "components/Sortable";
import useBoards from "hooks/useBoards";

import styles from "./styles.module.css";

const Todos = () => {
  const {
    data: boards,
    create: createBoard,
    insertAtIndex: insertBoardAtIndex,
    update: updateBoard,
    remove: removeBoard,
  } = useBoards();

  console.log(boards);

  return (
    <>
      <div className={styles.sortableOneContainer}>
        {boards.map((board, index) => (
          <Sortable
            group="note"
            key={board.id + board.iteration}
            data={board}
            onDropReceived={(movedBoard) =>
              insertBoardAtIndex(movedBoard, index)
            }
            onDropped={() => removeBoard(board)}
          >
            <p
              className={styles.sortableOne}
            >
              {board.name}
            </p>
          </Sortable>
        ))}
      </div>
    </>
  );
};

export default Todos;

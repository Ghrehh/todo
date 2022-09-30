import { useCallback } from "react";
import { useParams } from "react-router-dom";

import useBoard from "hooks/useBoard";
import Sortable from "components/Sortable";

import useSortCategories from "./useSortCategories";
import useCreateCategory from "./useCreateCategory";
import Category from "./Category";

import styles from "./styles.module.css";

const BoardPage = () => {
  const { boardId } = useParams();
  const [{ name, categories }] = useBoard(boardId);
  const { onDropReceived, onDropped } = useSortCategories(boardId);
  const createCategory = useCreateCategory(boardId);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      createCategory({ name: e.target.name.value });
      e.target.name.value = "";
    },
    [createCategory]
  );

  return (
    <div className={styles.boardPage}>
      <h1>{name}</h1>
      <div className={styles.categories}>
        <div className={styles.categoriesScroller}>
          {categories.map(({ sortableId, categoryId }, index) => (
            <Sortable
              className={styles.category}
              group="catgories"
              key={sortableId}
              data={boardId}
              onDropReceived={(movedBoardId) =>
                onDropReceived(movedBoardId, index)
              }
              onDropped={() => onDropped(sortableId)}
            >
              <Category id={categoryId} />
            </Sortable>
          ))}
          <form onSubmit={handleSubmit}>
            <input required minLength="1" name="name" placeholder="name" />
            <input type="submit" value="Add Category" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default BoardPage;

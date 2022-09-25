import { useState } from "react";

import Sortable from "components/Sortable";
import useBoards from "hooks/useBoards";

import styles from "./styles.module.css";

const insertSortableAtIndex = (array, newSortableData, index) => {
  const newArray = [...array];
  newArray.splice(index, 0, {
    sortableId: crypto.randomUUID(),
    data: newSortableData,
  });

  return newArray;
};

const removeSortableById = (array, sortableIdToRemove) => {
  const newArray = [...array];
  const sortableToRemoveIndex = newArray.findIndex(
    ({ sortableId }) => sortableId === sortableIdToRemove
  );

  if (sortableToRemoveIndex === -1) {
    throw new Error("could not find sortable to remove");
  }

  newArray.splice(sortableToRemoveIndex, 1);

  return newArray;
};

const Foo = () => {
  const [dataOne, setDataOne] = useState([
    {
      sortableId: crypto.randomUUID(),
      data: { name: "first", color: "lavender" },
    },
    {
      sortableId: crypto.randomUUID(),
      data: { name: "second", color: "blue" },
    },
    {
      sortableId: crypto.randomUUID(),
      data: { name: "third", color: "green" },
    },
    {
      sortableId: crypto.randomUUID(),
      data: { name: "fourth", color: "yellow" },
    },
  ]);

  const [dataTwo, setDataTwo] = useState([
    {
      sortableId: crypto.randomUUID(),
      data: { name: "fifth", color: "orange" },
    },
    {
      sortableId: crypto.randomUUID(),
      data: { name: "sixth", color: "beige" },
    },
    {
      sortableId: crypto.randomUUID(),
      data: { name: "seventh", color: "indigo" },
    },
    {
      sortableId: crypto.randomUUID(),
      data: { name: "eighth", color: "violet" },
    },
  ]);

  const {
    data: boards,
    create: createBoard,
    update: updateBoard,
    remove: removeBoard,
  } = useBoards();
  console.log(boards);

  return (
    <>
      <button onClick={() => createBoard({ name: "a cool name"}) }>foo</button>
      <div className={styles.sortableOneContainer}>
        {dataOne.map(({ sortableId, data }, index) => (
          <Sortable
            group="note"
            key={sortableId}
            data={data}
            onDropReceived={(newSortable) =>
              setDataOne(insertSortableAtIndex(dataOne, newSortable, index))
            }
            onDropped={() =>
              setDataOne(removeSortableById(dataOne, sortableId))
            }
          >
            <p
              style={{ backgroundColor: data.color }}
              className={styles.sortableOne}
            >
              {data.name}
            </p>
          </Sortable>
        ))}
      </div>

      <div className={styles.sortableTwoContainer}>
        {dataTwo.map(({ sortableId, data }, index) => (
          <Sortable
            group="note"
            key={sortableId}
            data={data}
            onDropReceived={(newSortable) =>
              setDataTwo(insertSortableAtIndex(dataTwo, newSortable, index))
            }
            onDropped={() =>
              setDataTwo(removeSortableById(dataTwo, sortableId))
            }
          >
            <p
              style={{ backgroundColor: data.color }}
              className={styles.sortableOne}
            >
              {data.name}
            </p>
          </Sortable>
        ))}
      </div>
    </>
  );
};

export default Foo;

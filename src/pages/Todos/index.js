import { useState, useEffect, useCallback, useMemo } from "react";
import styles from "./styles.module.css";

const Sortable = ({ group, onDropReceived, onDropped, data, children }) => {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData(`draggable/${group}`, JSON.stringify(data));
        e.dataTransfer.effectAllowed = "move";
      }}
      onDragOver={(e) => {
        const isSortable = e.dataTransfer.types.includes(`draggable/${group}`);
        if (isSortable) e.dataTransfer.dropEffect = "move";

        e.preventDefault();
      }}
      onDrop={(e) => {
        const isSortable = e.dataTransfer.types.includes(`draggable/${group}`);

        if (isSortable) {
          const data = e.dataTransfer.getData(`draggable/${group}`);
          console.log(data);
          const parsedData = JSON.parse(data);
          onDropReceived(parsedData);
        }

        e.preventDefault();
      }}
      onDragEnd={(e) => {
        if (e.dataTransfer.dropEffect === "move") onDropped();
      }}
      className={styles.sortable}
    >
      {children}
    </div>
  );
};

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

  return (
    <>
      <div className={styles.sortableOneContainer}>
        {dataOne.map(({ sortableId, data }, index) => (
          <Sortable
            group="note"
            key={sortableId}
            data={data}
            onDropReceived={(newSortable) => {
              console.log('drop rec', dataOne, newSortable, index);
              setDataOne(insertSortableAtIndex(dataOne, newSortable, index))
            }}
            onDropped={() => {
              console.log('dropping', dataOne, sortableId);
              setDataOne(removeSortableById(dataOne, sortableId))
            }}
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
            onDropReceived={(newSortable) => {
              console.log('drop rec', dataTwo, newSortable, index);
              setDataTwo(insertSortableAtIndex(dataTwo, newSortable, index))
            }}
            onDropped={() => {
              console.log('dropping', dataTwo, sortableId);
              setDataTwo(removeSortableById(dataTwo, sortableId))
            }}
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

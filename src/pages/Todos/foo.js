const Sortable = ({
  index,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  children,
  dragging,
  selected,
}) => {
  return (
    <div
      draggable
      sortable-index={index}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      className={`${styles.sortable} ${dragging && styles.dragging} ${
        selected && styles.selected
      }`}
    >
      {children}
    </div>
  );
};

const arrayMove = (array, oldIndex, newIndex) => {
  const arrayDuplicate = [...array];
  const element = arrayDuplicate[oldIndex];
  arrayDuplicate.splice(oldIndex, 1);
  arrayDuplicate.splice(newIndex, 0, element);

  return arrayDuplicate;
};

const useSortable = (data, onChange) => {
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [targetIndex, setTargetIndex] = useState(null);

  const onDragStart = useCallback(
    (e) => {
      const draggingIndex = e.target.getAttribute("sortable-index");
      setDraggingIndex(draggingIndex);
    },
    [setDraggingIndex]
  );

  const onDragOver = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (draggingIndex === null) return;

      const targetIndex = e.target.getAttribute("sortable-index");
      setTargetIndex(targetIndex);
    },
    [setTargetIndex, draggingIndex]
  );

  const onDrop = useCallback(
    (e) => {
      const sortedData =
        draggingIndex === null || targetIndex === null
          ? data
          : arrayMove(data, draggingIndex, targetIndex);
      onChange(sortedData);
    },
    [data, draggingIndex, targetIndex, onChange]
  );

  const onDragEnd = useCallback(
    (e) => {
      setDraggingIndex(null);
      setTargetIndex(null);
    },
    [setDraggingIndex, setTargetIndex]
  );

  return useMemo(() => {
    const sortedData =
      draggingIndex === null || targetIndex === null
        ? data
        : arrayMove(data, draggingIndex, targetIndex);

    return sortedData.map((datum, index) => ({
      sortableProps: {
        dragging: !!draggingIndex,
        selected: targetIndex === index.toString(),
        index,
        onDragStart,
        onDragOver,
        onDrop,
        onDragEnd,
      },
      data: datum,
    }));
  }, [
    data,
    draggingIndex,
    targetIndex,
    onDragStart,
    onDragOver,
    onDrop,
    onDragEnd,
  ]);
};

import PropTypes from "prop-types";

const Sortable = ({
  group,
  draggable,
  onDropReceived,
  onDropped,
  data,
  ...restProps
}) => {
  if (draggable) {
    if (!data || !onDropped) {
      throw new Error("missing required props data or onDropped");
    }
  }

  return (
    <div
      {...restProps}
      draggable={draggable}
      onDragStart={(e) => {
        e.stopPropagation();
        e.dataTransfer.setData(`draggable/${group}`, JSON.stringify(data));
        e.dataTransfer.effectAllowed = "move";
      }}
      onDragOver={(e) => {
        e.stopPropagation();
        const isSortable = e.dataTransfer.types.includes(`draggable/${group}`);

        if (isSortable) {
          e.dataTransfer.dropEffect = "move";
        } else {
          e.dataTransfer.dropEffect = "none";
        }

        e.preventDefault();
      }}
      onDrop={(e) => {
        e.stopPropagation();
        const isSortable = e.dataTransfer.types.includes(`draggable/${group}`);

        if (isSortable) {
          const data = e.dataTransfer.getData(`draggable/${group}`);
          const parsedData = JSON.parse(data);
          onDropReceived(parsedData);
        }

        e.preventDefault();
      }}
      onDragEnd={(e) => {
        e.stopPropagation();
        if (e.dataTransfer.dropEffect === "move") onDropped();
      }}
    />
  );
};

Sortable.propTypes = {
  group: PropTypes.string.isRequired,
  onDropReceived: PropTypes.func.isRequired,
  onDropped: PropTypes.func,
  data: PropTypes.any,
  draggable: PropTypes.bool,
};

Sortable.defaultProps = {
  draggable: true,
};

export default Sortable;

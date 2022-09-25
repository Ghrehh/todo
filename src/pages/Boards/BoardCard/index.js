import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import useBoard from "hooks/useBoard";

import styles from "./styles.module.css";

const BoardCard = ({ id }) => {
  const [{ name }] = useBoard(id);

  return (
    <Link className={styles.boardLink} to={`boards/${id}`}>
      <p className={styles.sortableOne}>{name}</p>
    </Link>
  );
};

BoardCard.propTypes = {
  id: PropTypes.string.isRequired,
};

export default BoardCard;

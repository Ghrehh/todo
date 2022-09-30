import useCategory from './useCategory';
import styles from "./styles.module.css";

const Category = ({ id }) => {
  const [{ name, todos }] = useCategory(id);

  return <div className={styles.category}>
    <h1>{name}</h1>
    </div>;
};

export default Category;

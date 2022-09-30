import useLocalStorage from "hooks/useLocalStorage";

const useCategory = (id) => {
  const [category, setCategory] = useLocalStorage(`category-${id}`);

  if (category === null) throw new Error("cannot find category");

  return [category, setCategory];
};

export default useCategory;

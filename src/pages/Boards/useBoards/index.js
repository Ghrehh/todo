import useLocalStorage from "hooks/useLocalStorage";

const useBoards = () => {
  return useLocalStorage("boards", []);
};

export default useBoards;

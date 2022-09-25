import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Todos = lazy(() => import("pages/Todos"));
const Todo = lazy(() => import("pages/Todo"));
const Boards = lazy(() => import("pages/Boards"));

const Pages = () => {
  return (
    <BrowserRouter basename={process.env.REACT_APP_BASE_PATH}>
      <Suspense fallback={"loading..."}>
        <Routes>
          <Route path="/todo" element={<Todos />} />
          <Route exact path="/todo/:todoId" element={<Todo />} />
          <Route path="/" element={<Boards />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Pages;

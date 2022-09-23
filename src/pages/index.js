import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Todos = lazy(() => import("pages/Todos"));
const Todo = lazy(() => import("pages/Todo"));

const Pages = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={"loading..."}>
        <Routes>
          <Route exact path="/todo" element={<Todo />} />
          <Route path="/" element={<Todos />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Pages;

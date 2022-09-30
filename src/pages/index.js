import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const BoardsPage = lazy(() => import("pages/Boards"));
const BoardPage = lazy(() => import("pages/Board"));

const Pages = () => {
  return (
    <BrowserRouter basename={process.env.REACT_APP_BASE_PATH}>
      <Suspense fallback={"loading..."}>
        <Routes>
          <Route exact path="/boards/:boardId" element={<BoardPage />} />
          <Route path="/" element={<BoardsPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Pages;

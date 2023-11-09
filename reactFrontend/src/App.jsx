import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Nav } from "./components/Nav";
import { Home } from "./pages/Home";
import { useState, createContext } from "react";
import { Todo } from "./pages/Todo";
import { Post } from "./pages/Post";
import { ModalForm } from "./components/ModalForm";
import { Edit } from "./pages/Edit";

export const LoginContext = createContext();
const queryClient = new QueryClient();

function App() {
  const [show, setShow] = useState(false);
  const [reg, setReg] = useState(false);
  const [auth, setAuth] = useState(false);
  return (
    <div className="App ">
      <QueryClientProvider client={queryClient}>
        <LoginContext.Provider
          value={{ show, setShow, reg, setReg, auth, setAuth }}
        >
          <Router>
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/todo" element={<Todo />} />
              <Route path="/post" element={<Post />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="*" element={<div>No page found!</div>} />
            </Routes>
          </Router>
          <ModalForm />
        </LoginContext.Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;

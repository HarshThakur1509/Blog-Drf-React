import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const Todo = () => {
  const [task, setTask] = useState("");
  const queryClient = useQueryClient();

  const retrieveTodos = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/v1/todo/", {
      headers: {
        Authorization: localStorage.getItem("authKey"),
      },
    });

    return response.data;
  };
  const postTodos = async (task) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/todo/",
        { task },
        {
          headers: {
            Authorization: localStorage.getItem("authKey"),
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        // Successful POST request
        return response.data;
      } else {
        // Handle error based on status code
        throw new Error(`API error: ${response.status}`);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error(error);
      throw error;
    }
  };

  const deleteTodos = async (id) => {
    const response = await axios.delete(
      `http://127.0.0.1:8000/api/v1/todo/${id}/`,
      {
        headers: {
          Authorization: localStorage.getItem("authKey"),
        },
      }
    );

    return response.data;
  };

  const { mutateAsync: addTodoMutation } = useMutation({
    mutationFn: postTodos,
    onSuccess: () => {
      queryClient.invalidateQueries(["Todos"]);
    },
  });

  const { mutateAsync: deleteTodoMutation } = useMutation({
    mutationFn: deleteTodos,
    onSuccess: () => {
      queryClient.invalidateQueries(["Todos"]);
    },
  });

  const {
    data: todos,
    error,
    isLoading,
  } = useQuery({
    queryFn: async () => await retrieveTodos(),
    queryKey: ["Todos"],
  });

  if (isLoading) return <div className="Todo">Fetching todos...</div>;
  if (error)
    return <div className="Todo">An error occurred: {error.message}</div>;

  return (
    <div className="Todo">
      <div className="addTask">
        <input
          type="text"
          placeholder="Add a task..."
          onChange={(e) => setTask(e.target.value)}
          value={task}
        />
        <button
          type="submit"
          className="btn1"
          onClick={async () => {
            try {
              await addTodoMutation(task);
              setTask("");
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Add
        </button>
      </div>

      <div className="todoItems ">
        {todos.map((todo) => (
          <div key={todo.id} className="todoItem h-12 relative">
            {todo.task}
            <button
              className="absolute top-2 right-2 cursor-pointer"
              onClick={async () => {
                try {
                  await deleteTodoMutation(todo.id);
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

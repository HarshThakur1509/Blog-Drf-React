import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export const EditForm = ({ post, id }) => {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  const putPost = async ({ title, body }) => {
    const response = await axios.put(
      `http://127.0.0.1:8000/api/v1/${id}/`,
      { title, body },
      {
        headers: {
          Authorization: localStorage.getItem("authKey"),
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  };

  const { mutateAsync: putMutation } = useMutation({
    mutationFn: putPost,
    onSuccess: () => {
      window.location.href = "/";
    },
  });

  const deletePost = async () => {
    const response = await axios.delete(`http://127.0.0.1:8000/api/v1/${id}/`, {
      headers: {
        Authorization: localStorage.getItem("authKey"),
      },
    });

    return response.data;
  };

  const { mutateAsync: deletePostMutation } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      window.location.href = "/";
    },
  });

  return (
    <div className="Post">
      <input
        type="text"
        placeholder="Add a title..."
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <textarea
        cols="50"
        rows="5"
        placeholder="Write your post..."
        onChange={(e) => setBody(e.target.value)}
        value={body}
      ></textarea>
      <button
        type="submit"
        className="btn3"
        onClick={async () => {
          try {
            await putMutation({ title, body });
          } catch (error) {
            console.log(error);
          }
        }}
      >
        Post
      </button>
      <button
        className="btn2 relative top-2 right-2 cursor-pointer"
        onClick={async () => {
          try {
            await deletePostMutation();
          } catch (error) {
            console.log(error);
          }
        }}
      >
        Delete
      </button>
    </div>
  );
};

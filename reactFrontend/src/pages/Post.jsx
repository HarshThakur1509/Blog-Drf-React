import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";

export const Post = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const postPosts = async ({ title, body }) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/",
        { title, body },
        {
          headers: {
            Authorization: localStorage.getItem("authKey"),
            "Content-Type": "application/json",
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

  const { mutateAsync: addPostMutation } = useMutation({
    mutationFn: postPosts,
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
            await addPostMutation({ title, body });
            setTitle("");
            setBody("");
          } catch (error) {
            console.log(error);
          }
        }}
      >
        Post
      </button>
    </div>
  );
};

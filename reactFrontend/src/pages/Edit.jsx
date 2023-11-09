import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { EditForm } from "../components/EditForm";

export const Edit = () => {
  const id = useParams().id;

  const retrievePost = async () => {
    const response = await axios.get(`http://127.0.0.1:8000/api/v1/${id}/`, {
      headers: {
        Authorization: localStorage.getItem("authKey"),
      },
    });

    return response.data;
  };

  const {
    data: post,
    error,
    isLoading,
  } = useQuery({
    queryFn: async () => await retrievePost(),
    queryKey: ["Post"],
  });

  if (isLoading) return <div className="Todo">Fetching posts...</div>;
  if (error)
    return <div className="Todo">An error occurred: {error.message}</div>;

  return <EditForm post={post} id={id} />;
};

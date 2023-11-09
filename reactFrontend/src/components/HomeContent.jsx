import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const EditUrl = ({ post }) => {
  const authId = localStorage.getItem("userDetails")[6];
  const url = `/edit/${post.id}`;
  if (authId == post.author.id) {
    return (
      <Link to={url}>
        <div className="text-lg hover:underline">{post.title}</div>
      </Link>
    );
  }
  return <div className="text-lg hover:underline">{post.title}</div>;
};

export const HomeContent = () => {
  const retrievePosts = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/v1/", {
      headers: {
        Authorization: localStorage.getItem("authKey"),
      },
    });

    return response.data;
  };

  const {
    data: posts,
    error,
    isLoading,
  } = useQuery({
    queryFn: async () => await retrievePosts(),
    queryKey: ["Posts"],
  });

  if (isLoading) return <div className="Todo">Fetching posts...</div>;
  if (error)
    return <div className="Todo">An error occurred: {error.message}</div>;

  return (
    <div className="HomeContent mt-6">
      {posts.map((post) => {
        return (
          <div
            key={post.id}
            className="HomeContentList  w-5/6 h-28 pt-2 pl-5 relative"
          >
            {/* <Link to={editUrl(post.id)}>
              <div className="text-lg hover:underline">{post.title}</div>
            </Link> */}
            <EditUrl post={post} />
            <div className="absolute top-2 right-5">{post.author.username}</div>
            <div>{post.body}</div>
          </div>
        );
      })}
    </div>
  );
};

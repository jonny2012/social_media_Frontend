import { FormEventHandler, useState } from "react";
import { useUpdatePostLikesMutation } from "./redux/RTKqueries/userQueries";
import {
  useCreatePostCommentsMutation,
  useGetAllPostCommentsQuery,
} from "./redux/RTKqueries/postQueries";

export const Post = ({ postData }: any) => {
  const [isLiked, setIsLiked] = useState(true);
  const [inputValue, setInputValue] = useState<string>("");
  const [postId, setPostId] = useState<string>();
  const [updatePostLikes, { data, isLoading: newData }] =
    useUpdatePostLikesMutation();

  const [createComment, { data: commentData, error, isLoading }] =
    useCreatePostCommentsMutation();

  if (isLoading) return <div>...Loading</div>;
  const handleSubmit: FormEventHandler<HTMLButtonElement> = async (e) => {
    setPostId(postData._id);
    if (inputValue.trim()) {
      await createComment({
        userId: postData.userId,
        postId: postData._id,
        comment: inputValue,
      });
      setInputValue("");
    }
    console.log(postData);
  };
  const rest = {
    userId: "672c070d5872d1dab5fc56d1",
  };

  return (
    <div style={{ border: "1px solid black", padding: "20px" }}>
      <img
        style={{ width: "100px", height: "100px" }}
        src={`http://localhost:5000/posts/${postData.image}`}
        alt={postData.image}
      />
      <p>likes: {postData.likes.length}</p>
      <button
        style={{ color: "red" }}
        onClick={(e) => {
          updatePostLikes({ postId: postData._id, rest });
          console.log(e.target);
        }}
      >
        {postData._id} {isLiked ? "Like" : "Dislike"}
      </button>
      <p>comments: {postData.comments.length}</p>
      <div>
        {postData?.comments.map((el: any) => (
          <div key={el._id}>
            <p>comment {el.comment}</p>
            <p>user: {el.userId.username}</p>
          </div>
        ))}
        {/* <div>
          {commentData &&
            commentData?.map((element: any) => (
              <div key={element._id}>
                <p>comment {element.comment}</p>
                <p>user: {element.userId.username}</p>
              </div>
            ))}
        </div> */}
      </div>
      <div>
        {" "}
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
          placeholder=" type Comment"
        />
        <button onClick={handleSubmit}> Send</button>
      </div>
    </div>
  );
};

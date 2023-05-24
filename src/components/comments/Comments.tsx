import { useQuery, useMutation } from "@tanstack/react-query";
import { getCommentsByPostId, uploadComment } from "../../api";
import { Button } from "../ui/Button";
import { type FormEvent, useState, useContext } from "react";
import { UserContext } from "../../context/userContext";

import { List } from "../generics/List";
import { TComment } from "../../types/TComment";

import { SignIn } from "../modals/SignIn";
import { SignUp } from "../modals/SignUp";

import { Comment } from "./Comment";

interface CommentsProps {
  id: number;
}

export const Comments = ({ id }: CommentsProps) => {
  const [commentBody, setCommentBody] = useState<string>("");
  const { isLoggedIn } = useContext(UserContext);
  const [orderedComments, setOrderedComments] = useState<
    {
      parent: TComment;
      children: TComment[];
    }[]
  >();

  const [reply, setReply] = useState<string>("");

  const orderComments = (comments: TComment[]) => {
    let parentChild = [];

    for (const comment of comments) {
      if (!comment.parent_id) {
        let children = comments.filter((c) => c.parent_id === comment.id);
        parentChild.push({ parent: comment, children });
      }
    }

    return parentChild;
  };

  const { data, refetch } = useQuery({
    queryKey: ["posts", "id", "comments"],
    queryFn: async () => await getCommentsByPostId(id),
    onSuccess(data) {
      console.log(data);

      setOrderedComments(orderComments(data));
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (payload: { body: string; parent_id: number | null }) =>
      await uploadComment(id, payload),

    onSuccess(data) {
      console.log(data);
      refetch();
    },
  });

  const onSubmitHandler = (e: FormEvent, parentId: number | null) => {
    e.preventDefault();
    mutate({ body: commentBody, parent_id: parentId });
    setCommentBody("");
    setReply("");
  };

  const submitReply = (data: { body: string; parentId: number | null }) => {
    mutate({ body: data.body, parent_id: data.parentId });
  };

  return (
    <section className="max-w-prose">
      <h5 className="mb-5 text-xl">Comment section</h5>
      {isLoggedIn ? (
        <form
          className="relative mb-5"
          onSubmit={(e) => onSubmitHandler(e, null)}
        >
          <textarea
            name=""
            id=""
            rows={3}
            className="form-textarea w-full resize-none pb-10"
            placeholder="write something nice!"
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
          />

          <Button className="absolute bottom-4 right-2">upload</Button>
        </form>
      ) : (
        <div>
          <p>You need to have an account if you want to comment this post</p>
        </div>
      )}

      {data && orderedComments ? (
        <List
          items={orderedComments}
          keyExtractor={({ parent }) => `${parent.body}|${parent.created_at}`}
          renderItem={(ordered) => (
            <div>
              <Comment
                comment={ordered.parent}
                setCommentBody={setReply}
                commentBody={reply}
                setReply={setReply}
                submit={submitReply}
              />
              <div className="pl-7">
                <List
                  items={ordered.children}
                  keyExtractor={(child) => child.body}
                  renderItem={(child) => (
                    <Comment
                      comment={child}
                      setCommentBody={setReply}
                      commentBody={reply}
                      setReply={setReply}
                      submit={submitReply}
                    />
                  )}
                />
              </div>
            </div>
          )}
        />
      ) : (
        <div>
          <p>Looks like this post has no comments. Be the first!</p>
        </div>
      )}
    </section>
  );
};

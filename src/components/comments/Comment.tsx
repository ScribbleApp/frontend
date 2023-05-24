import { TComment } from "../../types/TComment";
import { useState } from "react";
import moment from "moment";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";
interface CommentProps {
  comment: TComment;
  setReply: React.Dispatch<React.SetStateAction<string>>;

  setCommentBody: React.Dispatch<React.SetStateAction<string>>;
  commentBody: string;

  submit: (data: { body: string; parentId: number | null }) => void;
}

export const Comment = ({ comment, commentBody, submit }: CommentProps) => {
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [reply, setReply] = useState<string>("");

  return (
    <>
      <div className="mb-3 bg-neutral-100 p-2">
        <div className="flex items-center space-x-2">
          <Link
            to={"/users/" + comment.user.id}
            className="text-sm font-medium text-indigo-500 hover:text-indigo-600"
          >
            {comment.user.email}
          </Link>
          <span className="text-sm font-medium text-neutral-400">•</span>
          <time className="text-sm text-neutral-500">
            {moment(comment.created_at).format("ll").toLocaleLowerCase()}
          </time>
        </div>
        <div className="relative">
          <p className="pb-5">{comment.body}</p>
          <Button
            intent={"secondary"}
            padding={"none"}
            className="absolute bottom-1 right-1"
            onClick={() => setIsReplying((curr) => !curr)}
          >
            {isReplying ? "cancel" : "reply"}
          </Button>
        </div>
      </div>
      {isReplying && (
        <div className="relative">
          <textarea
            name=""
            id=""
            rows={3}
            className="form-textarea w-full resize-none pb-10"
            placeholder="write something nice!"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
          <Button
            className="absolute bottom-4 right-2"
            intent={"secondary"}
            padding={"none"}
            onClick={() => {
              submit({ body: reply, parentId: comment.id });
              setIsReplying(false);
            }}
          >
            answer
          </Button>
        </div>
      )}
    </>
  );
};

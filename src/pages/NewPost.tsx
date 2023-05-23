import { TiptapEditor } from "../components/tiptap/TiptapEditor";
import { useMutation } from "@tanstack/react-query";
import { TPostPayload } from "../types/TPostPayload";

import { type FormEvent, useState, useContext } from "react";
import { createNewPost } from "../api";

import { UserContext } from "../context/userContext";
import { Button } from "../components/ui/Button";

interface NewPostProps {}

export const NewPost = ({}: NewPostProps) => {
  const { isLoggedIn } = useContext(UserContext);

  const { isLoading, mutate } = useMutation({
    mutationFn: async (newPost: TPostPayload) => await createNewPost(newPost),
    onSuccess(data) {
      console.log(data);
    },
  });

  const [postTitle, setPostTitle] = useState<string>("");
  const [postExcerpt, setPostExcerpt] = useState<string>("");
  const [postContent, setPostContent] = useState<string>("");

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn) return;

    const newPost = {
      title: postTitle,
      excerpt: postExcerpt,
      content: postContent,
    };

    mutate(newPost);
  };

  return (
    <section className="prose flex w-full flex-col items-center py-10">
      <h1>Create New Post!</h1>
      <form className="w-full" onSubmit={onSubmitHandler}>
        <input
          type="text"
          placeholder="come up with some cool title!"
          className="mb-5 w-full border-b border-neutral-500 p-5 text-center text-2xl font-medium outline-none"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="add except to your title!"
          className="mb-5 w-full border-b border-neutral-500 p-5 text-center text-xl font-medium outline-none"
          value={postExcerpt}
          onChange={(e) => setPostExcerpt(e.target.value)}
        />
        <TiptapEditor setContent={setPostContent} />

        <Button>{isLoading ? "..." : "create"}</Button>
      </form>
    </section>
  );
};
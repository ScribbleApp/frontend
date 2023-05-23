import { TiptapEditor } from "../components/tiptap/TiptapEditor";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TPostPayload } from "../types/TPostPayload";

import { type FormEvent, useState, useContext, ChangeEvent } from "react";
import { createNewPost } from "../api";
import { getAllCategories } from "../api";

import { List } from "../components/generics/List";

import { UserContext } from "../context/userContext";
import { Button } from "../components/ui/Button";

interface NewPostProps {}

export const NewPost = ({}: NewPostProps) => {
  const { isLoggedIn } = useContext(UserContext);

  const { data } = useQuery({
    queryKey: ["posts", "categories"],
    queryFn: async () => await getAllCategories(),
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: async (newPost: TPostPayload) => await createNewPost(newPost),
    onSuccess(data) {
      console.log(data);
    },
  });

  const [postTitle, setPostTitle] = useState<string>("");
  const [postExcerpt, setPostExcerpt] = useState<string>("");
  const [postContent, setPostContent] = useState<string>("");
  const [postCategories, setPostCategories] = useState<number[]>([]);

  const [postCoverImage, setPostCoverImage] = useState<File>();

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    const submitData = new FormData();
    submitData.append("post[image]", postCoverImage!);
    console.log(submitData);

    return;
    if (!isLoggedIn) return;

    const newPost = {
      title: postTitle,
      excerpt: postExcerpt,
      content: postContent,
      categories: postCategories,
      image: postCoverImage,
    };

    console.log(newPost);

    mutate(newPost);
  };

  const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      let updCategories = [...postCategories];
      updCategories.push(+e.target.value);
      let unique = new Set(updCategories);
      updCategories = Array.from(unique);

      setPostCategories(updCategories);
    } else {
      let updCategories = [...postCategories];
      updCategories = updCategories.filter((c) => c !== +e.target.value);
      setPostCategories(updCategories);
    }

    console.log(postCategories);
  };

  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPostCoverImage(e.target.files[0]);
    }
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

        {data && (
          <>
            <h5>Choose categories for your post!</h5>
            <List
              items={data}
              keyExtractor={({ name }) => name}
              renderItem={({ name, id }) => (
                <div className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    value={id}
                    onChange={onChangeCheckbox}
                  />
                  <label htmlFor={name}>{name}</label>
                </div>
              )}
              className="flex list-none items-center space-x-5 p-0 prose-li:p-0"
            />
          </>
        )}

        <div className="mb-10 flex flex-col space-y-4">
          <label htmlFor="coverImage">Add an Image to Your Post!</label>
          <input
            type="file"
            name="coverImage"
            id="coverImage"
            className="file:mr-5 file:cursor-pointer file:rounded-md file:border-dashed file:border-neutral-500 file:bg-transparent file:px-4 file:py-2 file:text-neutral-700"
            onChange={uploadImage}
          />
        </div>

        <Button>{isLoading ? "..." : "create"}</Button>
      </form>
    </section>
  );
};

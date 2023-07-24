import React from 'react';
import { useQuery } from 'react-query';

const fetcher = (url) => fetch(url).then((res) => res.json());

const Post = ({ postID, clearPostID }) => {
  const { data, isLoading } = useQuery(
    ['post', postID],
    () => fetcher(`https://jsonplaceholder.typicode.com/posts/${postID}`),
    {
      staleTime: 10000,
      cacheTime: 5000,
    }
  );

  if (isLoading) {
    return <h2>Post Loading...</h2>;
  }

  return (
    <>
      <a onClick={clearPostID} href="#">
        go Back
      </a>
      <div>
        <h1>{data.id}</h1>
        <p>{data.title}</p>
        <p>{data.body}</p>
      </div>
    </>
  );
};

export default Post;

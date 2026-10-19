import { Reveal } from "@awesome-reveal/react";

export const Posts = ({ posts }) => (
  <ul>
    {posts.map((post) => (
      <Reveal as="li" key={post.id}>
        {post.title}
      </Reveal>
    ))}
  </ul>
);

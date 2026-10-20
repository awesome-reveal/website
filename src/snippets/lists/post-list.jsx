import { Reveal } from "@awesome-reveal/react";

export function PostList({ posts }) {
  return (
    <ul className="posts">
      {posts.map((post) => (
        <Reveal as="li" key={post.id}>
          {post.title}
        </Reveal>
      ))}
    </ul>
  );
}

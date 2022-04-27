import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

const Axios: NextPage = () => {
  const url = "https://jsonplaceholder.typicode.com/posts/";

  const [posts, setPosts] = useState([] as any[]);

  useEffect(() => {
    axios.get(url).then((res) => {
      console.log(res.data);
      setPosts(res.data);
    });
  }, []);

  return (
    <>
      <div id="menu" className="container mx-auto px-4 lg:pt-24 lg:pb-64">
        <div className="flex flex-wrap mt-12 justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 gap-4">
            {posts.map((post) => (
              <>
                <div className="col-span-2 sm:col-span-1 xl:col-span-1"></div>
                <div className="col-span-2 sm:col-span-4 xl:col-span-4">
                  <h3 className="font-semibold text-black">{post.title}</h3>
                  <p>{post.body}</p>
                </div>
                <div className="col-span-2 sm:col-span-1 xl:col-span-1 italic ">
                  {post.id}
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Axios;

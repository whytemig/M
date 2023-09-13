import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SinglePost } from "./SinglePost";

const Post = () => {
	const [posts, setPosts] = useState([]);

	const token = useSelector((state) => state.auth.token);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await fetch(
					`http://localhost:5500/post/timestatus/posts`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const data = await response.json();
				//  console.log(data);
				setPosts(data);
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchPosts();
	}, []);

	return (
		<div className="flex justify-center mx-auto">
			{/* <h1>post</h1> */}
			{posts.map((post) => {
				return <SinglePost key={post._id} post={post} />;
			})}
		</div>
	);
};
export default Post;

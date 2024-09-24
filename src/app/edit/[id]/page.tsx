"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PostForm from "@/components/form/PostForm";

const EditPage = ({ params }: { params: { id: string } }) => {
	const { id } = params;
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [categoryId, setCategoryId] = useState("");
	const router = useRouter();

	const fetchPosts = async (postId: string) => {
		try {
			const res = await axios.get(`/api/posts/${postId}`);
			setTitle(res.data.title);
			setContent(res.data.content);
			setCategoryId(res.data.categoryId);
		} catch (error) {
			console.log("error", error);
		}
	};

	useEffect(() => {
		if (id) {
			fetchPosts(id);
		}
	}, [id]);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			await axios.put(`/api/posts/${id}`, {
				title,
				content,
				categoryId,
			});
			router.push("/");
		} catch (error) {
			console.log("error", error);
		}
	};
	return (
		<>
			<Box sx={{ maxWidth: "80%", mx: "auto", py: 8 }}>
				<Typography variant="h2" component="h2" textAlign="center">
					Edit Post (ID : {id})
				</Typography>
			</Box>
			<Box sx={{ maxWidth: "80%", mx: "auto", py: 5 }}>
				<PostForm
					title={title}
					content={content}
					categoryId={categoryId}
					onChangeTitle={(event) => setTitle(event.target.value)}
					onChangeContent={(event) => setContent(event.target.value)}
					setCategory={setCategoryId}
					onSubmit={handleSubmit}
					buttonName="Update Post"
				/>
			</Box>
		</>
	);
};

export default EditPage;

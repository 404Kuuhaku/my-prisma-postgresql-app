"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PostForm from "@/components/form/PostForm";

const CreatePage = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [category, setCategory] = useState("");
	const router = useRouter();
	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			await axios.post("/api/posts", {
				title,
				content,
				category,
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
					Create a New Post
				</Typography>
			</Box>
			<Box sx={{ maxWidth: "80%", mx: "auto", py: 5 }}>
				<PostForm
					title={title}
					content={content}
					category={category}
					onChangeTitle={(event) => setTitle(event.target.value)}
					onChangeContent={(event) => setContent(event.target.value)}
					setCategory={setCategory}
					onSubmit={handleSubmit}
					buttonName="Creat new Post"
				/>
			</Box>
		</>
	);
};

export default CreatePage;

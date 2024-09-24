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
	const router = useRouter();

	const fetchPosts = async (postId: string) => {
		try {
			const res = await axios.get(`/api/posts/${postId}`);
			setTitle(res.data.title);
			setContent(res.data.content);
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
				{/* <form onSubmit={handleSubmit}>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							py: 2,
						}}
					>
						<TextField
							sx={{ width: "40%" }}
							id="Title"
							label="Title"
							variant="outlined"
							required
							value={title}
							onChange={(
								event: React.ChangeEvent<HTMLInputElement>
							) => {
								setTitle(event.target.value);
							}}
						/>
					</Box>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							py: 2,
						}}
					>
						<TextField
							sx={{ width: "40%" }}
							id="Content"
							label="Content"
							variant="outlined"
							value={content}
							onChange={(
								event: React.ChangeEvent<HTMLInputElement>
							) => {
								setContent(event.target.value);
							}}
						/>
					</Box>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							py: 2,
						}}
					>
						<Button
							sx={{ width: "40%" }}
							variant="contained"
							startIcon={<BackupIcon />}
							type="submit"
						>
							Update Post
						</Button>
					</Box>
				</form> */}
				<PostForm
					title={title}
					content={content}
					onChangeTitle={(event) => setTitle(event.target.value)}
					onChangeContent={(event) => setContent(event.target.value)}
					onSubmit={handleSubmit}
				/>
			</Box>
		</>
	);
};

export default EditPage;

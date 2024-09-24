"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import BackupIcon from "@mui/icons-material/Backup";

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
			<Typography>Edit Post (ID : {id})</Typography>
			<form onSubmit={handleSubmit}>
				<TextField
					id="Title"
					label="Title"
					variant="outlined"
					required
					value={title}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						setTitle(event.target.value);
					}}
				/>
				<TextField
					id="Content"
					label="Content"
					variant="outlined"
					value={content}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						setContent(event.target.value);
					}}
				/>
				<Button
					variant="contained"
					startIcon={<BackupIcon />}
					type="submit"
				>
					Update Post
				</Button>
			</form>
		</>
	);
};

export default EditPage;

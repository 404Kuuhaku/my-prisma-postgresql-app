"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const CreatePage = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const router = useRouter();
	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			await axios.post("/api/posts", {
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
			<Typography>Create a New Post</Typography>
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
					startIcon={<AddCircleIcon />}
					type="submit"
				>
					Submit
				</Button>
			</form>
		</>
	);
};

export default CreatePage;

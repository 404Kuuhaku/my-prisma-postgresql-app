"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface IPost {
	id: number;
	title: string;
}

const ListPage = () => {
	const [posts, setPosts] = useState<IPost[]>([]);
	const router = useRouter();

	const fetchPosts = async () => {
		try {
			const res = await axios.get("/api/posts");
			setPosts(res.data);
		} catch (error) {
			console.log("error", error);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	const deletePost = async (id: number) => {
		try {
			await axios.delete(`/api/posts/${id}`);
			fetchPosts();
		} catch (error) {
			console.log("Failed to delete the post", error);
		}
	};

	return (
		<>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Title</TableCell>
							<TableCell align="right">Edit</TableCell>
							<TableCell align="right">Delete</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{posts.map((post) => (
							<TableRow
								key={post.id}
								sx={{
									"&:last-child td, &:last-child th": {
										border: 0,
									},
								}}
							>
								<TableCell component="th" scope="row">
									{post.title}
								</TableCell>
								<TableCell align="right">
									<Button
										variant="outlined"
										startIcon={<EditIcon />}
										onClick={() =>
											router.push(`/edit/${post.id}`)
										}
									>
										Edit
									</Button>
								</TableCell>
								<TableCell align="right">
									<Button
										variant="outlined"
										startIcon={<DeleteIcon />}
										color="error"
										onClick={() => {
											deletePost(post.id);
										}}
									>
										Delete
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Button
				variant="contained"
				startIcon={<AddCircleIcon />}
				onClick={() => router.push("/create")}
			>
				Create New Post
			</Button>
		</>
	);
};

export default ListPage;

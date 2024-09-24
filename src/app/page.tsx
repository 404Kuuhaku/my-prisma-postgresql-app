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
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FindPostForm from "@/components/form/FindPostForm";

interface ICategory {
	id: number;
	name: string;
}

interface IPost {
	id: number;
	title: string;
	category: ICategory;
}

const ListPage = () => {
	const [posts, setPosts] = useState<IPost[]>([]);
	const [search, setSearch] = useState("");
	const [category, setCategory] = useState("");
	const [categories, setCategories] = useState([]);
	const [sort, setSort] = useState("desc");
	const router = useRouter();

	const fetchPosts = async () => {
		try {
			const query = new URLSearchParams({
				search,
				category,
				sort,
			}).toString();
			const res = await axios.get(`/api/posts?${query}`);
			setPosts(res.data);
		} catch (error) {
			console.log("error", error);
		}
	};

	const fetchCategories = async () => {
		try {
			const res = await axios.get(`/api/categories`);
			setCategories(res.data);
		} catch (error) {
			console.log("error", error);
		}
	};

	useEffect(() => {
		fetchPosts();
		fetchCategories();
	}, []);

	const handleFilterChange = () => {
		fetchPosts();
	};

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
			<Box sx={{ maxWidth: "80%", mx: "auto", py: 5 }}>
				<Typography variant="h2" component="h2">
					Blog Posts
				</Typography>
			</Box>
			<Box sx={{ maxWidth: "80%", mx: "auto", py: 2 }}>
				<FindPostForm
					onFliterChange={handleFilterChange}
					search={search}
					setSearch={setSearch}
					category={category}
					categories={categories}
					setCategory={setCategory}
					sort={sort}
					setSort={setSort}
				/>
			</Box>
			<Box sx={{ maxWidth: "80%", mx: "auto", py: 5 }}>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell sx={{ fontWeight: 600 }}>
									Title
								</TableCell>
								<TableCell
									align="right"
									sx={{ fontWeight: 600 }}
								>
									Category
								</TableCell>
								<TableCell
									align="right"
									sx={{ fontWeight: 600 }}
								>
									Actions
								</TableCell>
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
										{post.category.name}
									</TableCell>
									<TableCell align="right">
										<Button
											variant="outlined"
											startIcon={<EditIcon />}
											sx={{ mx: 3 }}
											onClick={() =>
												router.push(`/edit/${post.id}`)
											}
										>
											Edit
										</Button>
										<Button
											variant="outlined"
											startIcon={<DeleteIcon />}
											sx={{ mx: 3 }}
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
			</Box>
			<Box sx={{ maxWidth: "80%", mx: "auto", py: 5 }}>
				<Button
					variant="contained"
					startIcon={<AddCircleIcon />}
					onClick={() => router.push("/create")}
				>
					Create New Post
				</Button>
			</Box>
		</>
	);
};

export default ListPage;

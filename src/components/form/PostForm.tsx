"use client";

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import BackupIcon from "@mui/icons-material/Backup";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface ICategories {
	id: number;
	name: string;
}

interface IPostFormProps {
	title: string;
	content: string;
	categoryId: string;
	onChangeTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onChangeContent: (event: React.ChangeEvent<HTMLInputElement>) => void;
	setCategory: React.Dispatch<React.SetStateAction<string>>;
	onSubmit: (event: React.FormEvent) => void;
	buttonName: string;
}

const PostForm = ({
	title,
	content,
	categoryId,
	onChangeTitle,
	onChangeContent,
	setCategory,
	onSubmit,
	buttonName,
}: IPostFormProps) => {
	// const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
	const [categories, setCategories] = useState<ICategories[]>([]);

	const handleCategoryChange = (event: SelectChangeEvent) => {
		setCategory(event.target.value);
	};

	const MenuProps = useMemo(() => {
		const ITEM_HEIGHT = 48;
		const ITEM_PADDING_TOP = 8;

		return {
			PaperProps: {
				style: {
					maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
					width: 250,
				},
			},
		};
	}, []);

	const fetchCategories = async () => {
		try {
			const res = await axios.get(`/api/categories`);
			setCategories(res.data);
		} catch (error) {
			console.log("error", error);
		}
	};

	useEffect(() => {
		// const allCategory = [
		// 	"tech",
		// 	"life stlye",
		// 	"agriculture",
		// 	"food",
		// 	"plant",
		// 	"game",
		// 	"movie",
		// 	"anime",
		// 	"travel",
		// ];
		// setCategoryOptions(allCategory);
		fetchCategories();
	}, []);

	return (
		<>
			<form onSubmit={onSubmit}>
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
						onChange={onChangeTitle}
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
						onChange={onChangeContent}
					/>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						py: 2,
					}}
				>
					<FormControl sx={{ m: 1, width: "40%" }}>
						<InputLabel id="demo-simple-select-autowidth-label">
							Select Category
						</InputLabel>
						<Select
							labelId="select-category"
							id="category"
							label="Select Category"
							value={categoryId}
							onChange={handleCategoryChange}
							MenuProps={MenuProps}
						>
							{categories.map((option) => (
								<MenuItem key={option.id} value={option.id}>
									{option.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
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
						startIcon={
							buttonName === "Update Post" ? (
								<BackupIcon />
							) : (
								<AddCircleIcon />
							)
						}
						type="submit"
					>
						{buttonName}
					</Button>
				</Box>
			</form>
		</>
	);
};

export default PostForm;

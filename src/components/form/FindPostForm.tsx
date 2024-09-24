"use client";

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const FindPostForm = () => {
	const [search, setSearch] = useState("");
	const [category, setCategory] = useState<string[]>([]);
	const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
	const [time, setTime] = useState("");
	const [mounted, setMounted] = useState(false);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};

	const handleSortChange = (event: SelectChangeEvent) => {
		setTime(event.target.value);
	};

	const handleCategoryChange = (
		event: SelectChangeEvent<typeof category>
	) => {
		const value = event.target.value;

		// If value is a string (autofill case), split it; otherwise, use it as is.
		const newCategory =
			typeof value === "string" ? value.split(",") : value;

		setCategory(newCategory);
	};

	const onSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		console.log("search :", search);
		console.log("category :", category);
		console.log("time :", time);

		// try {
		// 	const res = await axios.get("/api/posts");
		// 	console.log(res);
		// 	// router.push("/");
		// } catch (error) {
		// 	console.log("error", error);
		// }
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

	useEffect(() => {
		const allCategory = [
			"tech",
			"life stlye",
			"agriculture",
			"food",
			"plant",
			"game",
			"movie",
			"anime",
			"travel",
		];
		setCategoryOptions(allCategory);
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<>
			<form onSubmit={onSubmit}>
				<Grid container spacing={2} alignItems="center">
					<Grid size={{ xs: 12, sm: 5 }}>
						<Paper
							sx={{
								height: 56,
								display: "flex",
								alignItems: "center",
							}}
						>
							<IconButton type="button" sx={{ p: 1, ml: 1 }}>
								<SearchIcon />
							</IconButton>
							<Divider
								sx={{ height: 28, m: 0.5 }}
								orientation="vertical"
							/>
							<InputBase
								sx={{ ml: 1, flex: 1 }}
								placeholder="Search Post..."
								value={search}
								onChange={handleSearchChange}
							/>
						</Paper>
					</Grid>
					<Grid size={{ xs: 12, sm: 3 }}>
						<FormControl sx={{ m: 1, width: "100%" }}>
							<InputLabel id="demo-simple-select-autowidth-label">
								Select Category
							</InputLabel>
							<Select
								labelId="select-category"
								id="category"
								label="Select Category"
								multiple
								value={category}
								onChange={handleCategoryChange}
								MenuProps={MenuProps}
							>
								{categoryOptions.map((option) => (
									<MenuItem key={option} value={option}>
										{option}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>

					<Grid size={{ xs: 12, sm: 2 }}>
						<FormControl sx={{ m: 1, width: "100%" }}>
							<InputLabel id="demo-simple-select-autowidth-label">
								Sort
							</InputLabel>
							<Select
								labelId="demo-select-small-label"
								id="demo-select-small"
								label="Sort"
								value={time}
								onChange={handleSortChange}
							>
								<MenuItem value={"ASC"}>Latest</MenuItem>
								<MenuItem value={"DESC"}>Oldest</MenuItem>
							</Select>
						</FormControl>
					</Grid>

					<Grid
						size={{ xs: 12, sm: 2 }}
						display="flex"
						justifyContent="center"
					>
						<Button
							variant="contained"
							startIcon={<CheckCircleIcon />}
							type="submit"
						>
							Apply
						</Button>
					</Grid>
				</Grid>
			</form>
		</>
	);
};

export default FindPostForm;

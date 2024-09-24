"use client";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import BackupIcon from "@mui/icons-material/Backup";

interface IPostFormProps {
	title: string;
	content: string;
	onChangeTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onChangeContent: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (event: React.FormEvent) => void;
}

const PostForm = ({
	title,
	content,
	onChangeTitle,
	onChangeContent,
	onSubmit,
}: IPostFormProps) => {
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
					<Button
						sx={{ width: "40%" }}
						variant="contained"
						startIcon={<BackupIcon />}
						type="submit"
					>
						Update Post
					</Button>
				</Box>
			</form>
		</>
	);
};

export default PostForm;

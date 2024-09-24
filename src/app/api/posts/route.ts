import { type NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";

const prisma = new PrismaClient();

function validateSort(param: string | null) {
	if (!param) return "desc";
	if (param === "desc") return "desc";
	if (param === "asc") return "asc";
}

export async function GET(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams;
		const search = searchParams.get("search") || "";
		const category = searchParams.get("category");
		// const sort = searchParams.get("sort") || "desc";
		const sort = validateSort(searchParams.get("sort"));

		// if (category) {
		// 	const posts = await prisma.post.findMany({
		// 		where: {
		// 			title: {
		// 				contains: search,
		// 				mode: "insensitive",
		// 			},
		// 			category,
		// 		},
		// 		orderBy: {
		// 			createdAt: sort,
		// 		},
		// 	});
		// 	return Response.json(posts);
		// }

		// const posts = await prisma.post.findMany({
		// 	where: {
		// 		title: {
		// 			contains: search,
		// 			mode: "insensitive",
		// 		},
		// 	},
		// 	orderBy: {
		// 		createdAt: sort,
		// 	},
		// });
		// return Response.json(posts);

		const whereClause = {
			title: {
				contains: search,
				mode: Prisma.QueryMode.insensitive,
			},
			...(category && { category }),
		};

		const posts = await prisma.post.findMany({
			where: whereClause,
			orderBy: {
				createdAt: sort,
			},
		});

		return Response.json(posts);
	} catch (error) {
		return new Response(error as BodyInit, {
			status: 500,
		});
	}
}

export async function POST(req: Request) {
	try {
		const { title, content, category } = await req.json();
		const newPost = await prisma.post.create({
			data: {
				title,
				content,
				category,
			},
		});
		return Response.json(newPost);
	} catch (error) {
		return new Response(error as BodyInit, {
			status: 500,
		});
	}
}

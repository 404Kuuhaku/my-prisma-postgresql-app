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
		const sort = validateSort(searchParams.get("sort"));

		const whereClause = {
			title: {
				contains: search,
				mode: Prisma.QueryMode.insensitive,
			},
			// ...(category && { category }),
			...(category && {
				category: {
					is: {
						name: category,
					},
				},
			}),
		};

		const posts = await prisma.post.findMany({
			where: whereClause,
			orderBy: {
				createdAt: sort,
			},
			include: {
				category: true,
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
		const { title, content, categoryId } = await req.json();
		const newPost = await prisma.post.create({
			data: {
				title,
				content,
				categoryId: Number(categoryId),
			},
		});
		return Response.json(newPost);
	} catch (error) {
		return new Response(error as BodyInit, {
			status: 500,
		});
	}
}

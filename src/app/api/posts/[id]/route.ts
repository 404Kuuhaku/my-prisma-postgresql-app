import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const postId = Number(params.id);
		const getPost = await prisma.post.findUnique({
			where: { id: postId },
		});
		return Response.json(getPost);
	} catch (error) {
		return new Response(error as BodyInit, {
			status: 500,
		});
	}
}

export async function PUT(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const postId = Number(params.id);
		const { title, content, category } = await req.json();
		const updatePost = await prisma.post.update({
			where: { id: postId },
			data: { title, content, category },
		});
		return Response.json(updatePost);
	} catch (error) {
		return new Response(error as BodyInit, {
			status: 500,
		});
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const postId = Number(params.id);
		const deletePost = await prisma.post.delete({
			where: { id: postId },
		});
		return Response.json(deletePost);
	} catch (error) {
		return new Response(error as BodyInit, {
			status: 500,
		});
	}
}

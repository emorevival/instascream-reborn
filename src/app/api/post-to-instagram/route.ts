
import { type NextRequest, type NextResponse } from "next/server";
import { postImage } from "~/server/api/instagram";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const postImageRes = await postImage();
    if (postImageRes.status === 'ok') {
      return new Response('Posted to Instagram', { status: 200 });
    } else {
      return new Response('Failed to post to Instagram', { status: 500 });
    }
  } catch (error) {
    let message
    if (error instanceof Error) message = error.message
    else message = String(error)
    return new Response(`There has been an error posting to Instagram.\nThe error is: ${message}`, { status: 500 });
  }
}
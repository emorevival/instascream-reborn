
import { verifySignatureAppRouter } from "@upstash/qstash/dist/nextjs";
import { type NextRequest, NextResponse } from "next/server";
import { postImage } from "~/server/api/instagram";


const handler = async (req: NextRequest) => {
  try {
    console.log("This is the request", req.headers, req.headers.get('upstash-signature'), req.url, req.cookies)
    const postImageRes = await postImage();
    if (postImageRes.status === 'ok') {
      return new NextResponse('Posted to Instagram', { status: 200 });
    } else {
      return new NextResponse('Failed to post to Instagram', { status: 500 });
    }
  } catch (error) {
    let message
    if (error instanceof Error) message = error.message
    else message = String(error)
    return new NextResponse(`There has been an error posting to Instagram.\nThe error is: ${message}`, { status: 500 });
  }
}

export const POST = verifySignatureAppRouter(handler);
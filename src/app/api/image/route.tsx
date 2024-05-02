/* eslint-disable @next/next/no-img-element */
import type { NextApiRequest, NextApiResponse } from 'next';
import { ImageResponse } from 'next/og';
// App router includes @vercel/og.
// No need to install it.

export async function GET(request: NextApiRequest, response: NextApiResponse) {
  try {
    return new ImageResponse(
      (
        <span style={{
          wordWrap: 'break-word',
          height: '100%',
          width: '100%',
          backgroundColor: '#129033',
          fontSize: 40,
        }}>
          <b style={{
            height: '100%',
            width: '100%',
            wordWrap: 'break-word',
            wordBreak: 'break-all'
          }}>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaaaaABAsdhash</b>
        </span>

      ),
      {
        width: 1080,
        height: 1080,
      },
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
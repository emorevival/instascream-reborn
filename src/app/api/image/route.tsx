/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const revalidate = 0


const IMAGE_WIDTH = 1080;
const NUM_OF_LINES = 15;
const A_WIDTH = 38.5714285714;
const H_WIDTH = 40;
const A_MAX = 420;


const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

const randomHexColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const determineTextColor = (bgColor: string) => {
  const r = parseInt(bgColor.slice(1, 3), 16);
  const g = parseInt(bgColor.slice(3, 5), 16);
  const b = parseInt(bgColor.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness >= 128 ? 'black' : 'white';
};

const generateText = () => {
  const numA = randomInt(1, A_MAX);
  console.log(numA)
  const numH = randomInt(1, Math.floor(((NUM_OF_LINES * IMAGE_WIDTH) - (A_WIDTH * numA)) / H_WIDTH));

  return "A".repeat(numA) + "H".repeat(numH);
}

export const GET = async () => {
  try {
    const fontData = await fetch(
      new URL('../../../../public/fonts/comicsans.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer());

    const text = generateText();
    const backgroundColor = randomHexColor();
    const textColor = determineTextColor(backgroundColor);

    console.log(text, backgroundColor, textColor)
    return new ImageResponse(
      (
        <span style={{
          wordWrap: 'break-word',
          height: '100%',
          width: '100%',
          backgroundColor: backgroundColor,
          fontSize: '52px',
        }}>
          <b style={{
            height: '100%',
            width: '100%',
            wordWrap: 'break-word',
            wordBreak: 'break-all',
            color: textColor,
            fontFamily: '"Comic"',
          }}>{text}</b>
        </span>

      ),
      {
        width: 1080,
        height: 1080,
        fonts: [
          {
            name: 'Comic',
            data: fontData,
            style: 'normal',
          },
        ],
      },
    );
  } catch (error) {
    let message
    if (error instanceof Error) message = error.message
    else message = String(error)
    return new Response(`There has been an error during the image generation.\nThe error is: ${message}`, { status: 500 });
  }
}
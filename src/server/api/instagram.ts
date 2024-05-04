import { IgApiClient } from 'instagram-private-api';
import { get } from 'request-promise';
import sharp from 'sharp';
import { env } from "~/env";
import { getBaseUrl } from '~/utils/utils';
export const postImage = async () => {
  try {
    const ig = new IgApiClient();
    ig.state.generateDevice(env.IG_USERNAME);
    await ig.account.login(env.IG_USERNAME, env.IG_PASSWORD);

    console.log("OH MY GOD IS THE URL WRONG...", `${getBaseUrl()}/api/image`)

    console.log("yes...... it is wrong........", env.NODE_ENV, env.VERCEL_ENV);

    const imageBuffer = await get({
      url: `${getBaseUrl()}/api/image`,
      encoding: null,
    }) as Buffer;
    const jpegBuffer = await sharp(imageBuffer).jpeg().toBuffer();

    const publishResult = await ig.publish.photo({
      file: jpegBuffer,
      caption: '#scream',
    });

    return publishResult;

  } catch (error) {
    throw error;
  }
}
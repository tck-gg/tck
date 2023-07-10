import Backblaze from 'backblaze-b2';
import { v4 as uuidv4 } from 'uuid';

let b2: Backblaze = null as any;
if (process.env.B2_APPLICATION_KEY_ID && process.env.B2_APPLICATION_KEY) {
  b2 = new Backblaze({
    applicationKeyId: process.env.B2_APPLICATION_KEY_ID,
    applicationKey: process.env.B2_APPLICATION_KEY
  });
}

export async function uploadProfilePicture(data: Buffer): Promise<string> {
  if (!b2 || !process.env.B2_BUCKET_NAME) {
    return '';
  }

  await b2.authorize();

  const bucket = await b2.getBucket({
    bucketName: process.env.B2_BUCKET_NAME
  });
  const bucketId = bucket.data.buckets[0].bucketId;

  const upload: {
    authorizationToken: string;
    bucketId: string;
    uploadUrl: string;
  } = (
    await b2.getUploadUrl({
      bucketId
    })
  ).data;

  const fileName = `${uuidv4()}.png`;
  const response = await b2.uploadFile({
    uploadUrl: upload.uploadUrl,
    uploadAuthToken: upload.authorizationToken,
    fileName: `giveaways/${fileName}`,
    data
  });

  if ((response.status as unknown as number) !== 200) {
    return '';
  }

  return fileName;
}

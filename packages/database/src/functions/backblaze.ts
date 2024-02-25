import Backblaze from 'backblaze-b2';
import { v4 as uuidv4 } from 'uuid';

let b2: Backblaze = null as any;
if (
  process.env.B2_BUCKET_NAME &&
  process.env.B2_APPLICATION_KEY_ID &&
  process.env.B2_APPLICATION_KEY
) {
  b2 = new Backblaze({
    applicationKeyId: process.env.B2_APPLICATION_KEY_ID,
    applicationKey: process.env.B2_APPLICATION_KEY
  });
} else {
  // eslint-disable-next-line no-console
  console.log('Missing environment variables. Not using Backblaze...');
}

export async function uploadImage(data: Buffer, path: string): Promise<string> {
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
    fileName: `${path}/${fileName}`,
    data
  });

  if ((response.status as unknown as number) !== 200) {
    return '';
  }

  return fileName;
}

export async function deleteImage(name: string, path: string): Promise<boolean> {
  if (!b2 || !process.env.B2_BUCKET_NAME) {
    return false;
  }

  await b2.authorize();

  const bucket = await b2.getBucket({
    bucketName: process.env.B2_BUCKET_NAME
  });
  const bucketId = bucket.data.buckets[0].bucketId;

  const filesResponse = await b2.listFileNames({
    bucketId,
    startFileName: `${path}/${name}`,
    maxFileCount: 1,
    delimiter: '',
    prefix: ''
  });
  const { files } = filesResponse.data;

  const response = await b2.deleteFileVersion({
    fileName: files[0].fileName,
    fileId: files[0].fileId
  });
  if ((response.status as unknown as number) !== 200) {
    return false;
  }

  return true;
}

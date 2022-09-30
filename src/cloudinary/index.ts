import { Readable } from "stream";
import { v2 as cloudinary } from "cloudinary";

export const initCloudiary = () =>
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

export const uploadMultiple = async (files: Express.Multer.File[]) => {
  const streams: Readable[] = files.map((file) => {
    const stream = new Readable();
    stream.push(file.buffer);
    stream.push(null);
    return stream;
  });

  return <Promise<any[]>>(
    Promise.all(streams.map((stream) => uploadCloudinaryFile(stream)))
  );
};

export const uploadSingle = async (file: Express.Multer.File) => {
  const stream: Readable = new Readable();
  stream.push(file.buffer);
  stream.push(null);

  return <any>uploadCloudinaryFile(stream);
};

async function uploadCloudinaryFile(stream: Readable) {
  return new Promise((resolve, reject) => {
    const writableStream = cloudinary.uploader.upload_stream(
      {
        folder: "darall",
      },
      (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      }
    );

    stream.pipe(writableStream);
  });
}

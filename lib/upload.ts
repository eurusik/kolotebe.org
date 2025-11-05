import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import crypto from "crypto"

const s3Client = new S3Client({
  region: process.env.S3_REGION || "auto",
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
})

const BUCKET_NAME = process.env.S3_BUCKET_NAME!
const PUBLIC_URL = process.env.S3_PUBLIC_URL!

export async function uploadFile(
  file: File,
  folder: string = "uploads"
): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer())
  const fileExtension = file.name.split(".").pop()
  const fileName = `${folder}/${crypto.randomUUID()}.${fileExtension}`

  await s3Client.send(
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
    })
  )

  return `${PUBLIC_URL}/${fileName}`
}

export async function deleteFile(fileUrl: string): Promise<void> {
  const fileName = fileUrl.replace(`${PUBLIC_URL}/`, "")
  
  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileName,
    })
  )
}

export async function getUploadUrl(
  fileName: string,
  contentType: string
): Promise<{ uploadUrl: string; fileUrl: string }> {
  const fileExtension = fileName.split(".").pop()
  const key = `uploads/${crypto.randomUUID()}.${fileExtension}`

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  })

  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 })
  const fileUrl = `${PUBLIC_URL}/${key}`

  return { uploadUrl, fileUrl }
}
// src/services/fileService.ts

import fs from 'fs';
import path from 'path';
import { createFile } from '../repositories/FileRepository';

interface UploadedFile {
  originalname: string
  path: string
}

export const saveFile = async (file: UploadedFile): Promise<string> => {
  const fileName = `${Date.now()}-${file.originalname}`;
  const filePath = path.join(__dirname, '../../uploads', fileName);

  fs.renameSync(file.path, filePath);

  const savedFile = await createFile({
    name: fileName,
    url: `http://localhost:3000/uploads/${fileName}`
  });

  return savedFile.url;
};

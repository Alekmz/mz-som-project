/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// src/controllers/fileController.ts

import { Request, Response } from 'express';
import { saveFile } from '../../service/fileService';

export const uploadFile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'Nenhum arquivo enviado' });
      return;
    }

    const fileUrl = await saveFile(req.file);
    res.json({ url: fileUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao fazer upload do arquivo' });
  }
};

import { RefObject } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { off } from 'process';

export const useExportToPdf = () => {
  const generatePdf = async (targetRef: RefObject<HTMLDivElement>): Promise<Blob> => {
    if (!targetRef.current) {
      throw new Error('Target element for PDF generation not found');
    }

    try {
      const element = targetRef.current;

      // Renderiza o elemento como canvas
      const canvas = await html2canvas(element, {
        scale: 2, // Aumenta a qualidade do render
        useCORS: true, // Permite imagens externas
        allowTaint: false, // Evita problemas com imagens bloqueadas
        logging: false, // Reduz o impacto no desempenho
      });

      // Converte o canvas para imagem base64
      const imgData = canvas.toDataURL('image/png');

      // Configuração do PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      console.log('PDF size:', pdfWidth, pdfHeight);
      // Dimensões do canvas para PDF
      const canvasWidth = canvas.width * 20; // Dividir pela escala utilizada
      const canvasHeight = canvas.height * 20 ;
      const ratio = Math.min(pdfWidth / canvasWidth, pdfHeight / canvasHeight);

      const totalPages = Math.ceil(canvasHeight / (pdfHeight / ratio));

      // Geração de páginas no PDF
      for (let i = 0; i < totalPages; i++) {
        const offset = -(i * pdfHeight / ratio);
        console.log(canvasWidth * ratio, canvasHeight * ratio);
        pdf.addImage(
          imgData,
          'PNG',
          -275,
          offset,
          1000,
          500
        );

        if (i < totalPages - 1) {
          pdf.addPage();
        }
      }

      // Retorna o PDF como Blob
      pdf.save(`orcamento-${new Date().toISOString()}.pdf`);
      return pdf.output('blob');
    } catch (error) {
      console.error('Error in PDF generation:', error);
      throw error;
    }
  };

  return { generatePdf };
};
import axios from "axios";

export const sendPdfViaWhatsApp = async (pdfBlob: Blob, phoneNumber: string): Promise<void> => {
    if (!(pdfBlob instanceof Blob)) {
        throw new Error('Invalid PDF data: not a Blob');
      }
    
      if (!phoneNumber) {
        throw new Error('Phone number is required');
      }
    
      const formData = new FormData();
      formData.append('file', pdfBlob, 'document.pdf');
    
  
      try {
        const response = await axios.post('https://app.mzsom.com.br/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    
        if (!response.data.url) {
          throw new Error('File URL not received from server');
        }

        const phoneNumberFormatted = phoneNumber.replace(/\D/g, '');
    
        const whatsappUrl = `https://wa.me/${phoneNumberFormatted}?text=${encodeURIComponent(`Opa, aqui está seu orçamento: ${response.data.url}`)}`;
        console.log('Opening WhatsApp with URL:', whatsappUrl);
        window.open(whatsappUrl, '_blank');
      } catch (error) {
        console.error('Error in sendPdfViaWhatsApp:', error);
        if (axios.isAxiosError(error)) {
          throw new Error(`File upload failed: ${error.response?.status} ${error.response?.statusText}. ${error.response?.data}`);
        }
        throw error;
      }
  };
  
  
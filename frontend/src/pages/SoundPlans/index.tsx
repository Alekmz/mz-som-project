import Footer from "../../components/footer/footer";
import Header from "../../components/header/Header";
import Sidebar from "../../components/menu/Sidebar";

import Plains from "./view/plains";
import CreateSoundPlan from "./view/create";
import { useState } from "react";

const SoundPlans = ()=> {
  const [hiddenPlains, setHiddenPlains] = useState(false);

  return (
    <>
      <Header />
      <Sidebar />
      {
        !hiddenPlains ? <Plains setHiddenPlains={setHiddenPlains}/> : <CreateSoundPlan />
      }
      <Footer />
    </>
  );
};

export default SoundPlans;



// import React, { useState } from 'react';
// import { jsPDF } from 'jspdf';

// const SoundPlans: React.FC = () => {
//   const [pdfUrl, setPdfUrl] = useState<string | null>(null);

//   const generateAndUploadPdf = async () => {
//     const doc = new jsPDF();
//     doc.text("Olá! Este é um PDF gerado pelo aplicativo React.", 10, 10);
//     const pdfBlob = doc.output('blob');

//     const formData = new FormData();
//     formData.append('file', new File([pdfBlob], "documento.pdf", { type: "application/pdf" }));

//     const response = await fetch('https://app.mzsom.com.br/upload', {
//       method: 'POST',
//       body: formData,
//     });

//     const { url } = await response.json(); // Recebe a URL pública do arquivo

//     setPdfUrl(url);
//   };

//   const sharePdfLink = () => {
//     const phoneNumber = "49989050768";
//     const message = `Clique no link para baixar o PDF: ${pdfUrl}`;
//     const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
//     window.open(whatsappUrl, '_blank');
//   };

//   return (
//     <div>
//       <h1>Gerar PDF e Compartilhar via WhatsApp Web</h1>
//       <button onClick={generateAndUploadPdf}>Gerar PDF e Enviar ao Servidor</button>
//       {pdfUrl && (
//         <div>
//           <a href={pdfUrl} target="_blank" rel="noopener noreferrer">Baixar PDF</a>
//           <button onClick={sharePdfLink}>Compartilhar no WhatsApp Web</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SoundPlans;

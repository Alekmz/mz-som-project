import Logo from "../../assets/logo_mz.png";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";

const BudgetRequest = () => {
  return (
    <div className="flex flex-col pt-10 items-center w-screen min-h-screen">
      <img src={Logo} alt="" loading="lazy" />
      <p className="text-[#2B3940] font-nunito font-light text-lg">
        Solicite agora o seu orçamento de serviço de som e garanta condições
        especiais! Para isso, basta preencher os campos abaixo com seus dados e
        as informações sobre o evento.
      </p>
      
        <div className="flex flex-col items-start justify-start max-w-[300px] text-start">
          <Label htmlFor="picture" className="text-start">Nome da empresa *</Label>
          <Input id="picture" type="text" />
        </div>
        <div className="flex flex-col items-start justify-start max-w-[300px] text-start">
          <Label htmlFor="picture" className="text-start">Responsável *</Label>
          <Input id="picture" type="text" />
        </div>
        <div className="flex flex-col items-start justify-start max-w-[300px] text-start">
          <Label htmlFor="picture" className="text-start">CNPJ/CPF *</Label>
          <Input id="picture" type="text" />
        </div>
        <div className="flex flex-col items-start justify-start max-w-[300px] text-start">
          <Label htmlFor="picture" className="text-start">Email *</Label>
          <Input id="picture" type="email" />
        </div>
        <div className="flex flex-col items-start justify-start max-w-[300px] text-start">
          <Label htmlFor="picture" className="text-start">Descrição *</Label>
          <Textarea />

        </div>
      </div>
    
  );
};

export default BudgetRequest;

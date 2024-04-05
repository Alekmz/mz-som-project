import LogoMz from "../../assets/logo_mz.png";
import sino from "../../assets/icons/sino.png";
import notificacao from "../../assets/icons/mensagem.png";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';

function Header() {
        const now = new Date();
        const formattedDate = format(now, "iiii, dd MMMM 'de' yyyy", { locale: ptBR });
    return (
            <div className="fixed  hidden md:flex top-0 w-full bg-white text-white border-b border-[#E7E9EF] p-6 px-9 z-50 justify-between items-center">
                <div className="flex space-x-20 items-center ">
                    <div><img src={LogoMz} className="rounded-t-lg w-[110px] h-[29px]" alt="Logo da MZ Som" /></div>
                    <div className='flex flex-col'>
                        <div className='text-black font-bold'><h4>Dasboard</h4></div>
                        <div className='text-black italic'>{formattedDate}.</div>
                    </div>
                </div>
                <div className="flex space-x-10 items-center">
                    <div><img src={notificacao} className="rounded-t-lg w-[23px] h-[23px]" /></div>
                    <div><img src={sino} className="rounded-t-lg w-[23px] h-[23px]" /></div>
                    <div className='text-black items-center'>Sistema de Orçamentos</div>
                </div>
            </div>
    );
}

export default Header;
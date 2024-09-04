import { Speaker, Truck, Wrench } from 'lucide-react';
import path from 'path';
import { useState } from 'react';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Botão do menu de hambúrguer */}
            <button onClick={toggleSidebar} className="fixed top-10 left-4 block md:hidden z-10 focus:outline-none">
                <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Barra lateral */}
            <aside id="logo-sidebar" className={`fixed top-20 left-0 z-30 w-56 h-screen pt-14 transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} bg-white border-r border-[#E7E9EF] md:translate-x-0 dark:bg-gray-800 dark:border-gray-700`} aria-label="Sidebar">
                <div className="h-full px-4 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    {/* Conteúdo da barra lateral */}
                    <ul className="space-y-2 font-medium">
                        <li>
                            <a href="/create-budget" className="flex items-center p-2 pb-10 text-gray-900 rounded-lg dark:text-white hover:text-[#2190BF] dark:hover:bg-gray-700 group">
                                <span className="ms-3 italic">Novo <br></br> Orçamento</span>
                                <svg className="h-7 w-7 pl-1 text-[#2190BF] transition duration-75  dark:text-[#2190BF] dark:group-hover:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="12" y1="8" x2="12" y2="16" />  <line x1="8" y1="12" x2="16" y2="12" /></svg>
                            </a>
                        </li>
                        <li>
                    <a href="/main-screen" className="flex items-center p-2 text-gray-900 rounded-l hover:text-[#2190BF] dark:text-[#2190BF] group">
                        <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-[#2190BF] hover:text-[#2190BF] group-hover:text-[#2190BF]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                            <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                            <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                        </svg>
                        <span className="ms-3">Solicitações</span>
                    </a>
                </li>
                <li>
                    <a href="/budgets" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:text-[#2190BF] dark:hover:bg-gray-700 group">
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-[#2190BF] dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                            <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                            <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">Orçamentos</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:text-[#2190BF] dark:hover:text-[#2190BF] group">
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 hover:text-[#2190BF] group-hover:text-[#2190BF] " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" stroke-width="1.5" stroke="currentColor">
                            <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">Calendário</span>
                    </a>
                </li>
                <li>
                    <a href="/sound-plans" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:text-[#2190BF] dark:hover:text-[#2190BF] group">
                        <Speaker color='#6B7180'/>
                        <span className="flex-1 ms-3 whitespace-nowrap">Planos de som</span>
                    </a>
                </li>
                <li>
                    <a href="/equipments" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:text-[#2190BF] dark:hover:text-[#2190BF] group">
                        <Truck   color='#6B7180'/>
                        <span className="flex-1 ms-3 whitespace-nowrap">Equipamentos</span>
                    </a>
                </li>
                    </ul>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;

import Header from '../../components/header/Header';
import Sidebar from '../../components/menu/Sidebar';
import { useParams } from 'react-router-dom';

const CreateBudget = () => {
    const { id } = useParams();
    return (
        <div className="bg-white w-full h-screen">
            <Header />
            <Sidebar />
            <div className="p-4 md:ml-56">
                <div className=" p-4 dark:border-gray-700 mt-20 md:mt-24 sm:mt-28">
                    {/* Cabeçalho */}
                    <div className="mb-4">
                        <div className="flex pb-3 justify-center dark:bg-gray-800">
                            <p className="text-md text-[#2B3A41] dark:text-gray-500">
                                Criar Orçamento
                            </p>
                        </div>
                        <div className="flex pb-3 justify-center dark:bg-gray-800">
                                <p className="text-md text-[#2B3A41]">Id do Cliente {id}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateBudget;
import Sidebar from "../../components/menu/Sidebar";
import Header from "../../components/header/Header";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/footer";
import { format } from "date-fns";
import { useGetAllBudgets } from "./data/getAllBudgets";

const AllBudgets = () => {
const {data} = useGetAllBudgets();
    return (
        <div className="bg-white w-full h-screen flex flex-col">
      <Header />
      <Sidebar />
      <div className="p-4 md:ml-56 flex-grow">
        <div className=" p-4 dark:border-gray-700 mt-20 md:mt-24 sm:mt-28">
          {/* Cabeçalho */}
          <div className="mb-4">
            <div className="flex pb-3 justify-center dark:bg-gray-800">
              <p className="text-md text-[#2B3A41] dark:text-gray-500">
                Orçamentos
              </p>
            </div>
            <div className="">
              <div className="flex h-10 rounded-lg border border-black items-center dark:bg-gray-800">
                <div className="flex w-10 justify-between pl-2 items-center">
                  <p className="text-sm text-[#2B3A41] dark:text-gray-500">
                    Id
                  </p>
                  <div className="text-md text-[#2B3A41] dark:text-gray-500 px-1">
                    |
                  </div>
                </div>
                <div className="flex w-20 grow justify-between items-center ">
                  <p className="text-xs text-[#2B3A41] dark:text-gray-500">
                    Responsável
                  </p>
                  <div className="text-md text-[#2B3A41] dark:text-gray-500 px-1">
                    |
                  </div>
                </div>
                <div className="flex w-10 grow justify-between items-center">
                  <p className="text-xs text-[#2B3A41] dark:text-gray-500">
                    Tipo Evento
                  </p>
                  <div className="text-md text-[#2B3A41] dark:text-gray-500 px-1">
                    |
                  </div>
                </div>
                <div className="flex w-20 grow justify-between items-center">
                  <p className="text-xs text-[#2B3A41] dark:text-gray-500">
                    Data Evento
                  </p>
                  <div className="text-md text-[#2B3A41] dark:text-gray-500 px-1">
                    |
                  </div>
                </div>
                <div className="flex w-20 grow justify-between items-center">
                  <p className="text-xs text-[#2B3A41] dark:text-gray-500">
                    Contato
                  </p>
                </div>
                <div className="flex w-10 grow justify-between items-center">
                  <p className="text-xs text-[#2B3A41] dark:text-gray-500"></p>
                </div>
              </div>

              {data &&
                data.map((budget) => (
                  <div className="flex h-10 rounded-lg items-center dark:bg-gray-800">
                    <div
                      key={budget.id}
                      className="flex w-10 justify-between pl-2 items-center"
                    >
                      <p className="text-sm text-[#2B3A41] dark:text-gray-500">
                        {budget.id}
                      </p>
                      <div className="text-md text-[#2B3A41] dark:text-gray-500 px-1">
                        |
                      </div>
                    </div>
                    <div className="flex w-20 grow justify-between items-center">
                      <p className="text-xs text-[#2B3A41] dark:text-gray-500">
                        {budget.responsavel}
                      </p>
                      <div className="text-md text-[#2B3A41] dark:text-gray-500 px-1">
                        |
                      </div>
                    </div>
                    <div className="flex w-10 grow justify-between items-center">
                      <p className="text-xs text-[#2B3A41] dark:text-gray-500">
                        {budget.tipoEvento}
                      </p>
                      <div className="text-md text-[#2B3A41] dark:text-gray-500 px-1">
                        |
                      </div>
                    </div>
                    <div className="flex w-20 grow justify-between items-center">
                      <p className="text-xs text-[#2B3A41] dark:text-gray-500">
                        {format(budget.dataEvento, "dd/MM/yyyy")}
                      </p>
                      <div className="text-md text-[#2B3A41] dark:text-gray-500 px-1">
                        |
                      </div>
                    </div>
                    <div className="flex w-20 grow justify-between items-center">
                      <p className="text-xs text-[#2B3A41] dark:text-gray-500">
                        {budget.telefone}
                      </p>
                    </div>
                    <div className="flex w-10 grow items-center justify-center">
                      <Link
                        to={`/create-budget/:${budget.id}`}
                        key={budget.id}
                        className="text-gray-900 rounded-lg dark:text-white hover:text-[#2190BF] dark:hover:text-[#2190BF] group"
                      >
                        <svg
                          className="w-5 hover:text-[#2190BF] dark:hover:text-[#2190BF]"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          fill="currentColor"
                          aria-hidden="true"
                          stroke-width="1.5"
                          stroke="currentColor"
                        >
                          <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    )
};

export default AllBudgets;
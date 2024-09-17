import Sidebar from "../../components/menu/Sidebar";
import Header from "../../components/header/Header";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/footer";
import { format } from "date-fns";
import { useGetAllBudgets } from "./data/getAllBudgets";

const AllBudgets = () => {
  const { data } = useGetAllBudgets();
  return (
    <div className="bg-white w-full h-screen flex flex-col">
      <Header />
      <Sidebar />
      <div className="p-4 md:ml-56 flex-grow">
        <div className=" p-4 dark:border-gray-700 mt-10 md:mt-24 mb-6">
          {/* Cabeçalho */}
          <div className="mb-4">
            <div className="flex pb-3 justify-center dark:bg-gray-800">
              <p className="text-md text-[#2B3A41] dark:text-gray-500">
                Orçamentos
              </p>
            </div>
            <div className="">
              <div className="hidden md:flex h-10 rounded-lg border border-black items-center dark:bg-gray-800">
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
                  <div key={budget.id}>
                    <div className="max-md:flex max-md:flex-row">
                      <div className="flex flex-col items-center w-full md:flex-row md:h-10 rounded-lg max-md:py-5 dark:bg-gray-800">
                        <div
                          className="max-md:hidden flex w-full md:w-10 justify-between pl-2 items-center"
                        >
                          <p className="text-sm text-[#2B3A41] dark:text-gray-500">{budget.id}</p>
                          <div className="text-md text-[#2B3A41] dark:text-gray-500 px-1">|</div>
                        </div>
                        {/* visível mobile */}
                        <div className="flex w-full md:w-20 grow md:justify-between max-md:space-x-2 items-center">
                          <p className="md:hidden text-xs text-[#2B3A41] dark:text-gray-500">
                            Responsável:
                          </p>
                          <p className="text-xs text-[#2B3A41] dark:text-gray-500">
                            {budget.responsavel}
                          </p>
                          <div className="max-md:hidden text-md text-[#2B3A41] dark:text-gray-500 px-1">|</div>
                        </div>
                        <div className="max-md:hidden flex w-full md:w-10 grow justify-between items-center">
                          <p className="text-xs text-[#2B3A41] dark:text-gray-500">
                            {budget.tipoEvento}
                          </p>
                          <div className="text-md text-[#2B3A41] dark:text-gray-500 px-1">|</div>
                        </div>
                        {/* visível mobile */}
                        <div className="flex w-full md:w-20 grow md:justify-between max-md:space-x-2 items-center">
                          <p className="md:hidden text-xs text-[#2B3A41] dark:text-gray-500">
                            Data Evento:
                          </p>
                          <p className="text-xs text-[#2B3A41] dark:text-gray-500">
                            {format(budget.dataEvento, "dd/MM/yyyy")}
                          </p>
                          <div className="max-md:hidden text-md text-[#2B3A41] dark:text-gray-500 px-1">|</div>
                        </div>
                        {/* visível mobile */}
                        <div className="flex w-full md:w-20 grow md:justify-between max-md:space-x-2 items-center">
                          <p className="md:hidden text-xs text-[#2B3A41] dark:text-gray-500">
                            Contato:
                          </p>
                          <p className="text-xs text-[#2B3A41] dark:text-gray-500">
                            {budget.telefone}
                          </p>
                        </div>
                        {/* visível mobile */}
                        <div className="hidden md:flex w-full md:w-10 grow items-center justify-center">
                          <Link
                            to={`/create-budget/:${budget.id}`}
                            key={budget.id}
                            className="text-gray-900 rounded-lg dark:text-white hover:text-[#2190BF] dark:hover:text-[#2190BF] group"
                          >
                            <svg
                              viewBox="0 0 1024 1024"
                              fill="currentColor"
                              height="1.5em"
                              width="1.5em"
                            >
                              <path d="M531.3 574.4l.3-1.4c5.8-23.9 13.1-53.7 7.4-80.7-3.8-21.3-19.5-29.6-32.9-30.2-15.8-.7-29.9 8.3-33.4 21.4-6.6 24-.7 56.8 10.1 98.6-13.6 32.4-35.3 79.5-51.2 107.5-29.6 15.3-69.3 38.9-75.2 68.7-1.2 5.5.2 12.5 3.5 18.8 3.7 7 9.6 12.4 16.5 15 3 1.1 6.6 2 10.8 2 17.6 0 46.1-14.2 84.1-79.4 5.8-1.9 11.8-3.9 17.6-5.9 27.2-9.2 55.4-18.8 80.9-23.1 28.2 15.1 60.3 24.8 82.1 24.8 21.6 0 30.1-12.8 33.3-20.5 5.6-13.5 2.9-30.5-6.2-39.6-13.2-13-45.3-16.4-95.3-10.2-24.6-15-40.7-35.4-52.4-65.8zM421.6 726.3c-13.9 20.2-24.4 30.3-30.1 34.7 6.7-12.3 19.8-25.3 30.1-34.7zm87.6-235.5c5.2 8.9 4.5 35.8.5 49.4-4.9-19.9-5.6-48.1-2.7-51.4.8.1 1.5.7 2.2 2zm-1.6 120.5c10.7 18.5 24.2 34.4 39.1 46.2-21.6 4.9-41.3 13-58.9 20.2-4.2 1.7-8.3 3.4-12.3 5 13.3-24.1 24.4-51.4 32.1-71.4zm155.6 65.5c.1.2.2.5-.4.9h-.2l-.2.3c-.8.5-9 5.3-44.3-8.6 40.6-1.9 45 7.3 45.1 7.4zm191.4-388.2L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494z" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                      <div className="hidden max-md:flex w-10 grow items-center justify-center">
                        <Link
                          to={`/create-budget/:${budget.id}`}
                          key={budget.id}
                          className="text-gray-900 rounded-lg dark:text-white hover:text-[#2190BF] dark:hover:text-[#2190BF] group"
                        >
                          <svg
                            viewBox="0 0 1024 1024"
                            fill="currentColor"
                            height="1.5em"
                            width="1.5em"
                          >
                            <path d="M531.3 574.4l.3-1.4c5.8-23.9 13.1-53.7 7.4-80.7-3.8-21.3-19.5-29.6-32.9-30.2-15.8-.7-29.9 8.3-33.4 21.4-6.6 24-.7 56.8 10.1 98.6-13.6 32.4-35.3 79.5-51.2 107.5-29.6 15.3-69.3 38.9-75.2 68.7-1.2 5.5.2 12.5 3.5 18.8 3.7 7 9.6 12.4 16.5 15 3 1.1 6.6 2 10.8 2 17.6 0 46.1-14.2 84.1-79.4 5.8-1.9 11.8-3.9 17.6-5.9 27.2-9.2 55.4-18.8 80.9-23.1 28.2 15.1 60.3 24.8 82.1 24.8 21.6 0 30.1-12.8 33.3-20.5 5.6-13.5 2.9-30.5-6.2-39.6-13.2-13-45.3-16.4-95.3-10.2-24.6-15-40.7-35.4-52.4-65.8zM421.6 726.3c-13.9 20.2-24.4 30.3-30.1 34.7 6.7-12.3 19.8-25.3 30.1-34.7zm87.6-235.5c5.2 8.9 4.5 35.8.5 49.4-4.9-19.9-5.6-48.1-2.7-51.4.8.1 1.5.7 2.2 2zm-1.6 120.5c10.7 18.5 24.2 34.4 39.1 46.2-21.6 4.9-41.3 13-58.9 20.2-4.2 1.7-8.3 3.4-12.3 5 13.3-24.1 24.4-51.4 32.1-71.4zm155.6 65.5c.1.2.2.5-.4.9h-.2l-.2.3c-.8.5-9 5.3-44.3-8.6 40.6-1.9 45 7.3 45.1 7.4zm191.4-388.2L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494z" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                    <div><hr className="md:hidden w-full border-t border-gray-300" /></div>
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




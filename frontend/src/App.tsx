import { useState } from "react";
import { Toaster } from "./components/ui/toaster";
import { DataBudgetContext } from "./context/DataBudgetContext";
import Router from "./router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
  const [dataForBudget, setDataForBudget] = useState(null);
  return (
    <>
      <DataBudgetContext.Provider value={{ dataForBudget, setDataForBudget }}>
      <QueryClientProvider client={queryClient}>
        <Router />
        <Toaster />
       </QueryClientProvider>
      </DataBudgetContext.Provider>
    </>
  );
}

export default App;

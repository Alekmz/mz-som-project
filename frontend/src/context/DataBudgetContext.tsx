
import { createContext, Dispatch, SetStateAction } from "react";



interface DataBudgetContextType {

  dataForBudget: any;

  setDataForBudget: Dispatch<SetStateAction<any>>;

}



export const DataBudgetContext = createContext<DataBudgetContextType | null>(null);

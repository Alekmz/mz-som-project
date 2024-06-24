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

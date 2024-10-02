import Sidebar from "../../components/menu/Sidebar";
import Header from "../../components/header/Header";
import Requests from "../main-screen/view/requests";
import Footer from "../../components/footer/footer";

const MainScreen = () => {

  return (
    <div className="bg-white w-full h-screen flex flex-col">
      <Header />
      <Sidebar />
      <Requests/>
      <Footer />
    </div>
  );
};
export default MainScreen;

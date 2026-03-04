import { ChatBotContainer } from "@/components/chatbot";
import Footer from "@/components/shared/footer";
import MainHeader from "@/components/shared/header/header";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div>
      <MainHeader />

      <div className={isHomePage ? "" : "mt-[100px] min-h-[100vh]"}>
        <Outlet />
      </div>
        <Footer />
      <ChatBotContainer />
    </div>
  );
};

export default MainLayout;

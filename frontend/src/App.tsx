import { useEffect, useRef } from "react";
import Routes from "./routes";
import { useClientAuth } from "./hooks/use-client-auth";
import { toast } from "sonner";
import { useDeviceNetworkHandler } from "./hooks/use-network";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const { fetchUser } = useClientAuth();

  useDeviceNetworkHandler();

  return (
    <>
      <ScrollToTop />
      <Routes />
    </>
  );
}

export default App;

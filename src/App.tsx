import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="mx-auto max-w-7xl px-2 pb-20 sm:px-4 lg:px-8">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;

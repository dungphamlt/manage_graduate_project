import NavBar from "../NavBar";
import SideBar from "../SideBar";

function LayoutDefault({ children }) {
  return (
    <div className="w-full h-screen text-[#42526E]">
      <SideBar />
      <NavBar />
      {children}
    </div>
  );
}

export default LayoutDefault;

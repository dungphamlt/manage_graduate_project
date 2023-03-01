import NavBar from "../NavBar";
import SubNav from "../SubNav";

function LayoutTaiKhoan({ children }) {
  return (
    <div className="w-full h-screen text-[#42526E]">
      <SubNav />
      <NavBar />
      {children}
    </div>
  );
}

export default LayoutTaiKhoan;

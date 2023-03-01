import Khoa from "../Pages/DanhMuc/Khoa";
import Lop from "../Pages/DanhMuc/Lop";
import NganhNghe from "../Pages/DanhMuc/NganhNghe";
import KhoDeTai from "../Pages/DoAn/KhoDeTai";
import QuanLyDot from "../Pages/DoAn/QuanLyDot";
import ThanhVien from "../Pages/QuanTriThanhVien/ThanhVien";
import InfoPerson from "../Pages/TaiKhoan/InfoPerson";
import PassPerson from "../Pages/TaiKhoan/PassPerson";
import ToChuc from "../Pages/ToChuc/ToChuc";
import HomePage from "../Pages/HomePage";
import DangNhap from "../Pages/DangNhap";

const publicRoutes = [
  { path: "/DangNhap", component: DangNhap, layout: "LayoutDangNhap" },
];

const privateRoutes = [
  { path: "/", component: HomePage, layout: "LayoutDefault" },
  { path: "/ThanhVien", component: ThanhVien, layout: "LayoutDefault" },
  {
    path: "/danh-muc/nganh-nghe",
    component: NganhNghe,
    layout: "LayoutDefault",
  },
  { path: "/danh-muc/khoa", component: Khoa, layout: "LayoutDefault" },
  { path: "/danh-muc/lop", component: Lop, layout: "LayoutDefault" },
  { path: "/do-an/quan-ly-dot", component: QuanLyDot, layout: "LayoutDefault" },
  { path: "/do-an/kho-de-tai", component: KhoDeTai, layout: "LayoutDefault" },
  { path: "/to-chuc", component: ToChuc, layout: "LayoutDefault" },
  {
    path: "/tai-khoan/thong-tin-ca-nhan",
    component: InfoPerson,
    layout: "LayoutTaiKhoan",
  },
  {
    path: "/tai-khoan/doi-mat-khau",
    component: PassPerson,
    layout: "LayoutTaiKhoan",
  },
];

export { publicRoutes, privateRoutes };

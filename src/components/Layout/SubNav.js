import styles from "../../Pages/TaiKhoan/styleTaiKhoan.module.css";
import mainLogo from "../../assets/icon/mainLogo.png";
import { Link } from "react-router-dom";
import pass from "../../assets/icon/pass.png";
import info from "../../assets/icon/info.png";

function SubNav() {
  return (
    <div className={styles.sideBar}>
      <div className={styles.sideBar_logo}>
        <img src={mainLogo} className={styles.main_logo} />
      </div>
      <h3 className={styles.quan_lý_tai_khoan}>Quản lý tài khoản</h3>
      <ul className={styles.list_items}>
        <li
          className={
            styles.li +
            ` ${
              window.location.pathname === "/tai-khoan/thong-tin-ca-nhan" &&
              styles.style_hover
            }`
          }
        >
          <img src={info} className={styles.img_li} />
          <Link to="/tai-khoan/thong-tin-ca-nhan">Thông tin cá nhân</Link>
        </li>
        <li
          className={
            styles.li +
            ` ${
              window.location.pathname === "/ThanhVien" && styles.style_hover
            }`
          }
        >
          <img src={pass} className={styles.img_li} />
          <Link to="/tai-khoan/doi-mat-khau">Đổi mật khẩu</Link>
        </li>
      </ul>
    </div>
  );
}

export default SubNav;

import styles from "../../Pages/DanhMuc/style.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import bellNav from "../../assets/icon/bellNav.png";
import personNav from "../../assets/icon/personNav.png";
import flatNav from "../../assets/icon/flatNav.png";
import infoAvata from "../../assets/icon/infoAvata.png";
import logOut from "../../assets/icon/logOut.png";

function NavBar() {
  const [showInfo, setShowInfo] = useState(false);
  function dangXuat() {
    localStorage.removeItem("token");
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/DangNhap";
    }
  }
  function Information() {
    return (
      <div className={styles.info_avata}>
        <div className={styles.icon_avata}>
          <img src={infoAvata} />
        </div>
        <h2 className={styles.info_name}>Nguyễn Văn A</h2>

        <Link
          to="/tai-khoan/thong-tin-ca-nhan"
          className={styles.btn_quan_ly_taiKhoan}
        >
          Quản lý tài khoản
        </Link>
        <div className={styles.log_out}>
          <button onClick={() => dangXuat()}>
            <img
              src={logOut}
              style={{ display: "inline-block", marginRight: "10px" }}
            />
            Đăng xuất
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.nav}>
      <Link to="/">
        <h3 className={styles.school}>Trường Đại học A</h3>
      </Link>
      <ul className={styles.nav_icons}>
        <li className={styles.flatNav}>
          <img src={flatNav} alt="flat" />
        </li>
        <li className={styles.bellNav}>
          <img src={bellNav} alt="bell" />
        </li>
        <li className={styles.personNav}>
          <button
            className={styles.btn_info_person}
            onClick={() => setShowInfo(!showInfo)}
          >
            <img src={personNav} alt="person" />
          </button>
          {showInfo && <Information />}
        </li>
      </ul>
    </div>
  );
}

export default NavBar;

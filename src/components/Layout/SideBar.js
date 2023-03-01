import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "../../Pages/DanhMuc/style.module.css";

import mainLogo from "../../assets/icon/mainLogo.png";
import categoryIcon from "../../assets/icon/categoryIcon.png";
import paticipantIcon from "../../assets/icon/paticipantIcon.png";
import fileIcon from "../../assets/icon/fileIcon.png";
import organizeIcon from "../../assets/icon/organizeIcon.png";
import arowIcon from "../../assets/icon/arowIcon.png";

function SideBar() {
  const [isOpenCategory, setIsOpenCategory] = useState(
    window.location.pathname.startsWith("/danh-muc/")
  );

  const [isOpenFile, setIsOpenFile] = useState(
    window.location.pathname.startsWith("/do-an/")
  );

  function handleOnClickArow() {
    setIsOpenCategory(!isOpenCategory);
  }

  function CategoryList() {
    return (
      <div>
        <ul className={styles.category_lists}>
          <li
            className={
              styles.li_category +
              ` ${
                window.location.pathname === "/danh-muc/nganh-nghe" &&
                styles.style_hover
              }`
            }
          >
            <Link to="/danh-muc/nganh-nghe">Ngành Nghề</Link>
          </li>
          <li
            className={
              styles.li_category +
              ` ${
                window.location.pathname === "/danh-muc/khoa" &&
                styles.style_hover
              }`
            }
          >
            <Link to="/danh-muc/khoa">Khóa</Link>
          </li>
          <li
            className={
              styles.li_category +
              ` ${
                window.location.pathname === "/danh-muc/lop" &&
                styles.style_hover
              }`
            }
          >
            <Link to="/danh-muc/lop">Lớp</Link>
          </li>
        </ul>
      </div>
    );
  }

  function FileList() {
    return (
      <div>
        <ul className={styles.file_lists}>
          <li
            className={
              styles.li_file +
              ` ${
                window.location.pathname === "/do-an/quan-ly-dot" &&
                styles.style_hover
              }`
            }
          >
            <Link to="/do-an/quan-ly-dot">Quản lý đợt</Link>
          </li>
          <li
            className={
              styles.li_file +
              ` ${
                window.location.pathname === "/do-an/kho-de-tai" &&
                styles.style_hover
              }`
            }
          >
            <Link to="/do-an/kho-de-tai">Kho đề tài</Link>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className={styles.sideBar}>
      <div className={styles.sideBar_logo}>
        <img src={mainLogo} className={styles.main_logo} />
      </div>
      <ul className={styles.list_items}>
        <li
          className={
            styles.li +
            ` ${
              window.location.pathname === "/ThanhVien" && styles.style_hover
            }`
          }
        >
          <img src={paticipantIcon} className={styles.img} />
          <Link to="/ThanhVien">Quản trị thành viên</Link>
        </li>
        <li className={styles.li}>
          <img src={categoryIcon} className={styles.img} />
          <span
            className={
              styles.span_category + ` ${isOpenCategory && styles.style_hover}`
            }
          >
            Danh mục
          </span>
          <button className={styles.btn_arow} onClick={handleOnClickArow}>
            <img src={arowIcon} className={styles.img} />
          </button>
          {isOpenCategory && <CategoryList />}
        </li>
        <li className={styles.li + " " + styles.li_DoAn}>
          <img src={fileIcon} className={styles.img} />
          <span
            className={
              styles.li_DanhMuc + ` ${isOpenFile && styles.style_hover}`
            }
          >
            Đồ án
          </span>
          <button
            className={styles.btn_arow}
            onClick={() => setIsOpenFile(!isOpenFile)}
          >
            <img src={arowIcon} className={styles.img} />
          </button>
          {isOpenFile && <FileList />}
        </li>
        <li
          className={
            styles.li +
            ` ${window.location.pathname === "/to-chuc" && styles.style_hover}`
          }
        >
          <img src={organizeIcon} className={styles.img} />
          <Link to="/to-chuc">Tổ chức</Link>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;

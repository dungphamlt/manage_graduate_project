import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./style.module.css";
import img1 from "../../assets/images/img1.png";
import img2 from "../../assets/images/img2.png";

function DangNhap() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [click, setClick] = useState(false);

  const token = localStorage.getItem("token");
  if (token && token !== "null") {
    window.location.href = "/ThanhVien";
  }
  function handleSubmit(e) {
    axios
      .post(
        "https://training.bks.center/api/auth/login",
        {},
        {
          params: {
            username: username,
            password: password,
          },
        }
      )
      .then(function (response) {
        console.log(response);
        localStorage.setItem("token", response.data.token);
        setClick(!click);
      });
  }

  return (
    <div className={styles.main}>
      <div className={styles.quanLy}>Quản lý đồ án</div>
      <div className={styles.LogInForm}>
        <h1 className={styles.dangnhap}>Đăng nhập</h1>

        <div>
          <label htmlFor="name" className={styles.lableName}>
            Tài khoản
          </label>
          <input
            type="text"
            id="name"
            className={styles.inputName}
            placeholder="Tài khoản"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="pass" className={styles.lablePass}>
            Mật khẩu
          </label>
          <input
            type="password"
            id="pass"
            className={styles.inputPass}
            placeholder="Mật khẩu"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className={styles.btnDangNhap} onClick={() => handleSubmit()}>
          Đăng nhập
        </button>
      </div>
      <div className={styles.image1}>
        <img src={img1} alt="image1" />
      </div>
      <div className={styles.image2}>
        <img src={img2} alt="image2" />
      </div>
    </div>
  );
}
export default DangNhap;

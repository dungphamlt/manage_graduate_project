import styles from "./styleTaiKhoan.module.css";

function PassPerson() {
  return (
    <div className={styles.main}>
      <div className={styles.sub_nav}>
        <div className={styles.title_to_chuc}>
          <h5 style={{ color: "#1890FF" }}>Đổi mật khẩu</h5>
        </div>
      </div>
      <div
        style={{
          width: "85%",
          float: "left",
          height: "83vh",
          position: "relative",
        }}
      >
        <div className={styles.to_chuc}>
          <div className={styles.form_thong_tin}>
            <div className={styles.form_left}>
              <h1 className={styles.thong_tin_truong}>Đổi mật khẩu</h1>
              <label htmlFor="pass" className={styles.lable_pass}>
                <span style={{ color: "red" }}> * </span>Mật khẩu cũ
              </label>
              <input
                type="password"
                id="pass"
                placeholder="nhập mật khẩu"
                className={styles.input_style}
              />
            </div>
            <div className={styles.form_right} style={{ marginTop: "54px" }}>
              <label htmlFor="passNew" className={styles.lable_passNew}>
                Mật khẩu mới
              </label>
              <input
                type="password"
                id="passNew"
                placeholder="Nhập mật khẩu mới"
                className={styles.input_style}
              />
              <label htmlFor="passNew1" className={styles.lable_passNew1}>
                Mật khẩu xác nhận
              </label>
              <input
                type="password"
                id="passNew1"
                placeholder="Nhập lại mật khẩu"
                className={styles.input_style}
              />
            </div>
          </div>
          <button className={styles.pass_cap_nhat}>Cập nhật</button>
        </div>
      </div>
    </div>
  );
}

export default PassPerson;

import React, { useState } from "react";
import request from "../../utils/request";
import styles from "./style.module.css";

import close from "../../assets/icon/close.png";

function ModuleSua({
  clickKhungSua,
  setSuaXoaNum,
  title,
  lable1,
  lable2,
  placeholder1,
  placeholder2,
  url,
  getApi,
}) {
  const [career, setCareer] = useState("");
  const [yearStart, setYearStart] = useState(0);
  const [maCode, setMaCode] = useState("");
  const [course, setCourse] = useState(0);

  function sua() {
    request({
      method: "PUT",
      url: url,
      params: {
        course_id: course,
        name: career,
        year: yearStart,
        code: maCode,
      },
      data: {},
    }).then((res) => {
      getApi();
      alert("đã cập nhật");
    });
    clickKhungSua();
    setSuaXoaNum(-1);
  }
  return (
    <div className={styles.Module_container}>
      <div className={styles.Module}>
        <div className={styles.Module_header}>
          <div className={styles.them_nganh_nghe}>{title}</div>
          <button
            className={styles.header_close}
            onClick={() => {
              clickKhungSua();
              setSuaXoaNum(-1);
            }}
          >
            <img src={close} />
          </button>
        </div>
        <div className={styles.Module_content}>
          <div className={styles.input_khoa}>
            <label htmlFor="input">{lable1}</label>
            <input
              type={"text"}
              id="input"
              placeholder={placeholder1}
              className={styles.Module_input}
              onChange={(e) => setCareer(e.target.value)}
            ></input>
          </div>
          <div className={styles.input_nam}>
            <label htmlFor="input_nam">{lable2}</label>
            <input
              type={"text"}
              id="input_nam"
              placeholder={placeholder2}
              className={styles.Module_input}
              onChange={(e) => {
                if (title === "Cập nhật ngành nghề") {
                  setMaCode(e.target.value);
                } else if (title === "Cập nhật khóa") {
                  setYearStart(e.target.value);
                } else {
                  setCourse(e.target.value);
                }
              }}
            ></input>
          </div>
        </div>
        <div className={styles.Module_footer}>
          <div className={styles.btn_footer}>
            <button
              className={styles.btn_huy}
              onClick={() => {
                clickKhungSua();
                setSuaXoaNum(-1);
              }}
            >
              Hủy
            </button>
            <button
              className={styles.btn_them}
              onClick={() => {
                sua();
              }}
            >
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModuleSua;

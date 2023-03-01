import React, { useState, useRef } from "react";
import request from "../../utils/request";
import styles from "./styleThanhVien.module.css";

import close from "../../assets/icon/close.png";
import SinhVien from "../../assets/icon/SinhVien.png";
import GiangVien from "../../assets/icon/GiangVien.png";
import QuanLy from "../../assets/icon/QuanLy.png";
import avataModule from "../../assets/icon/avataModule.png";
import cameraModule from "../../assets/icon/cameraModule.png";

function ModuleThanhVien({ setIsshow, getApiUser }) {
  const [khungThem, setKhungThem] = useState(false);
  const [khungLuaChon, setKhungLuaChon] = useState(true);
  const [title, setTitle] = useState("");
  console.log(title);

  function handleBtnTiepTuc() {
    setKhungThem(true);
    setKhungLuaChon(false);
  }

  function ModuleSelect() {
    const [titleText, setTitleText] = useState("");

    function handleClickInput() {
      setTitle(titleText);
    }

    return (
      <div className={styles.ModuleThanhVien_content}>
        <div className={styles.ModuleThanhVien_header}>
          <div className={styles.them_thanh_vien}>Thêm thành viên</div>
          <button className={styles.btn_close} onClick={() => setIsshow(false)}>
            <img src={close} />
          </button>
        </div>
        <div className={styles.ModuleThanhVien_body}>
          <div>
            <input
              type="radio"
              name="input"
              onClick={() => setTitleText("Thêm quản lý")}
              className={
                styles.input_quanly + " " + styles.display_inline_block
              }
            />
            <img
              src={QuanLy}
              className={styles.img_quanly + " " + styles.display_inline_block}
            />
            <span style={{ color: "#172B4D", fontWeight: "400" }}>Quản lý</span>
          </div>
          <div>
            <input
              type="radio"
              name="input"
              onClick={() => setTitleText("Thêm giảng viên")}
              className={
                styles.input_giangvien + " " + styles.display_inline_block
              }
            />
            <img
              src={GiangVien}
              className={
                styles.img_giangvien + " " + styles.display_inline_block
              }
            />
            <span style={{ color: "#172B4D", fontWeight: "400" }}>
              Giảng viên
            </span>
          </div>
          <div>
            <input
              type="radio"
              name="input"
              onClick={() => setTitleText("Thêm sinh viên")}
              className={
                styles.input_sinhvien + " " + styles.display_inline_block
              }
            />
            <img
              src={SinhVien}
              className={
                styles.img_sinhvien + " " + styles.display_inline_block
              }
            />
            <span style={{ color: "#172B4D", fontWeight: "400" }}>
              Sinh viên
            </span>
          </div>
        </div>
        <div className={styles.ModuleThanhVien_footer}>
          <div>
            <button className={styles.btn_huy} onClick={() => setIsshow(false)}>
              Hủy
            </button>
            <button
              className={styles.btn_tiepTuc}
              onClick={() => {
                handleBtnTiepTuc();
                handleClickInput();
              }}
            >
              Tiếp tục
            </button>
          </div>
        </div>
      </div>
    );
  }

  function ModuleAdd() {
    const fileRef = useRef();
    const [imgFile, setImgFile] = useState(null);
    const [addThanhVien, setAddThanhVien] = useState({
      Name: "",
      Birthday: "01/01/2000",
      Email: "",
      Address: "",
      TaiKhoan: "",
      PassWord: "",
      Gender: "",
      Phone: "",
      Work: "",
      Note: "",
      Type: "",
      studentCode: "",
    });
    const data = {
      address: addThanhVien.Address,
      avatar: 0,
      birthday: addThanhVien.Birthday,
      classId: 0,
      courseId: 0,
      email: addThanhVien.Email,
      enabled: true,
      fieldId: 0,
      fullName: addThanhVien.Name,
      gender: addThanhVien.Gender,
      note: addThanhVien.Note,
      password: addThanhVien.PassWord,
      phone: addThanhVien.Phone,
      studentCode: addThanhVien.studentCode,
      teacherType: true,
      type: title,
      username: addThanhVien.TaiKhoan,
    };
    const value = JSON.stringify(data);
    function getApiAddThanhVien() {
      request({
        method: "POST",
        url: "/api/admin/user",
        params: {},
        data: value,
      }).then((res) => {
        getApiUser();
        alert("thêm thành công");
      });

      setIsshow(false);
    }
    console.log(addThanhVien);
    console.log(title);
    function AddQuanLy() {
      return (
        <div className={styles.input_work}>
          <label htmlFor="input_work">Học tập và làm việc</label>
          <input
            id="input_work"
            placeholder="Nhập thông tin"
            className={styles.style_input}
          ></input>
        </div>
      );
    }
    function AddGiangVien() {
      return (
        <div className={styles.body_info}>
          <div className={styles.body_left}>
            <div className={styles.input_hinh_thuc}>
              <label htmlFor="input_hinh_thuc">Hình thức</label>
              <input
                id="input_hinh_thuc"
                placeholder="Chọn hình thức"
                className={styles.style_input}
              ></input>
            </div>
          </div>
          <div className={styles.body_right}>
            <div className={styles.input_chuyen_nganh}>
              <label htmlFor="input_chuyen_nganh">Chuyên ngành</label>
              <input
                id="input_chuyen_nganh"
                placeholder="Chọn chuyên ngành"
                className={styles.style_input}
              ></input>
            </div>
          </div>
        </div>
      );
    }
    function AddSinhVien() {
      return (
        <div className={styles.body_info}>
          <div className={styles.body_left}>
            <div className={styles.input_maSv}>
              <label htmlFor="input_maSv">Mã sinh viên</label>
              <input
                id="input_maSv"
                placeholder="Nhập mã"
                className={styles.style_input}
              ></input>
            </div>
            <div className={styles.input_khoa}>
              <label htmlFor="input_khoa">Khóa</label>
              <input
                id="input_khoa"
                placeholder="Chọn khóa"
                className={styles.style_input}
              ></input>
            </div>
          </div>
          <div className={styles.body_right}>
            <div className={styles.input_chuyen_nganh}>
              <label htmlFor="input_chuyen_nganh">Chuyên ngành</label>
              <input
                id="input_chuyen_nganh"
                placeholder="Chọn chuyên ngành"
                className={styles.style_input}
              ></input>
            </div>
            <div className={styles.input_lop}>
              <label htmlFor="input_lop">Lớp</label>
              <input
                id="input_lop"
                placeholder="Chọn lớp"
                className={styles.style_input}
              ></input>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.ModuleThanhVien_content}>
        <div className={styles.ModuleThanhVien_header}>
          <div className={styles.them_thanh_vien}>{title}</div>
          <button className={styles.btn_close} onClick={() => setIsshow(false)}>
            <img src={close} />
          </button>
        </div>
        <div className={styles.ModuleAdd_body}>
          <div className={styles.body}>
            <div className={styles.body_info}>
              <div className={styles.body_left}>
                <div className={styles.avata}>
                  {!imgFile && (
                    <img src={avataModule} className={styles.img_avata} />
                  )}
                  {imgFile && (
                    <img src={imgFile} className={styles.img_avata} />
                  )}
                  <img
                    src={cameraModule}
                    onClick={() => {
                      fileRef.current.click();
                    }}
                    className={styles.img_camera}
                  />
                  <input
                    type="file"
                    className="hidden"
                    ref={fileRef}
                    onChange={(e) => {
                      const files = e.target.files[0];
                      const imgURL = URL.createObjectURL(files);
                      setImgFile(imgURL);
                      const formData = new FormData();
                      formData.append("upload", files);
                      request({
                        method: "POST",
                        data: formData,
                        url: "/api/file/upload",
                        headers: {
                          "Content-Type": "multipart/form-data",
                        },
                      }).then((res) => {
                        setAddThanhVien((preState) => ({
                          ...preState,
                          studentCode: res.data.pathOnServer,
                        }));
                        console.log(res);
                      });
                    }}
                  />
                </div>
                <div className={styles.input_name}>
                  <label htmlFor="input_name">Họ và tên</label>
                  <input
                    id="input_name"
                    placeholder="Nhập họ và tên"
                    className={styles.style_input}
                    onChange={(e) =>
                      setAddThanhVien((preState) => ({
                        ...preState,
                        Name: e.target.value,
                      }))
                    }
                  ></input>
                </div>
                <div className={styles.input_date}>
                  <label htmlFor="input_date">Ngày sinh</label>
                  <input
                    type="date"
                    id="input_date"
                    placeholder="Chọn ngày"
                    className={styles.style_input}
                    onChange={(e) =>
                      setAddThanhVien((preState) => ({
                        ...preState,
                        Birthday: e.target.value,
                      }))
                    }
                  ></input>
                </div>
                <div className={styles.input_email}>
                  <label htmlFor="input_email">Email</label>
                  <input
                    type="email"
                    id="input_email"
                    placeholder="Nhập email"
                    className={styles.style_input}
                    onChange={(e) =>
                      setAddThanhVien((preState) => ({
                        ...preState,
                        Email: e.target.value,
                      }))
                    }
                  ></input>
                </div>
              </div>
              <div className={styles.body_right}>
                <div className={styles.input_tai_khoan}>
                  <label htmlFor="input_tai_khoan">Tài khoản</label>
                  <input
                    id="input_tai_khoan"
                    placeholder="Nhập tài khoản"
                    className={styles.style_input}
                    onChange={(e) =>
                      setAddThanhVien((preState) => ({
                        ...preState,
                        TaiKhoan: e.target.value,
                      }))
                    }
                  ></input>
                </div>
                <div className={styles.input_pass}>
                  <label htmlFor="input_pass">Mật khẩu</label>
                  <input
                    type="password"
                    id="input_pass"
                    placeholder="Nhập mật khẩu"
                    className={styles.style_input}
                    onChange={(e) =>
                      setAddThanhVien((preState) => ({
                        ...preState,
                        PassWord: e.target.value,
                      }))
                    }
                  ></input>
                </div>
                <div className={styles.input_gender}>
                  <label htmlFor="input_gender">Giới tính</label>
                  <input
                    type="radio"
                    className={styles.margin_radio}
                    onChange={(e) =>
                      setAddThanhVien((preState) => ({
                        ...preState,
                        Gender: 1,
                      }))
                    }
                  />
                  Nam
                  <input
                    type="radio"
                    className={styles.margin_radio}
                    onChange={(e) =>
                      setAddThanhVien((preState) => ({
                        ...preState,
                        Gender: 0,
                      }))
                    }
                  />
                  Nữ
                  <input
                    type="radio"
                    className={styles.margin_radio}
                    onChange={(e) =>
                      setAddThanhVien((preState) => ({
                        ...preState,
                        Gender: "Khác",
                      }))
                    }
                  />
                  Khác
                </div>
                <div className={styles.input_phone}>
                  <label htmlFor="input_phone">Số điện thoại</label>
                  <input
                    type="number"
                    id="input_phone"
                    placeholder="Nhập số điện thoại"
                    className={styles.style_input}
                    onChange={(e) =>
                      setAddThanhVien((preState) => ({
                        ...preState,
                        Phone: e.target.value,
                      }))
                    }
                  ></input>
                </div>
              </div>
            </div>
            <div className={styles.input_address}>
              <label htmlFor="input_address">Địa chỉ</label>
              <input
                id="input_address"
                placeholder="Nhập địa chỉ"
                className={styles.style_input}
                onChange={(e) =>
                  setAddThanhVien((preState) => ({
                    ...preState,
                    Address: e.target.value,
                  }))
                }
              ></input>
            </div>
            {title === "Thêm quản lý" ? (
              <AddQuanLy />
            ) : title === "Thêm giảng viên" ? (
              <AddGiangVien />
            ) : (
              <AddSinhVien />
            )}
            <div className={styles.input_note}>
              <label htmlFor="input_note">Ghi chú</label>
              <input
                id="input_note"
                placeholder="Nhập ghi chú"
                className={styles.style_input}
                onChange={(e) =>
                  setAddThanhVien((preState) => ({
                    ...preState,
                    Note: e.target.value,
                  }))
                }
              ></input>
            </div>
          </div>
        </div>
        <div className={styles.ModuleThanhVien_footer}>
          <div>
            <button className={styles.btn_huy} onClick={() => setIsshow(false)}>
              Hủy
            </button>
            <button
              className={styles.btn_tiepTuc}
              onClick={() => getApiAddThanhVien()}
            >
              Thêm
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.ModuleThanhVien_container}>
      {khungLuaChon && <ModuleSelect />}
      {khungThem && <ModuleAdd />}
    </div>
  );
}

export default ModuleThanhVien;

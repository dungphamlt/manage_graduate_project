import { useState, useRef } from "react";
import styles from "./styleTaiKhoan.module.css";
import iconPerson from "../../assets/icon/iconPerson.png";
import cameraToChuc from "../../assets/icon/cameraToChuc.png";
import request from "../../utils/request";

function InfoPerson() {
  const [sua, setSua] = useState(true);
  const [showAvata, setShowAvata] = useState(false);
  const [capnhat, setCapnhat] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const fileRef = useRef();
  const [infoUpdate, setInfoUpdate] = useState({
    fullName: "Bùi Thị F",
    userName: "abcName",
    birthday: "06/09/1999",
    email: "buithifabcd@gmail.com",
    gender: 0,
    phone: "09999999",
    address: "1 Đại Cồ Việt,Bách Khoa, Hà Nội",
  });

  function handleSua() {
    setSua(!sua);
    setCapnhat(!capnhat);
  }

  function KhungTaiAnh() {
    return (
      <div className={styles.khung_tai_anh}>
        <button
          className={styles.btn_tai_anh}
          onClick={() => {
            fileRef.current.click();
          }}
        >
          Tải ảnh
        </button>

        <button className={styles.btn_xoa_anh}>Xóa</button>
      </div>
    );
  }

  function CapNhat() {
    const [infoSua, setInfoSua] = useState({
      fullNameSua: "Bùi Thị F",
      userNameSua: "btf123",
      birthdaySua: "06/12/1999",
      emailSua: "buithif@gmail.com",
      genderSua: 0,
      phoneSua: "0777777777",
      addressSua: "số 1 Đại Cồ Việt, Bách Khoa, Hà Nội",
    });
    function handleCapNhat() {
      setSua(!sua);
      setCapnhat(!capnhat);
      setInfoUpdate((preState) => ({
        ...preState,
        fullName: infoSua.fullNameSua,
        userName: infoSua.userNameSua,
        birthday: infoSua.birthdaySua,
        email: infoSua.emailSua,
        gender: infoSua.genderSua,
        phone: infoSua.phoneSua,
        address: infoSua.addressSua,
      }));
    }
    return (
      <div>
        <div className={styles.to_chuc_header}>
          <div className={styles.icon_to_chuc} style={{ position: "relative" }}>
            {!imgFile && (
              <img
                src={iconPerson}
                style={{ width: "120px", height: "120px" }}
              />
            )}
            {imgFile && (
              <img src={imgFile} style={{ width: "120px", height: "120px" }} />
            )}

            <div
              className={styles.btn_avata_school}
              style={{ position: "absolute", top: "80px", right: "0px" }}
              onClick={() => setShowAvata(!showAvata)}
            >
              <img src={cameraToChuc} />
              {showAvata && <KhungTaiAnh />}
            </div>
          </div>
          <div className={styles.truong}>
            <label htmlFor="name" className={styles.lable_truong}>
              Họ và tên
            </label>
            <input
              type="text"
              id="name"
              placeholder="Nhập tên"
              className={styles.input_style}
              onChange={(e) =>
                setInfoSua((preState) => ({
                  ...preState,
                  fullNameSua: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <div>
          <div className={styles.form_thong_tin}>
            <div className={styles.form_left}>
              <h1 className={styles.thong_tin_truong}>Thông tin cá nhân</h1>
              <label htmlFor="taikhoan" className={styles.lable_taikhoan}>
                <span style={{ color: "red" }}> * </span>Tài khoản
              </label>
              <input
                type="text"
                id="taikhoan"
                placeholder="nhập tên user"
                className={styles.input_style}
                onChange={(e) =>
                  setInfoSua((preState) => ({
                    ...preState,
                    userNameSua: e.target.value,
                  }))
                }
              />
              <label htmlFor="birthday" className={styles.lable_birthday}>
                Ngày sinh
              </label>
              <input
                type="date"
                id="birthday"
                placeholder="Chọn ngày sinh"
                className={styles.input_style}
                onChange={(e) =>
                  setInfoSua((preState) => ({
                    ...preState,
                    birthdaySua: e.target.value,
                  }))
                }
              />
              <label htmlFor="email" className={styles.lable_email}>
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="nhập email"
                className={styles.input_style}
                onChange={(e) =>
                  setInfoSua((preState) => ({
                    ...preState,
                    emailSua: e.target.value,
                  }))
                }
              />
            </div>
            <div className={styles.form_right}>
              <div
                className={styles.input_gender}
                style={{ marginBottom: "24px" }}
              >
                <label
                  className={styles.lable_gender}
                  style={{ display: "block", marginBottom: "8px" }}
                >
                  Giới tính
                </label>
                <input
                  type="radio"
                  name="thue"
                  style={{ marginRight: "10px", marginLeft: "20px" }}
                  onChange={(e) =>
                    setInfoSua((preState) => ({
                      ...preState,
                      genderSua: 1,
                    }))
                  }
                />
                Nam
                <input
                  type="radio"
                  name="thue"
                  style={{ marginRight: "10px", marginLeft: "20px" }}
                  onChange={(e) =>
                    setInfoSua((preState) => ({
                      ...preState,
                      genderSua: 0,
                    }))
                  }
                />
                Nữ
                <input
                  type="radio"
                  name="thue"
                  style={{ marginRight: "10px", marginLeft: "20px" }}
                  onChange={(e) =>
                    setInfoSua((preState) => ({
                      ...preState,
                      genderSua: 2,
                    }))
                  }
                />
                Khác
              </div>
              <label htmlFor="phone" className={styles.lable_phone}>
                <span style={{ color: "red" }}>*</span>Số điện thoại
              </label>
              <input
                type="number"
                id="phone"
                placeholder="nhập số điện thoại"
                className={styles.input_style}
                onChange={(e) =>
                  setInfoSua((preState) => ({
                    ...preState,
                    phoneSua: e.target.value,
                  }))
                }
              />
              <label htmlFor="address" className={styles.lable_address}>
                Địa chỉ
              </label>
              <input
                type="text"
                id="address"
                placeholder="Nhập địa chỉ"
                className={styles.input_style}
                onChange={(e) =>
                  setInfoSua((preState) => ({
                    ...preState,
                    addressSua: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <button className={styles.to_chuc_btnCapNhat} onClick={handleCapNhat}>
            Cập nhật
          </button>
        </div>
      </div>
    );
  }

  function Sua() {
    return (
      <div>
        <button className={styles.to_chuc_btnSua} onClick={() => handleSua()}>
          Sửa
        </button>
        <div className={styles.to_chuc_header}>
          <div className={styles.icon_to_chuc} style={{ position: "relative" }}>
            {!imgFile && (
              <img
                src={iconPerson}
                style={{ width: "120px", height: "120px" }}
              />
            )}
            {imgFile && (
              <img src={imgFile} style={{ width: "120px", height: "120px" }} />
            )}

            <div
              className={styles.btn_avata_school}
              style={{ position: "absolute", top: "80px", right: "0px" }}
              onClick={() => setShowAvata(!showAvata)}
            >
              <img src={cameraToChuc} />
              {showAvata && <KhungTaiAnh />}
            </div>
          </div>
          <div className={styles.truong}>
            <div className={styles.lable_truong}>{infoUpdate.fullName}</div>
          </div>
        </div>
        <div>
          <div className={styles.form_thong_tin} style={{ border: "none" }}>
            <div className={styles.form_left}>
              <h1 className={styles.thong_tin_truong}>Thông tin cá nhân</h1>
              <div className={styles.title_toChuc}>Tài khoản</div>
              <div>{infoUpdate.userName}</div>
              <div className={styles.title_toChuc}>Ngày sinh</div>
              <div>{infoUpdate.birthday}</div>
              <div className={styles.title_toChuc}>Email</div>
              <div>{infoUpdate.email}</div>
            </div>
            <div className={styles.form_right_new}>
              <div className={styles.title_toChuc}>Giới tính</div>
              <div>
                {infoUpdate.gender === 0
                  ? "Nữ"
                  : infoUpdate.gender === 1
                  ? "Nam"
                  : "Khác"}
              </div>
              <div className={styles.title_toChuc}>Số điện thoại</div>
              <div>{infoUpdate.phone}</div>
              <div className={styles.title_toChuc}>Địa chỉ</div>
              <div>{infoUpdate.address}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <div className={styles.sub_nav}>
        <div className={styles.title_to_chuc}>
          <h5>Thông tin cá nhân</h5>
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
          {sua && <Sua />}
          {capnhat && <CapNhat />}
          <input
            type="file"
            style={{ display: "none" }}
            ref={fileRef}
            onChange={(e) => {
              const files = e.target.files[0];
              const imgURL = URL.createObjectURL(files);
              console.log(imgURL);
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
                console.log(res);
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default InfoPerson;

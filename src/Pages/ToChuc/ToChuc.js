import { useState, useEffect, useRef } from "react";
import styles from "../DanhMuc/style.module.css";
import logoToChuc from "../../assets/icon/logoToChuc.png";
import cameraToChuc from "../../assets/icon/cameraToChuc.png";
import request from "../../utils/request";

function ToChuc() {
  const [sua, setSua] = useState(true);
  const [showAvata, setShowAvata] = useState(false);
  const [capnhat, setCapnhat] = useState(false);
  const [school, setSchool] = useState("Trường Đại Học A");
  const [email, setEmail] = useState("abc@gmail.com");
  const [phone, setPhone] = useState("0988666888");
  const [address, setAdress] = useState("Địa chỉ A");
  const [thue, setThue] = useState("PM123");
  const [websize, setWebsize] = useState("http:abc.vn");
  const [imgFile, setImgFile] = useState(null);
  const fileRef = useRef();

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
    const [schoolText, setSchoolText] = useState(school);
    const [emailText, setEmailText] = useState(email);
    const [phoneText, setPhoneText] = useState(phone);
    const [addressText, setAddressText] = useState(address);
    const [thueText, setThueText] = useState(thue);
    const [websizeText, setWebsizeText] = useState(websize);
    function handleCapNhat() {
      setSua(!sua);
      setCapnhat(!capnhat);
      setSchool(schoolText);
      setPhone(phoneText);
      setEmail(emailText);
      setAdress(addressText);
      setThue(thueText);
      setWebsize(websizeText);
    }
    return (
      <div>
        <div className={styles.to_chuc_header}>
          <div className={styles.icon_to_chuc}>
            <img src={logoToChuc} />
          </div>
          <div className={styles.truong}>
            <label htmlFor="truong" className="text-[#172B4D] text-lg">
              Tên trường
            </label>
            <input
              value={schoolText}
              type="text"
              id="truong"
              placeholder="Nhập tên trường"
              className={styles.input_style}
              onChange={(e) => setSchoolText(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div className={styles.form_thong_tin}>
            <div className={styles.form_left}>
              <h1 className={styles.thong_tin_truong}>Thông tin trường</h1>
              <label htmlFor="email" className={styles.lable_email}>
                Email
              </label>
              <input
                value={emailText}
                type="text"
                id="email"
                placeholder="nhập email"
                className={styles.input_style}
                onChange={(e) => setEmailText(e.target.value)}
              />
              <label htmlFor="sdt" className={styles.lable_sdt}>
                Số điện thoại
              </label>
              <input
                value={phoneText}
                type="text"
                id="sdt"
                placeholder="nhập số điện thoại"
                className={styles.input_style}
                onChange={(e) => setPhoneText(e.target.value)}
              />
              <label htmlFor="address" className={styles.lable_address}>
                Địa chỉ
              </label>
              <input
                value={addressText}
                type="text"
                id="address"
                placeholder="nhập địa chỉ"
                className={styles.input_style}
                onChange={(e) => setAddressText(e.target.value)}
              />
            </div>
            <div className={styles.form_right}>
              <label htmlFor="thue" className={styles.lable_thue}>
                Mã số thuế
              </label>
              <input
                value={thueText}
                type="text"
                id="thue"
                placeholder="nhập mã số thuế"
                className={styles.input_style}
                onChange={(e) => setThueText(e.target.value)}
              />
              <label htmlFor="websize" className={styles.lable_websize}>
                Websize
              </label>
              <input
                value={websizeText}
                type="text"
                id="websize"
                placeholder="websize"
                className={styles.input_style}
                onChange={(e) => setWebsizeText(e.target.value)}
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
                src={logoToChuc}
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
            <div className="text-[#172B4D] text-lg">{school}</div>
          </div>
        </div>
        <div>
          <div className={styles.form_thong_tin} style={{ border: "none" }}>
            <div className={styles.form_left}>
              <h1 className={styles.thong_tin_truong}>Thông tin trường</h1>
              <div className={styles.title_toChuc}>Email</div>
              <div>{email}</div>
              <div className={styles.title_toChuc}>Số điện thoại</div>
              <div>{phone}</div>
              <div className={styles.title_toChuc}>Địa chỉ</div>
              <div>{address}</div>
            </div>
            <div className={styles.form_right_new}>
              <div className={styles.title_toChuc}>Mã số thuế</div>
              <div>{thue}</div>
              <div className={styles.title_toChuc}>Websize</div>
              <div>{websize}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className={styles.sub_nav}>
        <div className={styles.nganhNghe}>
          <h5>Tổ chức</h5>
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

export default ToChuc;

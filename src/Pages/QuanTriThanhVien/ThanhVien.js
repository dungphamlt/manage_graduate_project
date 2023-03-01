import { useState, useEffect } from "react";
import styles from "../DanhMuc/style.module.css";
import ModuleThanhVien from "./ModuleThanhVien";
import ModuleSuaThanhVien from "./ModuleSuaThanhVien";
import PhanTrang from "../../components/PhanTrang";

import tamgiacTable from "../../assets/icon/tamgiacTable.png";
import vectorTable from "../../assets/icon/vectorTable.png";
import filterTable from "../../assets/icon/filterTable.png";
import settingTable from "../../assets/icon/settingTable.png";
import request from "../../utils/request";
import SinhVien from "../../assets/icon/SinhVien.png";
import GiangVien from "../../assets/icon/GiangVien.png";
import QuanLy from "../../assets/icon/QuanLy.png";

function ThanhVien() {
  const [isshow, setIsshow] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [totalPage, setTotalPage] = useState(0);
  const [suaXoaNum, setSuaXoaNum] = useState(-1);
  const [khungSua, setKhungSua] = useState(false);

  function getApiUser() {
    request({
      method: "GET",
      url: "/api/admin/user",
      params: {
        page_index: page,
        page_size: size,
      },
      data: {},
    }).then((response) => {
      console.log(response);
      setData(response.data);
      const totalRecord = response.data.length;
      console.log(totalRecord);
      console.log(data);
      setTotalPage(Math.ceil(totalRecord / size));
    });
  }

  useEffect(() => {
    getApiUser();
  }, [page]);

  function deleteApi(id) {
    request({
      method: "DELETE",
      url: `/api/admin/user/${id.id}`,
      data: {},
    }).then((res) => {
      getApiUser();
      alert("xóa thành công");
    });
    setSuaXoaNum(-1);
  }

  function clickKhungSuaXoa(index) {
    if (suaXoaNum >= 0) {
      setSuaXoaNum(-1);
      return;
    }

    setSuaXoaNum(index);
    setKhungSua(false);
  }
  function clickKhungSua() {
    setKhungSua(!khungSua);
  }

  function TableThanhVien() {
    function SuaXoa({ id, type, value }) {
      return (
        <div className={styles.khung_suaxoa}>
          <button className={styles.btn_sua} onClick={() => clickKhungSua()}>
            Sửa
          </button>
          {khungSua && (
            <ModuleSuaThanhVien
              clickKhungSuaXoa={clickKhungSuaXoa}
              getApiUser={getApiUser}
              setSuaXoaNum={setSuaXoaNum}
              title={type}
              element={value}
            />
          )}
          <button className={styles.btn_xoa} onClick={() => deleteApi(id)}>
            Xóa
          </button>
        </div>
      );
    }

    return (
      <div className={styles.main_nganhNghe}>
        <table className={styles.table_nganhNghe}>
          <tbody>
            <tr className={styles.th_nganhNghe}>
              <td className={styles.td1_nganhNghe} id={styles.td1_stt}>
                STT
              </td>
              <td className={styles.td1_nganhNghe} id={styles.td1_img}>
                <img src={vectorTable} id={styles.td1_img1} />
              </td>
              <td className={styles.td1_nganhNghe}>
                <img src={tamgiacTable} className={styles.img_tamgiac} />
                Họ và tên
              </td>
              <td className={styles.td1_nganhNghe}>
                <img src={tamgiacTable} className={styles.img_tamgiac} />
                Số điện thoại
              </td>
              <td className={styles.td1_nganhNghe}>
                <img src={tamgiacTable} className={styles.img_tamgiac} />
                Email
              </td>
              <td className={styles.td1_nganhNghe}>
                <img src={tamgiacTable} className={styles.img_tamgiac} />
                Địa chỉ
              </td>
              <td className={styles.td1_nganhNghe}>
                <img src={tamgiacTable} className={styles.img_tamgiac} />
                Giới tính
              </td>
              <td className={styles.td1_nganhNghe}>
                <img src={tamgiacTable} className={styles.img_tamgiac} />
                Ngày sinh
              </td>
            </tr>
          </tbody>

          <tbody>
            <tr className={styles.tr_timKiem}>
              <td>
                <button>
                  <img src={filterTable} className={styles.border_timKiem} />
                </button>
              </td>
              <td style={{ minWidth: "100px" }}>
                <button className={styles.border_timKiem}>Tìm kiếm</button>
              </td>
              <td>
                <input className={styles.border_timKiem} />
              </td>
              <td>
                <input className={styles.border_timKiem} />
              </td>
              <td>
                <input className={styles.border_timKiem} />
              </td>
              <td>
                <input className={styles.border_timKiem} />
              </td>
              <td>
                <input className={styles.border_timKiem} />
              </td>
              <td>
                <input className={styles.border_timKiem} />
              </td>
            </tr>
          </tbody>

          {data.map((value, index) => {
            return (
              <tbody key={index}>
                <tr>
                  <td style={{ textAlign: "center" }}>{index + 1}</td>
                  <td className={styles.btn_khungSuaXoa}>
                    <button onClick={() => clickKhungSuaXoa(index)}>
                      <img
                        src={settingTable}
                        style={{ transform: "translateX(25px)" }}
                      />
                    </button>
                    {suaXoaNum === index && (
                      <SuaXoa id={value.id} type={value.type} value={value} />
                    )}
                  </td>
                  <td>
                    {data[index].type === "Thêm quản lý" ? (
                      <img
                        src={QuanLy}
                        style={{ display: "inline-block", marginRight: "10px" }}
                      />
                    ) : data[index].type === "Thêm giảng viên" ? (
                      <img
                        src={GiangVien}
                        style={{ display: "inline-block", marginRight: "10px" }}
                      />
                    ) : (
                      <img
                        src={SinhVien}
                        style={{ display: "inline-block", marginRight: "17px" }}
                      />
                    )}
                    {value.fullName}
                  </td>
                  <td>{value.phone}</td>
                  <td>{value.email}</td>
                  <td>{value.address}</td>
                  <td>{value.gender === 1 ? "Nam" : "Nữ"}</td>
                  <td>{value.birthday}</td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.sub_nav}>
        <div className={styles.nganhNghe}>
          <h5>Thành viên</h5>
        </div>
        <button
          className={styles.btn_add_nganhNghe}
          onClick={() => setIsshow(true)}
        >
          + Thêm thành viên
        </button>
        {isshow && (
          <ModuleThanhVien setIsshow={setIsshow} getApiUser={getApiUser} />
        )}
      </div>
      <TableThanhVien />

      {/* Phân Trang */}
      <PhanTrang page={page} setPage={setPage} totalPage={totalPage} />
    </div>
  );
}

export default ThanhVien;

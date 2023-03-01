import { useState, useEffect } from "react";
import styles from "../DanhMuc/style.module.css";
import request from "../../utils/request";
import Module from "../DanhMuc/Module";
import PhanTrang from "../../components/PhanTrang";

import tamgiacTable from "../../assets/icon/tamgiacTable.png";
import vectorTable from "../../assets/icon/vectorTable.png";
import filterTable from "../../assets/icon/filterTable.png";
import settingTable from "../../assets/icon/settingTable.png";

function QuanLyDot() {
  const [isshow, setIsshow] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [totalPage, setTotalPage] = useState(0);
  const [newData, setNewData] = useState([]);
  const [isSuaXoa, setIsSuaXoa] = useState(false);
  const [totalThanhVien, setTotalThanhVien] = useState(0);

  function handleData() {
    // page 1 - 0 ->5
    // page 2 - 5->10
    setNewData(data.slice((page - 1) * size, page * size));
    console.log("render");
  }

  useEffect(() => {
    request({
      method: "GET",
      url: "/api/project-group",
      params: {},
      data: {},
    }).then((response) => {
      console.log(response);
      const responseData = response.data;
      setData(responseData);
      // Tinh so trang
      const totalRecord = responseData.length;
      setTotalThanhVien(totalRecord);
      setTotalPage(Math.ceil(totalRecord / size));
    });
  }, []);

  useEffect(() => {
    handleData();
  }, [data, page]);

  function TableDot() {
    function SuaXoa() {
      return (
        <div className={styles.khung_suaxoa}>
          <button className={styles.btn_sua}>Sửa</button>
          <button className={styles.btn_xoa}>Xóa</button>
        </div>
      );
    }

    return (
      <div className={styles.main_nganhNghe}>
        <table className={styles.table_nganhNghe}>
          <tr className={styles.th_nganhNghe}>
            <td className={styles.td1_nganhNghe} id={styles.td1_stt}>
              STT
            </td>
            <td className={styles.td1_nganhNghe} id={styles.td1_img}>
              <img src={vectorTable} id={styles.td1_img1} />
            </td>
            <td className={styles.td1_nganhNghe}>
              <img src={tamgiacTable} className={styles.img_tamgiac} />
              Áp dụng đề tài của năm
            </td>
            <td className={styles.td1_nganhNghe}>
              <img src={tamgiacTable} className={styles.img_tamgiac} />
              Tên đợt
            </td>
            <td className={styles.td1_nganhNghe}>
              <img src={tamgiacTable} className={styles.img_tamgiac} />
              Thời gian bắt đầu
            </td>
            <td className={styles.td1_nganhNghe}>
              <img src={tamgiacTable} className={styles.img_tamgiac} />
              Thời gian kết thúc
            </td>
          </tr>

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
              <input type={"text"} className={styles.border_timKiem} />
            </td>
            <td>
              <input type={"text"} className={styles.border_timKiem} />
            </td>
            <td>
              <input type={"text"} className={styles.border_timKiem} />
            </td>
            <td>
              <input type={"text"} className={styles.border_timKiem} />
            </td>
          </tr>

          {newData.map((value, index) => {
            return (
              <tr key={index}>
                <td style={{ textAlign: "center" }}>
                  {(page - 1) * size + index + 1}
                </td>
                <td className={styles.btn_khungSuaXoa}>
                  <button onClick={() => setIsSuaXoa(!isSuaXoa)}>
                    <img
                      src={settingTable}
                      style={{ transform: "translateX(30px)" }}
                    />
                  </button>
                  {isSuaXoa && <SuaXoa />}
                </td>
                <td>Mã {value.id}</td>
                <td>{value.name}</td>
                <td>{value.name}</td>
                <td>{value.name}</td>
              </tr>
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
          <h5>{`Đợt (${totalThanhVien})`}</h5>
        </div>
        <button
          className={styles.btn_add_nganhNghe}
          onClick={() => setIsshow(true)}
        >
          + Thêm đợt
        </button>
        {isshow && (
          <Module
            title="Thêm đợt"
            lable="Tên đợt"
            placeholder="Nhập tên đợt"
            setIsshow={setIsshow}
            url="/api/project-group"
          />
        )}
      </div>
      <TableDot />
      <PhanTrang page={page} setPage={setPage} totalPage={totalPage} />
    </div>
  );
}

export default QuanLyDot;

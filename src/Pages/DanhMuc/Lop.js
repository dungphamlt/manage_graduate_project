import { useState, useEffect } from "react";
import styles from "./style.module.css";

import Module from "./Module";
import ModuleSua from "./ModuleSua";
import PhanTrang from "../../components/PhanTrang";
import sortData from "../../components/sortData/sortData";

import tamgiacTable from "../../assets/icon/tamgiacTable.png";
import vectorTable from "../../assets/icon/vectorTable.png";
import filterTable from "../../assets/icon/filterTable.png";
import settingTable from "../../assets/icon/settingTable.png";
import request from "../../utils/request";

function Lop() {
  const [isshow, setIsshow] = useState(false);
  const [showKhungSua, setShowKhungSua] = useState(false);
  const [data, setData] = useState([]);
  const [suaXoaNum, setSuaXoaNum] = useState(-1);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(3);
  const [totalPage, setTotalPage] = useState(0);
  const [newData, setNewData] = useState([]);
  const [totalLop, setTotalLop] = useState(0);
  const [dataSort, setDataSort] = useState(false);

  function handleData() {
    // page 1 - 0 ->5
    // page 2 - 5->10
    setNewData(data.slice((page - 1) * size, page * size));
  }

  function getApiClass() {
    request({
      method: "GET",
      url: "/api/class",
      params: {},
      data: {},
    }).then((response) => {
      console.log(response);
      setData(response.data);
      // tính tổng số trang
      const totalRecord = response.data.length;
      setTotalLop(totalRecord);
      setTotalPage(Math.ceil(totalRecord / size));
    });
  }

  useEffect(() => {
    getApiClass();
  }, []);

  useEffect(() => {
    handleData();
  }, [page, data]);

  function clickKhungSuaXoa(index) {
    if (suaXoaNum >= 0) {
      setSuaXoaNum(-1);
      return;
    }
    setSuaXoaNum(index);
  }

  function clickKhungSua() {
    setShowKhungSua(!showKhungSua);
  }

  function deleteApi(id) {
    request({
      method: "DELETE",
      url: `/api/class/${id.id}`,
      data: {},
    }).then((res) => {
      getApiClass();
      alert("xóa thành công");
    });
    setSuaXoaNum(-1);
  }

  function TableLop() {
    function SuaXoa(id) {
      return (
        <div className={styles.khung_suaxoa}>
          <button className={styles.btn_sua} onClick={() => clickKhungSua()}>
            Sửa
          </button>
          {showKhungSua && (
            <ModuleSua
              title="Cập nhật lớp"
              lable1="Tên lớp"
              lable2="Khóa"
              placeholder2="Nhập khóa"
              placeholder1="Nhập tên lớp"
              clickKhungSua={clickKhungSua}
              url={`/api/class/${id.id}`}
              getApi={getApiClass}
              setSuaXoaNum={setSuaXoaNum}
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
                Tên Lớp
              </td>
              <td className={styles.td1_nganhNghe}>
                <img src={tamgiacTable} className={styles.img_tamgiac} />
                Tên Khóa
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr className={styles.tr_timKiem}>
              <td>
                <button
                  onClick={() =>
                    sortData(
                      data,
                      dataSort,
                      setDataSort,
                      setNewData,
                      page,
                      size
                    )
                  }
                >
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
            </tr>
          </tbody>
          {newData.map((value, index) => {
            return (
              <tbody key={index}>
                <tr key={index}>
                  <td style={{ textAlign: "center" }}>
                    {(page - 1) * size + index + 1}
                  </td>
                  <td className={styles.btn_khungSuaXoa}>
                    <button onClick={() => clickKhungSuaXoa(index)}>
                      <img
                        src={settingTable}
                        style={{ transform: "translateX(25px)" }}
                      />
                    </button>
                    {suaXoaNum === index && <SuaXoa id={value.id} />}
                  </td>
                  <td>{value.name}</td>
                  <td>{value.courseId}</td>
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
          <h5>{`Lớp (${totalLop})`}</h5>
        </div>
        <button
          className={styles.btn_add_nganhNghe}
          onClick={() => setIsshow(true)}
        >
          + Thêm lớp
        </button>
        {isshow && (
          <Module
            title="Thêm lớp"
            lable1="Tên lớp"
            lable2="Khóa"
            placeholder1="Nhập tên lớp"
            placeholder2="Nhập khóa"
            setIsshow={setIsshow}
            url="/api/class"
            getApi={getApiClass}
          />
        )}
      </div>
      <TableLop />

      <PhanTrang page={page} setPage={setPage} totalPage={totalPage} />
    </div>
  );
}

export default Lop;

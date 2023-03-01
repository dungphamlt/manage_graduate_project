import { useState, useEffect } from "react";
import styles from "./style.module.css";
import request from "../../utils/request";

import Module from "./Module";
import ModuleSua from "./ModuleSua";
import PhanTrang from "../../components/PhanTrang";
import sortData from "../../components/sortData/sortData";

import tamgiacTable from "../../assets/icon/tamgiacTable.png";
import vectorTable from "../../assets/icon/vectorTable.png";
import filterTable from "../../assets/icon/filterTable.png";
import settingTable from "../../assets/icon/settingTable.png";

function Khoa() {
  const [isshow, setIsshow] = useState(false);
  const [showKhungSua, setShowKhungSua] = useState(false);
  const [data, setData] = useState([]);
  const [suaXoaNum, setSuaXoaNum] = useState(-1);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [totalPage, setTotalPage] = useState(0);
  const [newData, setNewData] = useState([]);
  const [totalKhoa, setTotalKhoa] = useState(0);
  const [dataSort, setDataSort] = useState(false);

  function handleData() {
    // page 1 - 0 ->5
    // page 2 - 5->10
    const data1 = data.sort((a, b) => {
      const dayA = new Date(a.createdAt);
      const dayB = new Date(b.createdAt);
      return dayB - dayA;
    });
    setNewData(data1.slice((page - 1) * size, page * size));
  }

  function getApiCourse() {
    request({
      method: "GET",
      url: "/api/course",
      params: {},
      data: {},
    }).then((response) => {
      console.log(response);
      const responseData = response.data;
      setData(responseData);

      // Tính tổng số trang
      const totalRecord = responseData.length;
      setTotalKhoa(totalRecord);
      setTotalPage(Math.ceil(totalRecord / size));
    });
  }

  useEffect(() => {
    getApiCourse();
  }, []);

  useEffect(() => {
    handleData();
  }, [data, page]);

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
      url: `/api/course/${id.id}`,
      data: {},
    }).then((res) => {
      getApiCourse();
      alert("xóa thành công");
    });
    setSuaXoaNum(-1);
  }

  function TableKhoa() {
    const [dataKhoa, setDataKhoa] = useState("");
    const [dataYear, setDataYear] = useState(0);

    function handleSearch() {
      const dataSearchYear = data.filter((value, index) => {
        return value.year === +dataYear;
      });
      console.log(dataSearchYear);
      if (dataSearchYear.length != 0) {
        setNewData(dataSearchYear);
      }
      const dataSearchKhoa = data.filter((value, index) => {
        return value.name === dataKhoa;
      });
      console.log(dataSearchKhoa);
      if (dataSearchKhoa.length != 0) {
        setNewData(dataSearchKhoa);
      }
    }

    function SuaXoa({ id }) {
      return (
        <div className={styles.khung_suaxoa}>
          <button className={styles.btn_sua} onClick={() => clickKhungSua()}>
            Sửa
          </button>
          {showKhungSua && (
            <ModuleSua
              title="Cập nhật khóa"
              lable1="Tên khóa"
              lable2="Năm bắt đầu"
              placeholder2="Nhập năm"
              placeholder1="Nhập khóa"
              clickKhungSua={clickKhungSua}
              url={`/api/course/${id}`}
              getApi={getApiCourse}
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
                Tên Khóa
              </td>
              <td className={styles.td1_nganhNghe}>
                <img src={tamgiacTable} className={styles.img_tamgiac} />
                Năm bắt đầu
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
                <button
                  className={styles.border_timKiem}
                  onClick={() => handleSearch()}
                >
                  Tìm kiếm
                </button>
              </td>
              <td>
                <input
                  type={"text"}
                  className={styles.border_timKiem}
                  onChange={(e) => setDataKhoa(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  className={styles.border_timKiem}
                  onChange={(e) => setDataYear(e.target.value)}
                />
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
                  <td>{value.year}</td>
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
          <h5>{`Khóa (${totalKhoa}) `}</h5>
        </div>
        <button
          className={styles.btn_add_nganhNghe}
          onClick={() => setIsshow(true)}
        >
          + Thêm khóa
        </button>
        {isshow && (
          <Module
            title="Thêm khóa"
            lable1="Tên khóa"
            lable2="Năm bắt đầu"
            placeholder1="Nhập tên khóa"
            placeholder2="Chọn thời gian"
            setIsshow={setIsshow}
            url="/api/course"
            getApi={getApiCourse}
          />
        )}
      </div>
      <TableKhoa />
      <PhanTrang page={page} setPage={setPage} totalPage={totalPage} />
    </div>
  );
}

export default Khoa;

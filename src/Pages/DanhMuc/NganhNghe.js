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

function NganhNghe() {
  const [isshow, setIsshow] = useState(false);
  const [showKhungSua, setShowKhungSua] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [totalPage, setTotalPage] = useState(0);
  const [newData, setNewData] = useState([]);
  const [suaXoaNum, setSuaXoaNum] = useState(-1);
  const [totalThanhVien, setTotalThanhVien] = useState(0);
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

  function getApiField() {
    request({
      method: "GET",
      url: "/api/field",
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
  }

  useEffect(() => {
    getApiField();
  }, []);

  useEffect(() => {
    handleData();
  }, [data, page]);

  // function sortData() {
  //   setDataSort(!dataSort);
  //   console.log(dataSort);
  //   if (dataSort) {
  //     const data2 = data.sort((a, b) => {
  //       const dayA = new Date(a.createdAt);
  //       const dayB = new Date(b.createdAt);
  //       return dayB - dayA;
  //     });
  //     setNewData(data2.slice((page - 1) * size, page * size));
  //   } else {
  //     const data3 = data.sort((a, b) => {
  //       const dayA = new Date(a.createdAt);
  //       const dayB = new Date(b.createdAt);
  //       return dayA - dayB;
  //     });
  //     setNewData(data3.slice((page - 1) * size, page * size));
  //   }
  // }

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
      url: `/api/field/${id.id}`,
      data: {},
    }).then((res) => {
      getApiField();
      alert("xóa thành công");
    });
    setSuaXoaNum(-1);
  }

  function TableNganhNghe() {
    const [dataMa, setDataMa] = useState("");
    const [dataName, setDataName] = useState("");

    function handleSearch() {
      const dataSearchCode = data.filter((value, index) => {
        return value.code === dataMa;
      });
      console.log(dataSearchCode);
      if (dataSearchCode.length != 0) {
        setNewData(dataSearchCode);
      }
      const dataSearchName = data.filter((value, index) => {
        return value.name === dataName;
      });
      console.log(dataSearchName);
      if (dataSearchName.length != 0) {
        setNewData(dataSearchName);
      }
    }
    function SuaXoa(id) {
      return (
        <div className={styles.khung_suaxoa}>
          <button className={styles.btn_sua} onClick={() => clickKhungSua()}>
            Sửa
          </button>
          {showKhungSua && (
            <ModuleSua
              title="Cập nhật ngành nghề"
              lable2="Mã ngành nghề"
              lable1="Ngành nghề"
              placeholder2="Nhập mã"
              placeholder1="Nhập ngành nghề"
              clickKhungSua={clickKhungSua}
              url={`/api/field/${id.id}`}
              getApi={getApiField}
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
                Mã ngành nghề
              </td>
              <td className={styles.td1_nganhNghe}>
                <img src={tamgiacTable} className={styles.img_tamgiac} />
                Ngành nghề
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
                  onChange={(e) => setDataMa(e.target.value)}
                />
              </td>
              <td>
                <input
                  type={"text"}
                  style={{ width: "90%" }}
                  className={styles.border_timKiem}
                  onChange={(e) => setDataName(e.target.value)}
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
                  <td>{value.code}</td>
                  <td>{value.name}</td>
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
          <h5>{`Ngành nghề (${totalThanhVien})`}</h5>
        </div>
        <button
          className={styles.btn_add_nganhNghe}
          onClick={() => setIsshow(true)}
        >
          + Thêm ngành nghề
        </button>
        {isshow && (
          <Module
            title="Thêm ngành nghề"
            lable2="Mã ngành nghề"
            lable1="Ngành nghề"
            placeholder2="Nhập mã"
            placeholder1="Nhập ngành nghề"
            setIsshow={setIsshow}
            url="/api/field"
            getApi={getApiField}
          />
        )}
      </div>
      <TableNganhNghe />
      <PhanTrang page={page} setPage={setPage} totalPage={totalPage} />
    </div>
  );
}

export default NganhNghe;

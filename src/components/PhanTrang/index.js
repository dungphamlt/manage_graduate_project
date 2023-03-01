import arrowRight from "../../assets/icon/arrowRight.png";
import arrowLeft from "../../assets/icon/arrowLeft.png";

function PhanTrang({ page, setPage, totalPage }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "30px",
        right: "30px",
        color: " #172B4D",
      }}
    >
      <div className="flex">
        <button
          className="hover:scale-125"
          style={{ marginRight: "5px" }}
          onClick={() => {
            if (page <= 1) {
              return;
            } else {
              setPage(page - 1);
            }
          }}
        >
          <img src={arrowLeft} alt="arrowLeft" />
        </button>

        {[...Array(totalPage)].map((value, index) => (
          <button
            className="hover:text-orange-600"
            key={index}
            onClick={() => setPage(index + 1)}
            style={{
              border: "1px solid black",
              padding: "4px 8px",
              backgroundColor: index + 1 === page ? "#ddd" : "",
            }}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="hover:scale-125"
          style={{ marginLeft: "5px" }}
          onClick={() => {
            if (page >= totalPage) {
              return;
            } else {
              setPage(page + 1);
            }
          }}
        >
          <img src={arrowRight} alt="arrowRight" />
        </button>
      </div>
    </div>
  );
}

export default PhanTrang;

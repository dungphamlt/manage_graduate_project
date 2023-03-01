function sortData(data, dataSort, setDataSort, setNewData, page, size) {
  setDataSort(!dataSort);
  if (dataSort) {
    const data2 = data.sort((a, b) => {
      const dayA = new Date(a.createdAt);
      const dayB = new Date(b.createdAt);
      return dayB - dayA;
    });
    setNewData(data2.slice((page - 1) * size, page * size));
  } else {
    const data3 = data.sort((a, b) => {
      const dayA = new Date(a.createdAt);
      const dayB = new Date(b.createdAt);
      return dayA - dayB;
    });
    setNewData(data3.slice((page - 1) * size, page * size));
  }
}

export default sortData;

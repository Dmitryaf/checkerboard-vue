export default function useGridTable() {
  function getRows(rowsLength, rowsSize) {
    return {
      'grid-template-rows': `repeat(${rowsLength}, ${rowsSize})`,
    };
  }

  function getCols(colsLength, colSize) {
    return {
      'grid-template-columns': `repeat(${colsLength}, ${colSize})`,
    };
  }

  return {
    getRows,
    getCols,
  };
}

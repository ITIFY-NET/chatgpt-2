function getOffset(currentPage = 1, listPerPage) {
  return (currentPage - 1) * [listPerPage]
}

function emptyOrRows(rows) {
  if (!rows) {
    return []
  }
  return rows
}

function groupByKey(ungroupedArray, key) {
  return ungroupedArray.reduce(function (groupedArray, object) {
      groupedArray[object[key]] = groupedArray[object[key]] || [];
      groupedArray[object[key]].push(object)
      return groupedArray
  }, Object.create(null))
}

module.exports = {
  getOffset,
  emptyOrRows,
  groupByKey
}

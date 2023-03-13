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
    groupedArray[object[key]] = groupedArray[object[key]] || []
    groupedArray[object[key]].push(object)
    return groupedArray
  }, Object.create(null))
}

/**
 * Builds chat with user
 * @param {Array} data
 * @param {string} key
 */
function groupCollection(data, key) {
  const objGroup = {}
  data.map((item) => {
    const keyCheck = item[key]
    if (!objGroup[keyCheck]) {
      objGroup[keyCheck] = {
        category: keyCheck,
        data: [item]
      }
    } else {
      objGroup[keyCheck]['data'].push(item)
    }
    return item
  })
  return Object.keys(objGroup).map((k) => {
    return objGroup[k]
  })
}

module.exports = {
  getOffset,
  emptyOrRows,
  groupByKey,
  groupCollection
}

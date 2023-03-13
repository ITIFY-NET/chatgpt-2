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
  let index = 1
  data.map((item) => {
    const keyCheck = item[key]
    if (!objGroup[keyCheck]) {
      objGroup[keyCheck] = {
        category: keyCheck,
        id: index,
        list: [item]
      }
      index += 1
    } else {
      objGroup[keyCheck]['list'].push(item)
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

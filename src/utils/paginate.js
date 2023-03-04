const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 4

const IS_ASC = ['ASC', '1', 1]
/**
 * Builds sorting
 * @param {string} sort - field to sort from
 * @param {string} order - order for query (1,-1)
 */
const buildSort = (sort, order) => {
  if (sort.includes('.')) {
    // Exp: 'stats.totalBid' : sort by totalBid of stats
    // Build nested sort field by references model or nested object.
    const arr = sort.split('.')
    const nestedPath = arr.slice(0, arr.length - 1).join('.')
    const field = arr[arr.length - 1]

    const sortBy = []
    sortBy.push([`${nestedPath}`, field, order])
    return sortBy
  }

  const sortBy = []
  sortBy.push([`${sort}`, order])
  return sortBy
}

const buildSortType = (sortType = 'DESC') => {
  if (IS_ASC.includes(sortType.toString().toUpperCase())) {
    return 'ASC'
  }
  return 'DESC'
}
/**
 * Builds initial options for query
 * @param {Object} query - query object
 */
const listInitOptions = (query) => {
  const order = buildSortType(query.sortType)
  const sort = query.sortBy || 'createdAt'
  const page = parseInt(query.page, 10) || DEFAULT_PAGE
  const limit = parseInt(query.limit, 10) || DEFAULT_LIMIT
  const raw = query.raw != undefined ? query.raw : true
  if (query.nonPaging == '1') {
    // Non paging. Use for combobox or other option
    return {
      order: buildSort(sort, order),
      raw,
      nonPaging: true
    }
  }
  const options = {
    order: buildSort(sort, order),
    raw,
    offset: (page - DEFAULT_PAGE) * limit,
    limit
  }

  return options
}

export { listInitOptions }

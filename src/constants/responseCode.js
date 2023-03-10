const SUCCESS_CODE = 200;
const CREATED_CODE = 201;
const BAD_REQUEST_CODE = 400;
const UNAUTHORIZED_CODE = 401;
const DUPLICATE_CODE = 409;
const FORBIDDEN_CODE = 403;
const INVALID_CODE = 422;
const NOT_FOUND_CODE = 404;
const UNPROCESSABLE_CODE = 422;
const NOT_ACCEPTABLE = 406;
const ISE_CODE = 500;
const LIMIT_EXCEEDED = 429;

const ACCEPT_ERROR_STATUS = [
  BAD_REQUEST_CODE,
  UNAUTHORIZED_CODE,
  FORBIDDEN_CODE,
  DUPLICATE_CODE,
  ISE_CODE,
  SUCCESS_CODE,
  INVALID_CODE,
  NOT_FOUND_CODE,
  NOT_ACCEPTABLE,
  LIMIT_EXCEEDED,
];

module.exports = {
  CREATED_CODE,
  SUCCESS_CODE,
  BAD_REQUEST_CODE,
  UNAUTHORIZED_CODE,
  FORBIDDEN_CODE,
  NOT_FOUND_CODE,
  UNPROCESSABLE_CODE,
  ISE_CODE,
  ACCEPT_ERROR_STATUS,
};

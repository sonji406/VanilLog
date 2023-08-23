const INVALID_USER_ID = {
  STATUS_CODE: 401,
  MESSAGE: 'userId 형식이 일치하지 않습니다.',
};

const INVALID_JSON = {
  STATUS_CODE: 400,
  MESSAGE: '요청한 JSON 형식이 유효하지 않습니다.',
};

const USER_NOT_FOUND = {
  STATUS_CODE: 404,
  MESSAGE: '유저 정보가 존재하지 않습니다.',
};

const DUPLICATE_NICKNAME = {
  STATUS_CODE: 400,
  MESSAGE: '중복된 닉네임입니다.',
};

const SAME_NICKNAME = {
  STATUS_CODE: 400,
  MESSAGE: '이전과 같은 닉네임으로 변경할 수 없습니다.',
};

const MISSING_NICKNAME = {
  STATUS_CODE: 400,
  MESSAGE: '닉네임은 필수 입력 항목입니다. 공백으로 설정할 수 없습니다.',
};

const MISSING_PARAMETERS = {
  STATUS_CODE: 400,
  MESSAGE: '조회에 필요한 파라미터가 부족합니다.',
};

const POST_NOT_FOUND = {
  STATUS_CODE: 404,
  MESSAGE: '해당 포스트를 찾을 수 없습니다.',
};

const SIGNED_URL_CREATION_ERROR = {
  STATUS_CODE: '500',
  MESSAGE: 'signed URL 생성 오류입니다.',
};

const FILE_NOT_FOUND = {
  STATUS_CODE: 400,
  MESSAGE: '요청에서 파일을 찾을 수 없습니다.',
};

const USER_NOT_LOGGED_IN = {
  STATUS_CODE: 401,
  MESSAGE: '해당 포스트의 작성자일 경우 로그인 후 이용 가능합니다.',
};

const NOT_POST_AUTHOR = {
  STATUS_CODE: 403,
  MESSAGE: '포스트의 작성자가 아닙니다.',
};

const UNAUTHORIZED_USER = {
  STATUS_CODE: 403,
  MESSAGE: '자신의 프로필만 조회할 수 있습니다.',
};

const NOT_COMMENT_AUTHOR = {
  STATUS_CODE: 403,
  MESSAGE: '타 브랜치에서 가져오기.',
};

export const ERRORS = {
  INVALID_USER_ID,
  INVALID_JSON,
  USER_NOT_FOUND,
  DUPLICATE_NICKNAME,
  SAME_NICKNAME,
  MISSING_NICKNAME,
  MISSING_PARAMETERS,
  POST_NOT_FOUND,
  SIGNED_URL_CREATION_ERROR,
  FILE_NOT_FOUND,
  USER_NOT_LOGGED_IN,
  NOT_POST_AUTHOR,
  UNAUTHORIZED_USER,
  NOT_COMMENT_AUTHOR,
};

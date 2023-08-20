const INVALID_USER_ID = {
  STATUS_CODE: 401,
  MESSAGE: 'userId 형식이 일치하지 않습니다.',
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

export const ERRORS = {
  INVALID_USER_ID,
  USER_NOT_FOUND,
  DUPLICATE_NICKNAME,
  SAME_NICKNAME,
  MISSING_NICKNAME,
  MISSING_PARAMETERS,
  POST_NOT_FOUND,
};

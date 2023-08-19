export const ERROR_MESSAGES = {
  INVALID_USER_ID: 'userId 형식이 일치하지 않습니다.',
  USER_NOT_FOUND: '유저 정보가 존재하지 않습니다.',
  DUPLICATE_NICKNAME: '중복된 닉네임입니다.',
  SAME_NICKNAME: '이전과 같은 닉네임으로 변경할 수 없습니다.',
  MISSING_NICKNAME:
    '닉네임은 필수 입력 항목입니다. 공백으로 설정할 수 없습니다.',
  MISSING_PARAMETERS: '조회에 필요한 파라미터가 부족합니다.',
  MISSING_POST_PARAMETERS:
    '데이터를 저장하기 위해 필요한 정보가 누락되었습니다. 모든 필드를 정확하게 입력해주세요.',
};

export const ERROR_CODES = {
  DUPLICATE_NICKNAME: 400,
  SAME_NICKNAME: 400,
  MISSING_NICKNAME: 400,
  MISSING_PARAMETERS: 400,
  INVALID_USER_ID: 401,
  USER_NOT_FOUND: 404,
};

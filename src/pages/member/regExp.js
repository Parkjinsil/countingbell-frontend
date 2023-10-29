// 아이디 확인
export const regExpId = (id) => {
  // 첫글자는 소문자, 대문자 알파벳, 나머지 글자는 소문자, 대문자, 숫자 가능,
  // 총 5~20글자
  const UserRegex = /^[a-zA-Z][a-zA-Z0-9]{4,19}$/;

  //   console.log(UserRegex.test(id));

  return UserRegex.test(id);
};

// 비밀번호 확인
export const regExpPwd = (password) => {
  // 소문자, 대문자, 숫자, 특수문자 !@#$%가 꼭 들어있고 8~24글자
  const PwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,20}$/;

  //   console.log(PwdRegex.test(id));

  return PwdRegex.test(password);
};

// 비밀번호 재확인
export const regPwdCheck = (password, pwdCheck) => {
  if (password === pwdCheck) {
    return true;
  }
  return false;
};

// 핸드폰
export const regExpPhone = (phone) => {
  const PhoneRegex = /^010([0-9]{8})$/; //  "010"으로 시작하고 이어서 숫자 8자리가 나오는 휴대폰 번호
  return PhoneRegex.test(phone);
};

// 이메일
export const regExpEmail = (email) => {
  const EmailRegex =
    /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  return EmailRegex.test(email);
};

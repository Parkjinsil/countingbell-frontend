import { useEffect, useState } from "react";
import styled from "styled-components";
import { addMember, checkId, checkNickname } from "../api/user";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncRegister } from "../store/userSlice";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: azure;
  margin-top: 40px;
`;

const Wrapper = styled.div`
  display: block;
  background-color: #f8f9fa;
  padding: 30px 60px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  // max-width: 700px;
  width: 700px;
  height: 720px;
`;

const Title = styled.div`
  text-align: center;
  font-size: 3rem;
  font-family: "omyu_pretty";
  padding: 10px;
`;

const InputContainer = styled.div`
  display: block;
  justify-content: center;
  width: 570px;

  div {
    padding: 3px 0;
  }

  p {
    margin: 5px 0;
    font-size: 1.2rem;
    font-weight: bold;
    font-family: "omyu_pretty";
  }

  input,
  select {
    width: 100%;
    padding: 5px;
  }

  label {
    display: flex;
    gap: 5px;
    background-color: aliceblue;
    width: 100%;
  }

  button {
    height: 35px;
    width: 90px;
    border: none;
    cursor: pointer;
    background-color: #f8cdc1;
    font-family: "omyu_pretty";
    font-size: 1.1rem;

    &:hover {
      background-color: #ff5e33;
      color: #fff;
    }
  }
`;

const BtnArea = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  margin: 30px 0;
  padding: 5px;

  button {
    width: 100%;
    height: 60px;
    padding: 10px;

    border: none;
    border-radius: 10px;
    cursor: pointer;
    background-color: #f8cdc1;
    font-family: "omyu_pretty";
    font-size: 1.5rem;

    &:hover {
      background-color: #ff5e33;
      color: #fff;
    }
  }
`;

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [phoneValid, setPhoneValid] = useState(true);

  const user = useSelector((state) => {
    return state.user;
  });

  console.log(user);

  const [id, setId] = useState([]);
  const [password, setPwd] = useState([]);
  const [pwdCheck, setPwdCheck] = useState([]);
  const [name, setName] = useState([]);
  const [nickname, setNickname] = useState([]);
  const [email, setEmail] = useState([]);
  const [phone, setPhone] = useState([]);
  const [role, setRole] = useState("고객");

  const [idDup, setIdDup] = useState(false); // 아이디 중복확인
  const [nickDup, setNickDup] = useState(false); // 닉네임 중복확인

  const onChange = (e) => {};

  const registerHandler = async (e) => {
    e.preventDefault();

    if (idDup && nickDup) {
      const formData = {
        id,
        password,
        name,
        nickname,
        email,
        phone,
        role,
      };

      console.log(formData);
      dispatch(asyncRegister(formData));
      navigate("/login");
    } else {
      alert("중복확인을 해주세요.");
    }
  };

  const IdCheck = async (e) => {
    const idInput = document.getElementById("id"); // 아이디 input 요소를 선택

    const result = await checkId(idInput.value);

    if (result.available) {
      alert("사용 가능한 아이디입니다.");
      setIdDup(true);
    } else {
      alert("중복된 아이디입니다!!!");
    }
  };

  const NicknameCheck = async () => {
    const nicknameInput = document.getElementById("nickname");
    const result = await checkNickname({ nickname: nicknameInput.value });

    if (result.data) {
      alert("사용 가능한 닉네임입니다.");
      setNickDup(true);
    } else {
      alert("중복된 닉네임입니다!!!");
      setNickDup(false); // 중복된 닉네임인 경우 상태값을 업데이트
    }
  };
  // 아이디 유효성 검사!!
  // const  RegExpId = () => {
  //   console.log(regExpId(id));
  //   setValidId(regExpId(id));
  // };
  return (
    <Container>
      <form className="registerForm" onSubmit={registerHandler}>
        <Wrapper>
          <Title>
            <h1>회원가입</h1>
          </Title>
          <InputContainer>
            <div className="id">
              <p>아이디</p>
              <label>
                <input
                  id="id"
                  value={id}
                  type="text"
                  placeholder="아이디를 입력해주세요."
                  onChange={(e) => {
                    setId(e.target.value);
                  }}
                  required
                  // onBlur={RegExpId}
                />
                <button
                  type="button"
                  id="signupbtn"
                  className="btn btn-primary"
                  style={{ zIndex: "0" }}
                  onClick={IdCheck}
                >
                  중복 확인
                </button>
              </label>
              <div className="idError"></div>
            </div>

            <div className="password">
              <p>비밀번호</p>
              <label>
                <input
                  id="password"
                  value={password}
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  onChange={(e) => {
                    setPwd(e.target.value);
                  }}
                  required
                ></input>
              </label>
              <div className="pwdError"></div>
            </div>
            <div className="pwdCheck">
              <p>비밀번호 재확인</p>
              <label>
                <input
                  id="pwdCheck"
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  value={pwdCheck}
                  onChange={(e) => {
                    setPwdCheck(e.target.value);
                  }}
                  required
                ></input>
              </label>
              <div className="pwdError"></div>
            </div>
            <div className="userName">
              <p>이름</p>
              <label>
                <input
                  id="name"
                  value={name}
                  type="text"
                  placeholder="이름을 입력해주세요."
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  required
                ></input>
              </label>
            </div>

            <div className="nickName">
              <p>닉네임</p>
              <label>
                <input
                  id="nickname"
                  value={nickname}
                  type="text"
                  placeholder="닉네임을 입력해주세요."
                  onChange={(e) => {
                    setNickname(e.target.value);
                  }}
                  required
                ></input>
                <button
                  type="button"
                  id="signupbtn2"
                  className="btn btn-primary"
                  style={{ zIndex: "0" }}
                  onClick={NicknameCheck}
                >
                  중복 확인
                </button>
              </label>
            </div>

            <div className="email">
              <p>이메일</p>
              <label>
                <input
                  id="email"
                  type="text"
                  value={email}
                  placeholder="이메일을 입력해주세요."
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></input>
              </label>
              <div className="emailError"></div>
            </div>
            <div className="phone">
              <p>전화번호("-" 제외)</p>
              <label>
                <input
                  id="phone"
                  value={phone}
                  type="text"
                  placeholder="전화번호를 입력해주세요."
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  required
                  style={{ color: phoneValid ? "black" : "red" }}
                />
                {phoneValid ? null : (
                  <div
                    style={{
                      color: "red",
                      fontSize: "0.7rem",
                      paddingTop: "10px",
                    }}
                  >
                    전화번호는 - 을 제외한 11자리 숫자로 입력해 주세요.
                  </div>
                )}
              </label>
            </div>

            <div>
              <div className="role">
                <p>구분</p>
                <label>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value);
                    }}
                  >
                    <option value="customer" defaultValue>
                      고객
                    </option>
                    <option value="owner">사장</option>
                  </select>
                </label>
              </div>
            </div>
          </InputContainer>
        </Wrapper>
        <BtnArea>
          <button type="submit">
            <span>가입하기</span>
          </button>
        </BtnArea>
      </form>
    </Container>
  );
};
export default Register;

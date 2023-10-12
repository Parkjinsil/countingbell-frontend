import { useEffect, useState } from "react";
import styled from "styled-components";
import { addMember } from "../api/user";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncRegister } from "../store/userSlice";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: azure;
  padding-top: 100px;
`;

const Wrapper = styled.div`
  display: block;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* max-width: 700px; */
  width: 100%;
  height: 800px;
`;

const Title = styled.div`
  text-align: center;

  font-size: 2.5rem;
  /* background-color: aqua; */

  padding: 10px;
`;

const InputContainer = styled.div`
  display: block;
  justify-content: center;
  width: 400px;

  div {
    padding: 3px 0;
  }

  p {
    margin: 5px 0;
    font-size: 1rem;
    font-weight: bold;
    /* font-family: "omyu_pretty"; */ */
  }

  input,
  select {
    width: 100%;
    padding: 5px ;
  }

  label {
    display: flex;
    gap: 5px;
    background-color: aliceblue;
    width: 100%;

    #gender {
      width: 100%;
      padding: 7px;
    }
  }
`;

const BtnArea = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  margin: 10px 0;
  padding: 10px;

  button {
    width: 100%;
    padding: 10px;

    border: none;
    cursor: pointer;
    background-color: #f8cdc1;
    /* font-family: "omyu_pretty"; */
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

  const user = useSelector((state) => {
    return state.user;
  });

  // 초기값 세팅
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    pwdCheck: "",
    name: "",
    age: "",
    nickName: "",
    email: "",
    phone: "",
    gender: "성별",
    role: "고객",
  });

  const onChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const registerHandler = async (e) => {
    e.preventDefault();

    // registerHandler 함수 내부에서 상태 변수로 접근
    const { id, password, name, age, nickName, email, phone, gender, role } =
      formData;

    console.log(formData);

    dispatch(asyncRegister(formData));
    navigate("/login");
  };

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
                  value={formData.id}
                  type="text"
                  placeholder="아이디를 입력해주세요."
                  onChange={onChange}
                  required
                ></input>
              </label>
              <div className="idError"></div>
            </div>

            <div className="password">
              <p>비밀번호</p>
              <label>
                <input
                  id="password"
                  value={formData.password}
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  onChange={onChange}
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
                  value={formData.pwdCheck}
                  onChange={onChange}
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
                  value={formData.name}
                  type="text"
                  placeholder="이름을 입력해주세요."
                  onChange={onChange}
                  required
                ></input>
              </label>
            </div>

            <div className="age">
              <p>나이</p>
              <label id="ageBox">
                <input
                  id="age"
                  type="text"
                  placeholder="나이를 입력해주세요."
                  value={formData.age}
                  onChange={onChange}
                ></input>
              </label>
            </div>

            <div className="nickName">
              <p>닉네임</p>
              <label>
                <input
                  id="nickName"
                  value={formData.nickName}
                  type="text"
                  placeholder="닉네임을 입력해주세요."
                  onChange={onChange}
                  required
                ></input>
              </label>
            </div>

            <div className="email">
              <p>이메일</p>
              <label>
                <input
                  id="email"
                  type="text"
                  value={formData.email}
                  placeholder="이메일을 입력해주세요."
                  onChange={onChange}
                ></input>
              </label>
              <div className="emailError"></div>
            </div>
            <div className="phone">
              <p>전화번호("-" 제외)</p>
              <label>
                <input
                  id="phone"
                  value={formData.phone}
                  type="text"
                  placeholder="전화번호를 입력해주세요."
                  onChange={onChange}
                  required
                />
              </label>
            </div>
            <div>
              <div className="gender">
                <p>성별</p>
                <label>
                  <select
                    id="gender"
                    value={formData.gender}
                    onChange={onChange}
                  >
                    <option>성별</option>
                    <option value="man">남성</option>
                    <option value="woman">여성</option>
                  </select>
                </label>
              </div>
            </div>
            <div>
              <div className="role">
                <p>구분</p>
                <label>
                  <select id="role" value={formData.role} onChange={onChange}>
                    <option value="role1" defaultValue>
                      고객
                    </option>
                    <option value="role2">사장</option>
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

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Pick = () => {
  // Redux 스토어에서 사용자와 관련된 정보를 가져오기 위해 useSelector 사용
  const pickData = useSelector((state) => state.pick.data);

  const dispatch = useDispatch();
  const memberId = "user2"; // 가져올 사용자의 member_id

  // useEffect(() => {
  //   dispatch(asyncGetPicks(memberId));
  // }, [dispatch, memberId]);

  return (
    <div>
      <h1>찜</h1>
      <div className="position-relative p-5 text-center text-muted bg-body border border-dashed rounded-3 mt-5">
        {pickData &&
          pickData.map((pick) => (
            <div key={pick.pickCode}>
              <p>식당 이름: {pick.restaurant.resName}</p>
              <p>찜 시간: {pick.pickTime}</p>
              {/* 다른 사용자 관련 정보를 여기에 추가 */}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Pick;

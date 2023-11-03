import { useEffect, useRef } from "react";

const ResMap = ({ resAddr }) => {
  const mapRef = useRef(null); // hook (참조)
  var options = {
    center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도 중심 좌표
    level: 3,
  };
  useEffect(() => {
    if (resAddr !== undefined) {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(resAddr, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === window.kakao.maps.services.Status.OK) {
          var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          var map = new window.kakao.maps.Map(mapRef.current, options);
          var markerPosition = coords;
          // 결과값으로 받은 위치를 마커로 표시
          var marker = new window.kakao.maps.Marker({
            map: map,
            position: markerPosition,
          });
          marker.setMap(map);
          map.setCenter(markerPosition);
        }
      });
    }
  }, [resAddr]);
  return <div ref={mapRef} style={{ height: "300px", width: "282px" }}></div>;
};
export default ResMap;

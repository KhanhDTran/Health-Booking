import React, { useEffect, useState } from "react";

export default function ClinicRecordStatus(props) {
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (props.booking) setStatus(props.booking.status);
  }, [props.booking]);

  return (
    <>
      <div className="divider"></div>

      {props.booking && (
        <div className="flex justify-center flex-col items-center">
          <div className="text-3xl p-4 justify-center flex w-full">
            Thay đổi trạng thái hồ sơ bệnh án
          </div>
          <div className="p-4 m-4">
            <span>Trạng thái hiện tại: {props.booking.status} </span>
          </div>
          <div className="flex justify-center flex-col w-96">
            <select
              className="select select-info w-full w-96"
              value={status ? status : ""}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value={"Đang khám"}>Đang khám</option>
              <option value={"Đang đợi kết quả khám lâm sàng"}>
                Đang đợi kết quả khám lâm sàng
              </option>
              <option value={"Đã có kết luận"}>Đã có kết luận</option>
              <option value={"Đã khám xong"}>Đã khám xong</option>
            </select>
          </div>
          <div className="p-4 m-4">
            <button
              className="btn btn-info"
              onClick={() => props.changeClinicRecordStatus(status)}
            >
              Lưu trạng thái
            </button>
          </div>
        </div>
      )}
    </>
  );
}

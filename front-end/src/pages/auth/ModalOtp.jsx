import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OtpInput from "react18-input-otp";
import { getRequestToast, postRequestToast } from "../../services/commonSv";

export default function ModalOtp(props) {
  const [otp, setOtp] = useState("");
  const [sec, setSec] = useState(60);
  let navigate = useNavigate();

  useEffect(() => {
    if (!sec) return;
    const intervalId = setInterval(() => {
      setSec(sec - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [sec]);

  async function handleResendOtp() {
    let res = await getRequestToast(
      "/resend-otp-patient",
      { username: props.username, name: props.name, email: props.email },
      "Đang gửi lại mã xác nhận..."
    );
    if (res) {
      setSec(60);
    } else {
      setSec(0);
    }
  }

  async function createPatient() {
    let res = await postRequestToast(
      "/create-patient",
      {
        name: props.name,
        token: otp,
        email: props.email,
        username: props.username,
        phone: props.phone,
        address: props.address,
        pass: props.pass,
        gender: props.gender,
        age: props.age,
      },
      "Đang tạo tài khoản mới..."
    );
    if (res) {
      navigate("/login");
    }
  }

  return (
    <>
      {/* Put this part before </body> tag */}
      <input
        type="checkbox"
        id="modal-otp"
        className="modal-toggle"
        checked={props.openModalOtp}
        onChange={props.setOpenModalOtp}
      />
      <div className="modal  ">
        <div className="modal-box relative w-11/12 max-w-5xl">
          <label
            htmlFor="modal-otp"
            onClick={() => props.setOpenModalOtp(false)}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Xác nhận mã OTP</h3>
          <p className="py-4">
            Chúng tôi vừa gửi mã xác nhận tới địa chỉ email:{" "}
            <b>{props.email}</b>
          </p>
          <p>Vui lòng nhập mã xác nhận bạn nhận được</p>
          <div className="flex  align-center justify-center  w-full p-4">
            <OtpInput
              className="  otp-input"
              value={otp}
              inputStyle={true}
              onChange={(e) => setOtp(e)}
              numInputs={6}
              separator={<span>-</span>}
            />
          </div>
          <div className="flex  justify-center  w-full">
            <span className="countdown font-mono text-4xl pb-2">
              <span style={{ "--value": sec }}></span>
            </span>
            <span>s</span>
          </div>

          {sec === 0 && (
            <div className="flex justify-center m-4">
              <a
                className="link link-neutral"
                onClick={() => handleResendOtp()}
              >
                Gửi lại mã xác nhận
              </a>
            </div>
          )}

          <div className="flex justify-center">
            <button
              disabled={!otp}
              className="btn btn-success text-white"
              onClick={() => createPatient()}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

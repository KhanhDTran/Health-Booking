import { useState } from "react";
import { toast } from "react-toastify";
import { postRequestToast } from "../../../../services/commonSv";
import { toBase64 } from "../../../../utils/CommonUtils";
import ModalClinic from "./ModalClinic";

export default function Modal_C_Clinic(props) {
  const [username, setusername] = useState("");
  const [name, setName] = useState("");
  const [password, setpassword] = useState("");
  const [room, setRoom] = useState("");
  const [address, setAddress] = useState("");
  const [hospital, sethospital] = useState("");
  const [province, setprovince] = useState("Hà Nội");
  const [specialty, setspecialty] = useState(null);
  const [image, setImage] = useState("");

  async function handleImgChange(file) {
    let base64 = await toBase64(file);
    if (base64) setImage(base64);
  }

  async function handleCreateClinic() {
    if (
      !name ||
      !username ||
      !password ||
      !room ||
      !address ||
      !province ||
      !specialty ||
      !image
    )
      toast.warning("Nhập thiếu thông tin");
    else {
      let res = await postRequestToast(
        "/create-clinic",
        {
          name,
          username,
          password,
          room,
          address,
          hospital,
          province,
          image,
          specialty: specialty.value,
        },
        "Đang tạo phòng khám chuyên khoa...."
      );
      if (res) {
        setName("");
        setusername("");
        setAddress("");
        setRoom("");
        setpassword("");
        setprovince("Hà Nội");
        sethospital("");
        setImage("");
        setspecialty(null);
      }
    }
  }

  return (
    <>
      <input
        type="checkbox"
        id="modal-create-clinic"
        checked={props.openMCreateClinic}
        onChange={props.setopenMCreateClinic}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative  w-11/12 max-w-7xl h-5/7">
          <label
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => {
              props.setopenMCreateClinic(false);
            }}
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Tạo phòng khám chuyên khoa mới</h3>
          <div className="divider"></div>

          <ModalClinic
            name={name}
            setName={setName}
            username={username}
            setusername={setusername}
            password={password}
            setpassword={setpassword}
            room={room}
            setRoom={setRoom}
            address={address}
            setAddress={setAddress}
            hospital={hospital}
            sethospital={sethospital}
            province={province}
            setprovince={setprovince}
            specialty={specialty}
            handleImgChange={handleImgChange}
            image={image}
            setspecialty={setspecialty}
          />
          <div className="flex justify-center mt-10 bot-0 ">
            <button className="btn btn-info" onClick={handleCreateClinic}>
              Tạo mới
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

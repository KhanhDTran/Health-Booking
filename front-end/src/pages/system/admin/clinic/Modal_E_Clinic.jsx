import { useState, useEffect } from "react";
import ModalClinic from "./ModalClinic";
import { toBase64 } from "../../../../utils/CommonUtils";
import { putRequestToast } from "../../../../services/commonSv";

export default function Modal_E_Clinic(props) {
  const [username, setusername] = useState("");
  const [name, setName] = useState("");
  const [password, setpassword] = useState("");
  const [room, setRoom] = useState("");
  const [address, setAddress] = useState("");
  const [hospital, sethospital] = useState("");
  const [province, setprovince] = useState("Hà Nội");
  const [specialty, setspecialty] = useState(null);
  const [image, setImage] = useState("");

  async function handleEditClinic() {
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
      let res = await putRequestToast(
        "/edit-clinic",
        {
          _id: props.selectedClinic._id,
          user: props.selectedClinic.user,
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
        "Đang lưu thay đổi phòng khám chuyên khoa...."
      );
    }
  }

  useEffect(() => {
    if (props.selectedClinic) {
      setName(props.selectedClinic.name);
      setusername(props.selectedClinic.user.username);
      setAddress(props.selectedClinic.address);
      setRoom(props.selectedClinic.room);
      setpassword(props.selectedClinic.user.password);
      setprovince(props.selectedClinic.province);
      sethospital(props.selectedClinic.name);
      setImage(props.selectedClinic.image);
      setspecialty({
        value: props.selectedClinic.specialty._id,
        label: props.selectedClinic.specialty.name,
      });
    }
  }, [props.selectedClinic]);

  async function handleImgChange(file) {
    let base64 = await toBase64(file);
    if (base64) setImage(base64);
  }

  return (
    <>
      <input
        type="checkbox"
        id="modal-edit-clinic"
        checked={props.selectedClinic}
        onChange={props.setSelectedClinic}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative  w-11/12 max-w-7xl h-5/7">
          <label
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => {
              props.setSelectedClinic(null);
            }}
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Chi tiết phòng khám chuyên khoa</h3>
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
            <button className="btn btn-info" onClick={handleEditClinic}>
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

import { useState, useEffect } from "react";
import { toBase64 } from "../../../../utils/CommonUtils";
import { putRequestToast } from "../../../../services/commonSv";
import ModalLab from "./ModalLab";

export default function Modal_E_Lab(props) {
  const [username, setusername] = useState("");
  const [name, setName] = useState("");
  const [password, setpassword] = useState("");
  const [room, setRoom] = useState("");
  const [address, setAddress] = useState("");
  const [hospital, sethospital] = useState("");
  const [description, setDescription] = useState("");
  const [province, setprovince] = useState("Hà Nội");
  const [type, setType] = useState("Xét nghiệm máu");
  const [image, setImage] = useState("");

  async function handleEditLab() {
    if (
      !name ||
      !username ||
      !password ||
      !room ||
      !address ||
      !province ||
      !description ||
      !type ||
      !image
    )
      toast.warning("Nhập thiếu thông tin");
    else {
      let res = await putRequestToast(
        "/edit-lab",
        {
          _id: props.selectedLab._id,
          user: props.selectedLab.user,
          name,
          username,
          password,
          room,
          address,
          hospital,
          province,
          image,
          description,
          type,
        },
        "Đang lưu thay đổi phòng khám lâm sàng...."
      );
    }
  }

  useEffect(() => {
    if (props.selectedLab) {
      setName(props.selectedLab.name);
      setusername(props.selectedLab.user.username);
      setAddress(props.selectedLab.address);
      setRoom(props.selectedLab.room);
      setpassword(props.selectedLab.user.password);
      setprovince(props.selectedLab.province);
      sethospital(props.selectedLab.name);
      setImage(props.selectedLab.image);
      setDescription(props.selectedLab.description);
      setType(props.selectedLab.type);
    }
  }, [props.selectedLab]);

  async function handleImgChange(file) {
    let base64 = await toBase64(file);
    if (base64) setImage(base64);
  }

  return (
    <>
      <input
        type="checkbox"
        id="modal-edit-lab"
        checked={props.selectedLab}
        onChange={props.setSelelectedLab}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative  w-11/12 max-w-7xl h-5/7">
          <label
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => {
              props.setSelelectedLab(null);
            }}
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Chi tiết phòng khám lâm sàng</h3>
          <div className="divider"></div>

          <ModalLab
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
            description={description}
            handleImgChange={handleImgChange}
            image={image}
            setDescription={setDescription}
            type={type}
            setType={setType}
          />
          <div className="flex justify-center mt-10 bot-0 ">
            <button className="btn btn-info" onClick={handleEditLab}>
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

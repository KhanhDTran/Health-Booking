import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import Select from "react-select";
import { toast } from "react-toastify";
import ModalLab from "./ModalLab";
import { toBase64 } from "../../../../utils/CommonUtils";
import { postRequestToast } from "../../../../services/commonSv";

export default function Modal_C_Lab(props) {
  const dispatch = useDispatch();

  const [x, setX] = useState("");

  //   useState
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

  async function handleImgChange(file) {
    let base64 = await toBase64(file);
    if (base64) setImage(base64);
  }

  // useEffect
  useEffect(() => {}, []);

  // function
  function a() {}

  async function b() {}

  async function handleCreateLab() {
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
      let res = await postRequestToast(
        "/create-lab",
        {
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
        "Đang tạo phòng khám lâm sàng...."
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
        setDescription("");
        setType("Xét nghiệm máu");
      }
    }
  }

  return (
    <>
      <input
        type="checkbox"
        id="modal-create-lab"
        checked={props.openMCreateLab}
        onChange={props.setopenMCreateLab}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative  w-11/12 max-w-7xl h-5/7">
          <label
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => {
              props.setopenMCreateLab(false);
            }}
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Tạo phòng khám lâm sàng mới</h3>
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
            <button className="btn btn-info" onClick={handleCreateLab}>
              Tạo mới
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import Select from "react-select";
import { toast } from "react-toastify";
import ModalDoctor from "./ModalDoctor";
import { postRequestToast } from "../../../../services/commonSv";
import { fetchAllClinics } from "../../../../store/features/fetchDataSlice";

export default function Modal_C_Doc(props) {
  const dispatch = useDispatch();

  // useState
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [position, setPosition] = useState("Bác sĩ");
  const [specialty, setSpecialty] = useState(null);
  const [clinic, setClinic] = useState(null);
  const [image, setImage] = useState("");

  // UseEffect
  useEffect(() => {}, []);

  // function
  function a() {}

  async function handleCreateDoctor() {
    if (
      !name ||
      !age ||
      !phone ||
      !address ||
      !email ||
      !position ||
      !description ||
      !specialty ||
      !clinic ||
      !image
    )
      toast.warning("Nhập thiếu thông tin");
    else {
      let res = await postRequestToast(
        "/create-doctor",
        {
          name,
          age,
          phone,
          address,
          email,
          position,
          description,
          specialty: specialty.value,
          clinic: clinic.value,
          image,
        },
        "Đang tạo bác sĩ chuyên khoa...."
      );
      if (res) {
        setName("");
        setAge("");
        setAddress("");
        setPhone("");
        setEmail("");
        setClinic(null);
        setSpecialty(null);
        setPosition("Bác sĩ");
        setImage("");
        setDescription("");
        dispatch(fetchAllClinics());
      }
    }
  }

  return (
    <>
      <input
        type="checkbox"
        id="modal-create-doctor"
        checked={props.openMCreateDoctor}
        onChange={props.setopenMCreateDoctor}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative  w-11/12 max-w-7xl h-5/7">
          <label
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => {
              props.setopenMCreateDoctor(false);
            }}
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Tạo bác sĩ chuyên khoa mới</h3>
          <div className="divider"></div>

          <ModalDoctor
            {...{
              name,
              setName,
              age,
              setAge,
              address,
              setAddress,
              phone,
              setPhone,
              email,
              setEmail,
              description,
              setDescription,
              position,
              setPosition,
              specialty,
              setSpecialty,
              clinic,
              setClinic,
              image,
              setImage,
            }}
          />

          <div className="flex justify-center mt-10 bot-0 ">
            <button className="btn btn-info" onClick={handleCreateDoctor}>
              Tạo mới
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

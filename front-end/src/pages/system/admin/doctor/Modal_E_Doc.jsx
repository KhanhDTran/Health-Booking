import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import Select from "react-select";
import { toast } from "react-toastify";
import ModalDoctor from "./ModalDoctor";
import { putRequestToast } from "../../../../services/commonSv";

export default function Modal_E_Doc(props) {
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

  useEffect(() => {
    if (props.selectedDoctor) {
      setName(props.selectedDoctor.name);
      setAge(props.selectedDoctor.age);
      setAddress(props.selectedDoctor.address);
      setEmail(props.selectedDoctor.email);
      setPhone(props.selectedDoctor.phone);
      setPosition(props.selectedDoctor.position);
      setDescription(props.selectedDoctor.description);
      setImage(props.selectedDoctor.image);
      setSpecialty({
        value: props.selectedDoctor.specialty._id,
        label: props.selectedDoctor.specialty.name,
      });
      setClinic({
        value: props.selectedDoctor.clinic._id,
        label: props.selectedDoctor.clinic.name,
      });
    }
  }, [props.selectedDoctor]);

  // function
  function a() {}

  async function b() {}

  async function handleEditDoctor() {
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
      await putRequestToast(
        "/edit-doctor",
        {
          _id: props.selectedDoctor._id,
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
        "Đang lưu thay đổi bác sĩ chuyên khoa...."
      );
    }
  }

  return (
    <>
      <input
        type="checkbox"
        id="modal-edit-doctor"
        checked={props.selectedDoctor}
        onChange={props.setSelectedDoctor}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative  w-11/12 max-w-7xl h-5/7">
          <label
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => {
              props.setSelectedDoctor(null);
            }}
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Chi tiết bác sĩ chuyên khoa</h3>
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
            <button className="btn btn-info" onClick={handleEditDoctor}>
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

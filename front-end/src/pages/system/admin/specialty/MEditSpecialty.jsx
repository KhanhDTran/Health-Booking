import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { putRequestToast } from "../../../../services/commonSv";
import { toBase64 } from "../../../../utils/CommonUtils";
import ModalSpecialty from "./MSpecialty";

export default function ModalEditSpecialty(props) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setdescription] = useState("");
  async function handleImgChange(file) {
    let base64 = await toBase64(file);
    if (base64) setImage(base64);
  }

  async function handleEditSpecialty() {
    if (!name || !description || !image) {
      toast.warning("Nhập thiếu thông tin");
    } else {
      let res = await putRequestToast(
        "/edit-specialty",
        { _id: props.selectedSpecialty._id, name, description, image },
        "Đang lưu thay đổi..."
      );
    }
  }

  useEffect(() => {
    if (props.selectedSpecialty) {
      setName(props.selectedSpecialty.name);
      setdescription(props.selectedSpecialty.description);
      setImage(props.selectedSpecialty.image);
    }
  }, [props.selectedSpecialty]);

  return (
    <>
      <input
        type="checkbox"
        id="modal-edit-specialty"
        checked={props.selectedSpecialty}
        onChange={() => props.setselectedSpecialty(null)}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative  w-11/12 max-w-5xl">
          <label
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => {
              props.setselectedSpecialty(null);
            }}
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Chi tiết chuyên khoa y tế </h3>
          <div className="divider"></div>

          <ModalSpecialty
            name={name}
            setName={setName}
            setdescription={setdescription}
            description={description}
            image={image}
            handleImgChange={handleImgChange}
          />

          <div className="flex justify-center mt-10">
            <button className="btn btn-success" onClick={handleEditSpecialty}>
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

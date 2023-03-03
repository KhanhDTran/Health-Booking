import { useState } from "react";
import { toast } from "react-toastify";
import { postRequestToast } from "../../../../services/commonSv";
import { toBase64 } from "../../../../utils/CommonUtils";
import ModalSpecialty from "./MSpecialty";

export default function ModalCreateSpecialty(props) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setdescription] = useState("");

  async function handleImgChange(file) {
    let base64 = await toBase64(file);
    if (base64) setImage(base64);
  }

  async function handleCreateSpecialty() {
    if (!name || !description || !image) {
      toast.warning("Nhập thiếu thông tin");
    } else {
      let res = await postRequestToast(
        "/create-specialty",
        { name, description, image },
        "Đang tạo chuyên khoa mới..."
      );
      if (res) {
        setName("");
        setImage("");
        setdescription("");
      }
    }
  }

  return (
    <>
      <input
        type="checkbox"
        id="modal-create-specialty"
        checked={props.openModalCreateSpecialty}
        onChange={props.setopenModalCreateSpecialty}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative  w-11/12 max-w-5xl">
          <label
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => {
              props.setopenModalCreateSpecialty(false);
            }}
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Tạo chuyên khoa y tế mới</h3>
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
            <button className="btn btn-info" onClick={handleCreateSpecialty}>
              Tạo mới
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

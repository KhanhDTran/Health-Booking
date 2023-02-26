import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { toBase64 } from "../../../../utils/CommonUtils";
import { postRequestToast } from "../../../../services/commonSv";

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

          <div className="flex flex-col gap-2">
            <div className="form-control w-full ">
              <label className="label" htmlFor="name-specialty">
                <span className="label-text">Tên chuyên khoa</span>
              </label>
              <input
                type="text"
                id="name-specialty"
                placeholder="Tên chuyên khoa...."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered  input-info w-full "
              />
            </div>

            <label className="label">
              <span className="label-text">Mô tả chi tiết</span>
            </label>

            <textarea
              className="textarea textarea-info"
              placeholder="Giới thiệu về chuyên khoa...."
              spellCheck="false"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
            ></textarea>
          </div>

          <div className="flex flex-col lg:flex-row justify-between mt-4">
            <div>
              <label className="label">
                <span className="label-text">Ảnh</span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered file-input-info w-full max-w-xs"
                onChange={(e) => handleImgChange(e.target.files[0])}
              />
            </div>
            <div className="w-80 h-48 bg-base-200 rounded-box">
              <img src={image} alt="" className="rounded-box mt-2 " />
            </div>
          </div>
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

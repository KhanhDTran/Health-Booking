export default function ModalSpecialty(props) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="form-control w-full ">
          <label className="label" htmlFor="name-specialty">
            <span className="label-text">Tên chuyên khoa</span>
          </label>
          <input
            type="text"
            id="name-specialty"
            placeholder="Tên chuyên khoa...."
            value={props.name}
            onChange={(e) => props.setName(e.target.value)}
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
          value={props.description}
          onChange={(e) => props.setdescription(e.target.value)}
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
            onChange={(e) => props.handleImgChange(e.target.files[0])}
          />
        </div>
        <div className="w-80 h-48 bg-base-200 rounded-box">
          <img src={props.image} alt="" className="rounded-box mt-2 " />
        </div>
      </div>
    </>
  );
}

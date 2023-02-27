import { useState, useEffect } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { customStyles } from "../../../../utils/CommonUtils";
import _ from "lodash";

export default function ModalLab(props) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {/* username */}
        <div className="form-control gap-2 flex ">
          <label htmlFor="username" className="pl-2">
            Tên Tài Khoản
          </label>
          <input
            type="text"
            id="username"
            value={props.username}
            onChange={(e) => props.setusername(e.target.value)}
            placeholder="Tên tài khoản....."
            className="input input-bordered input-info w-full "
          />
        </div>
        {/* username */}

        {/* password */}
        <div className="form-control gap-2">
          <label htmlFor="password" className="pl-2">
            Mật Khẩu
          </label>
          <input
            type="password"
            id="password"
            value={props.password}
            onChange={(e) => props.setpassword(e.target.value)}
            placeholder="****************"
            className="input input-bordered input-info w-full "
          />
        </div>
        {/* password */}

        {/* name */}
        <div className="form-control gap-2 flex ">
          <label htmlFor="name" className="pl-2">
            Tên Phòng Khám
          </label>
          <input
            type="text"
            id="name"
            value={props.name}
            onChange={(e) => props.setName(e.target.value)}
            placeholder="Tên phòng khám....."
            className="input input-bordered input-info w-full "
          />
        </div>
        {/* name */}

        {/* description */}
        <div className="form-control gap-2 flex ">
          <label htmlFor="description" className="pl-2">
            Mô Tả
          </label>
          <div className="w-full">
            <textarea
              id="description"
              className="textarea textarea-info w-full"
              placeholder="Giới thiệu về phòng khám lâm sàng...."
              spellCheck="false"
              value={props.description}
              onChange={(e) => props.setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>
        {/* description */}
        {/* type */}
        <div className="form-control gap-2 flex">
          <label htmlFor="type" className="pl-2">
            Loại Khám Lâm Sàng
          </label>
          <select
            className="select select-info w-full "
            value={props.type}
            onChange={(e) => props.setType(e.target.value)}
          >
            <option value="Xét nghiệm máu">Xét nghiệm máu</option>
            <option value="Xét nghiệm nước tiểu">Xét nghiệm nước tiểu</option>
            <option value="Siêu âm ">Siêu âm </option>
            <option value="Chụp X-Quang ">Chụp X-Quang </option>
            <option value="Chụp cộng hưởng từ">Chụp cộng hưởng từ</option>
          </select>
        </div>
        {/* type */}

        {/* room */}
        <div className="form-control gap-2 flex ">
          <label htmlFor="room" className="pl-2">
            Phòng Số
          </label>
          <input
            type="text"
            id="room"
            value={props.room}
            onChange={(e) => props.setRoom(e.target.value)}
            placeholder="Phòng số (A203, B405,.....)"
            className="input input-bordered input-info w-full "
          />
        </div>
        {/* room */}

        {/* address */}
        <div className="form-control gap-2 flex ">
          <label htmlFor="address" className="pl-2">
            Địa Chỉ Phòng Khám
          </label>
          <input
            type="text"
            id="address"
            value={props.address}
            onChange={(e) => props.setAddress(e.target.value)}
            placeholder="Địa chỉ phòng khám...."
            className="input input-bordered input-info w-full "
          />
        </div>
        {/* address */}

        {/* hospital */}
        <div className="form-control gap-2 flex ">
          <label htmlFor="hospital" className="pl-2">
            Bệnh Viện
          </label>
          <input
            type="text"
            id="hospital"
            value={props.hospital}
            onChange={(e) => props.sethospital(e.target.value)}
            placeholder="Bệnh viện... "
            className="input input-bordered input-info w-full "
          />
        </div>
        {/* hospital */}

        {/* province */}
        <div className="form-control gap-2 flex">
          <label htmlFor="province" className="pl-2">
            Tỉnh Thành
          </label>
          <select
            className="select select-info w-full "
            value={props.province}
            onChange={(e) => props.setprovince(e.target.value)}
          >
            <option value="Hà Nội">Hà Nội</option>
            <option value="Hồ Chí Minh">Hồ Chí Minh</option>
            <option value="Đà Nẵng">Đà Nẵng</option>
            <option value="Hải Phòng">Hải Phòng</option>
            <option value="Hải Dương">Hải Dương</option>
            <option value="Huế">Huế</option>
          </select>
        </div>
        {/* province */}
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

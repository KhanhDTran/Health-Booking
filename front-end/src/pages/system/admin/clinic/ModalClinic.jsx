import _ from "lodash";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { customStyles } from "../../../../utils/CommonUtils";

export default function ModalClinic(props) {
  const { specialties } = useSelector((state) => state.fetchData);
  const [specialtyOptions, setspecialtyOptions] = useState([]);

  useEffect(() => {
    fillOptionsSelect();
  }, [specialties]);

  function fillOptionsSelect() {
    let list = [];
    if (!_.isEmpty(specialties)) {
      _.forEach(specialties, function (item) {
        list.push({ value: item._id, label: item.name });
      });
      setspecialtyOptions(list);
    }
  }

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

        {/* specialty */}
        <div className="form-control gap-2 flex ">
          <label htmlFor="specialty" className="pl-2">
            Chuyên Khoa
          </label>
          <div className="w-full">
            <Select
              className="my-react-select-container"
              classNamePrefix="my-react-select"
              options={specialtyOptions}
              styles={customStyles}
              placeholder={"Chuyên Khoa...."}
              value={props.specialty}
              onChange={(e) => props.setspecialty(e)}
            />
          </div>
        </div>
        {/* specialty */}

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

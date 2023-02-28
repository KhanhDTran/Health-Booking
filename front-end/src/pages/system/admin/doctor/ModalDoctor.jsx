import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import Select from "react-select";
import { toast } from "react-toastify";
import { customStyles } from "../../../../utils/CommonUtils";
import {
  fetchAllSpecialties,
  fetchAllClinics,
} from "../../../../store/features/fetchDataSlice";
import { toBase64 } from "../../../../utils/CommonUtils";
import { convertToSelectOptions } from "../../../../utils/CommonUtils";

export default function ModalDoctor(props) {
  // redux
  const dispatch = useDispatch();
  const { clinics, specialties } = useSelector((state) => state.fetchData);

  // useState
  const [specialtyOptions, setSpecialtyOptions] = useState();
  const [clinicOptions, setClinicOptions] = useState();

  // UseEffect
  useEffect(() => {
    dispatch(fetchAllSpecialties());
    dispatch(fetchAllClinics());
  }, []);

  useEffect(() => {
    fillOptionsSelect();
  }, [specialties, clinics]);

  function handelChangeSpecialty(e) {
    props.setSpecialty(e);
    props.setClinic(null);
    if (e) {
      setClinicOptions(
        convertToSelectOptions(
          _.remove(_.clone(clinics), function (x) {
            return !x.doctor && x.specialty._id === e.value;
          })
        )
      );
    } else {
      fillOptionsSelect();
      props.setClinic(null);
    }
  }

  function handelChangeClinic(e) {
    props.setClinic(e);
    if (e) {
      let x = _.find(clinics, ["_id", e.value]);
      props.setSpecialty({ value: x.specialty._id, label: x.specialty.name });
    } else {
      props.setSpecialty(null);
    }
  }

  // function
  function a() {}

  async function handleImgChange(file) {
    let base64 = await toBase64(file);
    if (base64) props.setImage(base64);
  }

  function fillOptionsSelect() {
    if (!_.isEmpty(specialties)) {
      setSpecialtyOptions(convertToSelectOptions(specialties));
    }
    if (!_.isEmpty(clinics)) {
      setClinicOptions(
        convertToSelectOptions(
          _.remove(_.clone(clinics), function (x) {
            return !x.doctor;
          })
        )
      );
    }
  }

  async function b() {}

  return (
    <>
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {/* name */}
          <div className="form-control gap-2 flex ">
            <label htmlFor="name" className="pl-2">
              Tên
            </label>
            <input
              type="text"
              id="name"
              value={props.name}
              onChange={(e) => props.setName(e.target.value)}
              placeholder="Nguyyễn Văn A....."
              className="input input-bordered input-info w-full "
            />
          </div>
          {/* name */}

          {/* age */}
          <div className="form-control gap-2">
            <label htmlFor="age" className="pl-2">
              Ngày Sinh
            </label>
            <input
              type="text"
              id="age"
              value={props.age}
              onChange={(e) => props.setAge(e.target.value)}
              placeholder="1/1/2001...."
              className="input input-bordered input-info w-full "
            />
          </div>
          {/* age */}

          {/* address */}
          <div className="form-control gap-2 flex ">
            <label htmlFor="address" className="pl-2">
              Địa Chỉ
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

          {/* email */}
          <div className="form-control gap-2 flex ">
            <label htmlFor="email" className="pl-2">
              Email
            </label>
            <input
              type="text"
              id="email"
              value={props.email}
              onChange={(e) => props.setEmail(e.target.value)}
              placeholder="Email@mail.com....."
              className="input input-bordered input-info w-full "
            />
          </div>
          {/* email */}

          {/* phone */}
          <div className="form-control gap-2 flex ">
            <label htmlFor="phone" className="pl-2">
              Điện Thoại
            </label>
            <input
              type="text"
              id="phone"
              value={props.phone}
              onChange={(e) => props.setPhone(e.target.value)}
              placeholder="098746312...."
              className="input input-bordered input-info w-full "
            />
          </div>
          {/* phone */}

          {/* position */}
          <div className="form-control gap-2 flex">
            <label htmlFor="position" className="pl-2">
              Chức Vụ
            </label>
            <select
              id="position"
              className="select select-info w-full "
              value={props.position}
              onChange={(e) => props.setPosition(e.target.value)}
            >
              <option value="Bác sĩ">Bác sĩ</option>
              <option value="Tiến sĩ">Tiến sĩ</option>
              <option value="Phó giáo sư">Phó giáo sư</option>
              <option value="Giáo sư">Giáo sư</option>
            </select>
          </div>
          {/* position */}

          {/* specialty */}
          <div className="form-control gap-2 flex ">
            <label htmlFor="specialty" className="pl-2">
              Chuyên Khoa
            </label>
            <div className="w-full">
              <Select
                className="my-react-select-container"
                isClearable={true}
                classNamePrefix="my-react-select"
                options={specialtyOptions}
                styles={customStyles}
                placeholder={"Chuyên Khoa...."}
                value={props.specialty}
                onChange={(e) => handelChangeSpecialty(e)}
              />
            </div>
          </div>
          {/* specialty */}

          {/* clinic */}
          <div className="form-control gap-2 flex ">
            <label htmlFor="clinic" className="pl-2">
              Phòng Khám Chuyên Khoa
            </label>
            <div className="w-full">
              <Select
                isClearable={true}
                className="my-react-select-container"
                classNamePrefix="my-react-select"
                options={clinicOptions}
                styles={customStyles}
                placeholder={"Phòng Khám Chuyên Khoa...."}
                value={props.clinic}
                onChange={(e) => handelChangeClinic(e)}
              />
            </div>
          </div>
          {/* clinic */}

          {/* description */}
          <div className="form-control gap-2 flex ">
            <label htmlFor="description" className="pl-2">
              Mô Tả
            </label>
            <div className="w-full">
              <textarea
                id="description"
                className="textarea textarea-info w-full"
                placeholder="Giới thiệu về bác sĩ chuyên khoa...."
                spellCheck="false"
                value={props.description}
                onChange={(e) => props.setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
          {/* description */}
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
          <div className=" h-44 w-44 ">
            <img
              className="mask mask-circle bg-base-200 h-44 w-44"
              src={props.image}
            />
          </div>
        </div>
      </>
    </>
  );
}

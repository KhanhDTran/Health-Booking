import _ from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import AdminHeader from "../../../../components/AdminHeader";
import Err401Page from "../../../../components/Err401Page";
import { deleteRequestToast } from "../../../../services/commonSv";
import { fetchAllDoctors } from "../../../../store/features/fetchDataSlice";
import {
  convertToSelectOptions,
  customStyles,
} from "../../../../utils/CommonUtils";
import Modal_C_Doc from "./Modal_C_Doc";
import Modal_E_Doc from "./Modal_E_Doc";

export default function ManageDoctor() {
  const dispatch = useDispatch();

  const { role } = useSelector((state) => state.user);
  const { doctors } = useSelector((state) => state.fetchData);

  const [openMCreateDoctor, setopenMCreateDoctor] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctorOptions, setDoctorOptions] = useState([]);

  useEffect(() => {
    dispatch(fetchAllDoctors());
    document.title = "Admin | Bác Sĩ Chuyên Khoa";
  }, []);

  useEffect(() => {
    if (!_.isEmpty(doctors)) setDoctorOptions(convertToSelectOptions(doctors));
  }, [doctors]);

  useEffect(() => {
    if (openMCreateDoctor || selectedDoctor) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.querySelector("body").style = "";
      dispatch(fetchAllDoctors());
    }
  }, [openMCreateDoctor, selectedDoctor]);

  async function handleDelete(item) {
    if (confirm(`Có chắc muốn xóa bác sĩ chuyên khoa: ${item.name}`)) {
      let res = await deleteRequestToast(
        "/delete-doctor",
        { _id: item._id, clinicId: item.clinic._id },
        `Đang xóa bác sĩ chuyên khoa "${item.name}"....`
      );
      if (res) dispatch(fetchAllDoctors());
    }
  }

  return (
    <>
      <div>
        {role && role === "admin" ? (
          <>
            <AdminHeader />
            <div className="container mx-auto flex flex-col">
              <div className="title text-md lg:text-3xl p-4 m-4 bg-base-300 rounded-box text-center">
                <span className="">Bác Sĩ Chuyên Khoa</span>
              </div>
              <div className="container mx-auto flex justify-center">
                <button
                  className="btn btn-active btn-primary"
                  onClick={() => setopenMCreateDoctor(true)}
                >
                  Thêm Bác Sĩ
                </button>
              </div>
              <div className="divider"></div>
              <div></div>
              {/* Select doctor */}
              <div className="container mx-auto flex justify-center m-4">
                <div className="w-64 lg:w-96">
                  <Select
                    isClearable={true}
                    className="my-react-select-container"
                    classNamePrefix="my-react-select"
                    options={doctorOptions}
                    styles={customStyles}
                    placeholder={"Tìm bác sĩ....."}
                    onChange={(e) => {
                      if (e) {
                        let doctor = _.find(doctors, { _id: e.value });
                        setSelectedDoctor(doctor);
                      } else {
                        setSelectedDoctor(null);
                      }
                    }}
                  />{" "}
                </div>
              </div>
              {/* Select doctor */}

              {/* Table doctors*/}
              <div>
                <div>
                  <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                      {/* head */}
                      <thead>
                        <tr>
                          <th></th>
                          <th>Ảnh</th>
                          <th>Tên </th>
                          <th>Chuyên khoa </th>
                          <th>Phòng khám chuyên khoa </th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {doctors &&
                          !_.isEmpty(doctors) &&
                          doctors.map((item, index) => {
                            return (
                              <tr key={item._id}>
                                <th>
                                  <span>{index + 1}</span>
                                </th>
                                <td>
                                  <div className="flex items-center space-x-3">
                                    <img
                                      className="mask mask-circle bg-base-200 h-24 w-24"
                                      src={item.image}
                                    />
                                  </div>
                                </td>
                                <td>
                                  <span className="">{item.name}</span>
                                </td>
                                <td>
                                  <span className="">
                                    {item.specialty.name}
                                  </span>
                                </td>
                                <td>
                                  <span className="">{item.clinic.name}</span>
                                </td>

                                <th>
                                  <div className="flex justify-between">
                                    <button
                                      className="btn btn-ghost btn-xs"
                                      onClick={() => setSelectedDoctor(item)}
                                    >
                                      Chi tiết
                                    </button>
                                    <button
                                      className="btn btn-ghost btn-xs"
                                      onClick={() => handleDelete(item)}
                                    >
                                      Xóa
                                    </button>
                                  </div>
                                </th>
                              </tr>
                            );
                          })}

                        {/* foot */}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th></th>
                          <th>Ảnh</th>
                          <th>Tên </th>
                          <th>Chuyên khoa </th>
                          <th>Tỉnh </th>
                          <th>Địa chỉ</th>
                          <th></th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
              {/* Table doctors*/}
            </div>
            {openMCreateDoctor && (
              <Modal_C_Doc
                openMCreateDoctor={openMCreateDoctor}
                setopenMCreateDoctor={setopenMCreateDoctor}
              />
            )}
            {selectedDoctor && (
              <Modal_E_Doc
                selectedDoctor={selectedDoctor}
                setSelectedDoctor={setSelectedDoctor}
              />
            )}
          </>
        ) : (
          <Err401Page />
        )}
      </div>
    </>
  );
}

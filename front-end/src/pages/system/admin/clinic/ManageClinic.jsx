import _ from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import AdminHeader from "../../../../components/AdminHeader";
import Err401Page from "../../../../components/Err401Page";
import { deleteRequestToast } from "../../../../services/commonSv";
import {
  fetchAllClinics,
  fetchAllSpecialties,
} from "../../../../store/features/fetchDataSlice";
import { customStyles } from "../../../../utils/CommonUtils";
import Modal_C_Clinic from "./Modal_C_Clinic";
import Modal_E_Clinic from "./Modal_E_Clinic";

export default function ManageClinic() {
  const dispatch = useDispatch();

  const { role } = useSelector((state) => state.user);
  const { clinics } = useSelector((state) => state.fetchData);

  const [openMCreateClinic, setopenMCreateClinic] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [clinicOptions, setclinicOptions] = useState([]);

  useEffect(() => {
    document.title = "Admin | Phòng Chuyên Khoa";
    dispatch(fetchAllSpecialties());
    dispatch(fetchAllClinics());
  }, []);

  useEffect(() => {
    fillOptionsSelect();
  }, [clinics]);

  useEffect(() => {
    if (openMCreateClinic || selectedClinic) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.querySelector("body").style = "";
      dispatch(fetchAllClinics());
    }
  }, [openMCreateClinic, selectedClinic]);

  function fillOptionsSelect() {
    let list = [];
    if (!_.isEmpty(clinics)) {
      _.forEach(clinics, function (item) {
        list.push({ value: item._id, label: item.name });
      });
      setclinicOptions(list);
    }
  }

  async function handleDelete(item) {
    console.log(item);
    if (confirm(`Có chắc muốn xóa phòng khám chuyên khoa: ${item.name}`)) {
      let res = await deleteRequestToast(
        "/delete-clinic",
        { _id: item._id, user: item.user },
        `Đang xóa phòng khám chuyên khoa "${item.name}"....`
      );
      if (res) dispatch(fetchAllClinics());
    }
  }

  return (
    <>
      <div>
        {role && role === "admin" ? (
          <>
            <AdminHeader />
            <div className="container mx-auto flex flex-col pb-4">
              <div className="title text-lg lg:text-3xl p-4 m-4 bg-base-300 rounded-box text-center">
                <span className="">Phòng Khám Chuyên Khoa</span>
              </div>
              <div className="container mx-auto flex justify-center">
                <button
                  className="btn btn-active btn-primary"
                  onClick={() => setopenMCreateClinic(true)}
                >
                  Tạo mới phòng khám
                </button>
              </div>
              {/* --------------------------- */}
              <div className="divider"></div>{" "}
              {/* --------------------------- */}
              {/* React select serach clinic */}
              <div className="container mx-auto flex justify-center m-4">
                <div className="w-64 lg:w-96">
                  <Select
                    isClearable={true}
                    className="my-react-select-container"
                    classNamePrefix="my-react-select"
                    options={clinicOptions}
                    styles={customStyles}
                    placeholder={"Tìm phòng khám....."}
                    onChange={(e) => {
                      if (e) {
                        let specialty = _.find(clinics, { _id: e.value });
                        setSelectedClinic(specialty);
                      } else {
                        setSelectedClinic(null);
                      }
                    }}
                  />
                </div>
              </div>
              {/* React select serach clinic */}
              {/* Table clinic*/}
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
                          <th>Tỉnh </th>
                          <th>Địa chỉ</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {clinics &&
                          !_.isEmpty(clinics) &&
                          clinics.map((item, index) => {
                            return (
                              <tr key={item._id}>
                                <th>
                                  <span>{index + 1}</span>
                                </th>
                                <td>
                                  <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                      <div className="rounded-box w-44 h-24">
                                        <img src={item.image} alt="" />
                                      </div>
                                    </div>
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
                                  <span className="">{item.province}</span>
                                </td>
                                <td>
                                  {" "}
                                  <span className="">{item.address}</span>
                                </td>
                                <th>
                                  <div className="flex justify-between">
                                    <button
                                      className="btn btn-ghost btn-xs"
                                      onClick={() => setSelectedClinic(item)}
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
              {/* Table clinic*/}
            </div>
            {openMCreateClinic && (
              <Modal_C_Clinic
                openMCreateClinic={openMCreateClinic}
                setopenMCreateClinic={setopenMCreateClinic}
              />
            )}
            {selectedClinic && (
              <Modal_E_Clinic
                selectedClinic={selectedClinic}
                setSelectedClinic={setSelectedClinic}
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

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminHeader from "../../../../components/AdminHeader";
import Err401Page from "../../../../components/Err401Page";
import ModalCreateSpecialty from "./MCreateSpecialty";
import { fetchAllSpecialties } from "../../../../store/features/fetchDataSlice";
import Select from "react-select";
import _ from "lodash";
import { customStyles } from "../../../../utils/CommonUtils";
import ModalEditSpecialty from "./MEditSpecialty";
import { deleteRequestToast } from "../../../../services/commonSv";

export default function ManageSpecialty() {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.user);
  const [openModalCreateSpecialty, setopenModalCreateSpecialty] =
    useState(false);

  const [specialtyOptions, setspecialtyOptions] = useState([]);
  const [selectedSpecialty, setselectedSpecialty] = useState(null);
  const { specialties } = useSelector((state) => state.fetchData);

  useEffect(() => {
    dispatch(fetchAllSpecialties());
  }, []);

  useEffect(() => {
    if (openModalCreateSpecialty || selectedSpecialty) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.querySelector("body").style = "";
    }
    if (!openModalCreateSpecialty) dispatch(fetchAllSpecialties());
  }, [openModalCreateSpecialty, selectedSpecialty]);

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

  function handleChagneSelect(e) {
    if (e) {
      let specialty = _.find(specialties, { _id: e.value });
      setselectedSpecialty(specialty);
    } else {
      setselectedSpecialty(null);
    }
  }

  async function handleDelete(item) {
    if (confirm(`Có chắc muốn xóa chuyên khoa: ${item.name}`)) {
      let res = await deleteRequestToast(
        "/delete-specialty",
        { _id: item._id },
        `Đang xóa chuyên khoa "${item.name}" ....`
      );
      if (res) dispatch(fetchAllSpecialties());
    }
  }

  return (
    <>
      <div>
        {role && role === "admin" ? (
          <div>
            <AdminHeader />
            <div className="container mx-auto flex flex-col pb-4">
              <div className="title text-lg lg:text-3xl p-4 m-4 bg-base-300 rounded-box text-center">
                <span className="">Chuyên Khoa Y Tế</span>
              </div>
              <div className="container mx-auto flex justify-center">
                <button
                  className="btn btn-active btn-primary"
                  onClick={() => setopenModalCreateSpecialty(true)}
                >
                  Tạo mới chuyên khoa
                </button>
              </div>
              <div className="divider"></div>
              <div className="container mx-auto flex justify-center m-4">
                <div className="w-64 lg:w-96">
                  <Select
                    isClearable={true}
                    className="my-react-select-container"
                    classNamePrefix="my-react-select"
                    options={specialtyOptions}
                    styles={customStyles}
                    placeholder={"Tìm chuyên khoa...."}
                    onChange={(e) => handleChagneSelect(e)}
                  />
                </div>
              </div>
              <div>
                <div className="overflow-x-auto w-full">
                  <table className="table w-full">
                    {/* head */}
                    <thead>
                      <tr>
                        <th></th>
                        <th>Ảnh</th>
                        <th>Tên </th>
                        <th>Mô tả</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {specialties &&
                        !_.isEmpty(specialties) &&
                        specialties.map((item, index) => {
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
                                {" "}
                                <span className="">{item.description}</span>
                              </td>
                              <th>
                                <div className="flex justify-between">
                                  <button
                                    className="btn btn-ghost btn-xs"
                                    onClick={() => setselectedSpecialty(item)}
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
                        <th>Mô tả</th>
                        <th></th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
            {openModalCreateSpecialty && (
              <ModalCreateSpecialty
                openModalCreateSpecialty={openModalCreateSpecialty}
                setopenModalCreateSpecialty={setopenModalCreateSpecialty}
              />
            )}
            {selectedSpecialty && (
              <ModalEditSpecialty
                selectedSpecialty={selectedSpecialty}
                setselectedSpecialty={setselectedSpecialty}
              />
            )}
          </div>
        ) : (
          <Err401Page />
        )}
      </div>
    </>
  );
}

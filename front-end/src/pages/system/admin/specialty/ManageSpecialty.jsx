import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../../../components/AdminHeader";
import Err401Page from "../../../../components/Err401Page";
import ModalCreateSpecialty from "./ModalCreateSpecialty";
import { fetchAllSpecialties } from "../../../../store/features/fetchDataSlice";
import _, { forEach } from "lodash";

export default function ManageSpecialty() {
  const { role } = useSelector((state) => state.user);
  const [openModalCreateSpecialty, setopenModalCreateSpecialty] =
    useState(false);
  const [openModalEditSpecialty, setopenModalEditSpecialty] = useState(false);
  const dispatch = useDispatch();

  const { specialties } = useSelector((state) => state.fetchData);

  useEffect(() => {
    if (openModalCreateSpecialty || openModalEditSpecialty) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.querySelector("body").style = "";
    }
  }, [openModalCreateSpecialty, openModalEditSpecialty]);

  useState(() => {
    dispatch(fetchAllSpecialties());
  }, []);

  return (
    <>
      <div>
        {role && role === "admin" ? (
          <div>
            <AdminHeader />
            <div className="container mx-auto flex flex-col">
              <div className="title text-lg lg:text-3xl p-4 m-4 bg-base-300 rounded-box text-center">
                <span className="">Trang quản lý Chuyên khoa y tế</span>
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
                                <button className="btn btn-ghost btn-xs">
                                  Chi tiết
                                </button>
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
          </div>
        ) : (
          <Err401Page />
        )}
      </div>
    </>
  );
}

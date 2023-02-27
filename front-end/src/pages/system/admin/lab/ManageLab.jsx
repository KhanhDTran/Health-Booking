import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../../../components/AdminHeader";
import Err401Page from "../../../../components/Err401Page";
import Modal_C_Lab from "./Modal_C_Lab";
import Modal_E_lab from "./Modal_E_Lab";
import { fetchAllLabs } from "../../../../store/features/fetchDataSlice";
import { customStyles } from "../../../../utils/CommonUtils";
import Select from "react-select";
import _ from "lodash";
import { deleteRequestToast } from "../../../../services/commonSv";

export default function ManageLab() {
  const dispatch = useDispatch();

  const { role } = useSelector((state) => state.user);
  const { labs } = useSelector((state) => state.fetchData);

  const [openMCreateLab, setopenMCreateLab] = useState(false);
  const [selectedLab, setSelelectedLab] = useState(null);
  const [labOptions, setLabOptions] = useState([]);

  useEffect(() => {
    dispatch(fetchAllLabs());
  }, []);

  useEffect(() => {
    fillOptionsSelect();
  }, [labs]);

  useEffect(() => {
    if (openMCreateLab || selectedLab) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.querySelector("body").style = "";
      dispatch(fetchAllLabs());
    }
  }, [openMCreateLab, selectedLab]);

  function fillOptionsSelect() {
    let list = [];
    if (!_.isEmpty(labs)) {
      _.forEach(labs, function (item) {
        list.push({ value: item._id, label: item.name });
      });
      setLabOptions(list);
    }
  }

  async function handleDelete(item) {
    if (confirm(`Có chắc muốn xóa phòng khám lâm sàng: ${item.name}`)) {
      let res = await deleteRequestToast(
        "/delete-lab",
        { _id: item._id, user: item.user },
        `Đang xóa phòng khám lâm sàng "${item.name}"....`
      );
      if (res) dispatch(fetchAllLabs());
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
                <span className="">Phòng Khám Lâm Sàng</span>
              </div>
              <div className="container mx-auto flex justify-center">
                <button
                  className="btn btn-active btn-primary"
                  onClick={() => setopenMCreateLab(true)}
                >
                  Thêm Phòng Khám
                </button>
              </div>
              {/* --------------------------- */}
              <div className="divider"></div>{" "}
              {/* --------------------------- */}
              {/* React select serach lab */}
              <div className="container mx-auto flex justify-center m-4">
                <div className="w-64 lg:w-96">
                  <Select
                    isClearable={true}
                    className="my-react-select-container"
                    classNamePrefix="my-react-select"
                    options={labOptions}
                    styles={customStyles}
                    placeholder={"Tìm phòng khám....."}
                    onChange={(e) => {
                      if (e) {
                        let lab = _.find(labs, { _id: e.value });
                        setSelelectedLab(lab);
                      } else {
                        setSelelectedLab(null);
                      }
                    }}
                  />
                </div>
              </div>
              {/* React select serach lab */}
              {/* Table lab*/}
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
                          <th>Loại</th>
                          <th>Tỉnh </th>
                          <th>Địa chỉ</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {labs &&
                          !_.isEmpty(labs) &&
                          labs.map((item, index) => {
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
                                  <span className="">{item.type}</span>
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
                                      onClick={() => setSelelectedLab(item)}
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
                          <th>Loại</th>
                          <th>Tỉnh </th>
                          <th>Địa chỉ</th>
                          <th></th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
              {/* Table lab*/}
            </div>
            {openMCreateLab && (
              <Modal_C_Lab
                openMCreateLab={openMCreateLab}
                setopenMCreateLab={setopenMCreateLab}
              />
            )}
            {selectedLab && (
              <Modal_E_lab
                selectedLab={selectedLab}
                setSelelectedLab={setSelelectedLab}
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

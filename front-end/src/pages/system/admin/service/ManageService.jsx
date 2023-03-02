import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminHeader from "../../../../components/AdminHeader";
import Err401Page from "../../../../components/Err401Page";
import _ from "lodash";
import {
  fetchAllClinics,
  fetchAllLabs,
  fetchServices,
} from "../../../../store/features/fetchDataSlice";
import { convertToSelectOptions } from "../../../../utils/CommonUtils";
import SelectLabClinic from "../components/SelectLabClinic";
import FormService from "./FormService";
import { toast } from "react-toastify";
import {
  postRequestToast,
  putRequestToast,
  deleteRequestToast,
} from "../../../../services/commonSv";

export default function ManageService() {
  const dispatch = useDispatch();

  const { role } = useSelector((state) => state.user);

  const { clinics, labs, services } = useSelector((state) => state.fetchData);

  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [unitPrice, setUnitPrice] = useState(0);

  const [service, setService] = useState(null);

  const [selectedClinic, setSelectedClinic] = useState(null);
  const [clinicOptions, setclinicOptions] = useState([]);
  const [selectedLab, setSelectedLab] = useState(null);
  const [labOptions, setlabOptions] = useState([]);

  useEffect(() => {
    dispatch(fetchAllClinics());
    dispatch(fetchAllLabs());
    document.title = "Admin | Dịch Vụ Y Tế";
  }, []);

  useEffect(() => {
    dispatch(
      fetchServices({
        clinic: selectedClinic ? selectedClinic._id : null,
        lab: selectedLab ? selectedLab._id : null,
      })
    );
    clearInputs();
  }, [selectedClinic, selectedLab]);

  useEffect(() => {
    if (!_.isEmpty(clinics)) setclinicOptions(convertToSelectOptions(clinics));
    if (!_.isEmpty(labs)) setlabOptions(convertToSelectOptions(labs));
  }, [clinics, labs]);

  function handleSelectService(item) {
    setName(item.name);
    setUnit(item.unit);
    setUnitPrice(item.unitPrice);
    setService(item);
  }

  async function handleDeleteService() {
    if (confirm(`Bạn có muốn xóa dịch vụ: "${service.name}" ?`)) {
      console.log(service);
      let res = await deleteRequestToast(
        "/delete-service",
        {
          _id: service._id,
        },
        "Đang xóa dịch vụ"
      );
      if (res) {
        clearInputs();
        dispatch(
          fetchServices({
            clinic: selectedClinic ? selectedClinic._id : null,
            lab: selectedLab ? selectedLab._id : null,
          })
        );
      }
    }
  }

  async function handleEditService() {
    if (!name || !unit || !unitPrice) {
      toast.warning("Nhập thiếu thông tin");
    } else {
      let res = await putRequestToast(
        "/edit-service",
        {
          _id: service._id,
          name,
          unitPrice,
          unit,
          clinic: selectedClinic ? selectedClinic : null,
          lab: selectedLab ? selectedLab : null,
        },
        "Đang lưu thay đổi dịch vụ"
      );
      if (res) {
        clearInputs();
        dispatch(
          fetchServices({
            clinic: selectedClinic ? selectedClinic._id : null,
            lab: selectedLab ? selectedLab._id : null,
          })
        );
      }
    }
  }

  async function handleCreateService() {
    if (!name || !unit || !unitPrice) {
      toast.warning("Nhập thiếu thông tin");
    } else {
      let res = await postRequestToast(
        "/create-service",
        {
          name,
          unitPrice,
          unit,
          clinic: selectedClinic ? selectedClinic : null,
          lab: selectedLab ? selectedLab : null,
        },
        "Đang tạo dịch vụ"
      );
      if (res) {
        dispatch(
          fetchServices({
            clinic: selectedClinic ? selectedClinic._id : null,
            lab: selectedLab ? selectedLab._id : null,
          })
        );
        clearInputs();
      }
    }
  }

  function clearInputs() {
    setName("");
    setUnit("");
    setService(null);
    setUnitPrice(0);
  }

  return (
    <>
      <div>
        {role && role === "admin" ? (
          <>
            <AdminHeader />
            <div className="container mx-auto flex flex-col">
              <div className="title text-md lg:text-3xl p-4 m-4 bg-base-300 rounded-box text-center">
                <span className="">Thời Gian Biểu </span>{" "}
              </div>
              <SelectLabClinic
                {...{
                  selectedClinic,
                  selectedLab,
                  setSelectedClinic,
                  setSelectedLab,
                  labOptions,
                  clinicOptions,
                  labs,
                  clinics,
                }}
              />
              <div className="divider"></div>
              <FormService
                {...{ name, setName, unit, setUnit, unitPrice, setUnitPrice }}
              />
              <div className="flex flex-wrap lg:flex-row justify-between gap-10 container mx-auto p-4 m-4">
                <button
                  className="btn btn-info w-32"
                  disabled={service ? true : false}
                  onClick={handleCreateService}
                >
                  Thêm Mới
                </button>
                <button
                  className="btn btn-success w-32"
                  disabled={service ? false : true}
                  onClick={handleEditService}
                >
                  Lưu
                </button>
                <button
                  className="btn btn-error w-32"
                  disabled={service ? false : true}
                  onClick={handleDeleteService}
                >
                  Xóa
                </button>
              </div>
              <div className="divider"></div>
              <div className="overflow-x-auto p-4 m-4">
                {/* ----------  table ----------------------- */}

                <table className="table w-full">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Tên Dịch Vụ</th>
                      <th>Đơn vị</th>
                      <th>Đơn giá (VNĐ)</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {services &&
                      (selectedClinic || selectedLab) &&
                      !_.isEmpty(services) &&
                      services.map((item, index) => {
                        return (
                          <tr key={index} className="" onClick={() => {}}>
                            <th>{index + 1}</th>
                            <td>{item.name}</td>
                            <td>{item.unit}</td>
                            <td>{item.unitPrice}.000</td>
                            <th>
                              <div className="flex justify-between">
                                <button
                                  className="btn btn-ghost btn-xs"
                                  onClick={() => handleSelectService(item)}
                                >
                                  Chi tiết
                                </button>
                              </div>
                            </th>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <Err401Page />
        )}
      </div>
    </>
  );
}

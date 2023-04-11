import _ from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ClinicHeader from "../../../../components/ClinicHeader";
import { putRequestToast } from "../../../../services/commonSv";
import { fetchBookings } from "../../../../store/features/fetchDataSlice";

export default function ClinicExaminedList() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { bookings } = useSelector((state) => state.fetchData);
  const { user } = useSelector((state) => state.user);

  // useState

  // UseEffect
  useEffect(() => {
    document.title = "Danh Sách Đã Khám Xong";
    window.scrollTo(0, 0);

    dispatch(
      fetchBookings({ clinic: user.clinic._id, status: "Đã khám xong" })
    );
  }, []);

  // function

  async function handleMinus(item) {
    let res = await putRequestToast(
      "/clinic/edit-booking-to-pending",
      {
        _id: item._id,
        query: {
          status: "Đang chờ khám",
        },
      },
      `Đang chuyển sang "Đang chờ khám"...`
    );
    if (res)
      dispatch(
        fetchBookings({ clinic: user.clinic._id, status: "Đã khám xong" })
      );
  }

  return (
    <>
      <ClinicHeader />
      <div className="container mx-auto p-4">
        <div className="w-full flex justify-center text-3xl">
          Danh sách bệnh nhân đã khám xong
        </div>

        <div className="divider"></div>
        {bookings && !_.isEmpty(bookings) ? (
          <>
            <div className="overflow-x-auto w-full">
              <table className="table w-full ">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Bệnh nhân</th>
                    <th>Dịch vụ</th>
                    <th>Hồ sơ bệnh án</th>
                    <th></th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((item, index) => {
                    return (
                      <tr key={item._id}>
                        <th>
                          <span> {index + 1} </span>
                        </th>
                        <td>
                          <div className="flex space-x-3">
                            <div className="avatar">
                              <div className=" h-24 w-24 ">
                                <img
                                  className="mask mask-circle bg-base-200 h-36 w-36 hover:cursor-pointer"
                                  src={item.patient.image}
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">
                                {item.patient.name}{" "}
                              </div>
                              <div>Sinh năm: {item.patient.age} </div>
                              <div>Giới tính: {item.patient.gender} </div>
                              <div>Địa chỉ: {item.patient.address} </div>
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className="flex space-x-3">
                            <div>
                              <div className="font-bold">
                                {item.services[0].name}{" "}
                              </div>
                              <div>
                                {" "}
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(item.services[0].unitPrice * 1000)}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td>
                          <button
                            className="btn btn-ghost btn-xs"
                            onClick={() => {
                              navigate(
                                `/system/clinic/patient_record/${item._id}`
                              );
                            }}
                          >
                            Chi tiết
                          </button>
                        </td>
                        <th>
                          {item.status === "Đang khám" && (
                            <div
                              className="tooltip"
                              data-tip="Chuyển sang đang chờ khám"
                            >
                              <button
                                className="btn btn-ghost btn-xs"
                                onClick={() => handleMinus(item)}
                              >
                                <i className="fa-regular fa-square-minus text-2xl"></i>
                              </button>
                            </div>
                          )}
                        </th>
                        <td>
                          <span>{item.status} </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                {/* foot */}
                <tfoot>
                  <tr>
                    <th></th>
                    <th>Bệnh nhân</th>
                    <th>Dịch vụ</th>
                    <th>Hồ sơ bệnh án</th>
                    <th></th>
                    <th>Trạng thái</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </>
        ) : (
          <>Hiện không có bệnh nhân đã khám xong</>
        )}
      </div>
    </>
  );
}

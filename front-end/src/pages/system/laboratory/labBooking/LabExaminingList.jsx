import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { fetchBookings } from "../../../../store/features/fetchDataSlice";
import LabHeader from "../../../../components/LabHeader";
import { putRequestToast } from "../../../../services/commonSv";
import "moment/locale/vi";
import moment from "moment";
moment().format();

export default function LabExaminingList() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { bookings } = useSelector((state) => state.fetchData);
  const { user } = useSelector((state) => state.user);

  // useState

  // UseEffect

  useEffect(() => {
    document.title = "Danh Sách Đang Khám";
    window.scrollTo(0, 0);
    dispatch(fetchBookings({ lab: user.lab._id }));
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
    if (res) dispatch(fetchBookings({ lab: user.lab._id }));
  }

  return (
    <>
      <LabHeader />
      <div className="container mx-auto p-4">
        <div className="w-full flex justify-center text-3xl">
          Danh sách bệnh nhân đang khám
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
                    <th>Thời gian</th>
                    <th></th>
                    <th>Trạng thái</th>
                    <th>Kết quả khám</th>
                  </tr>
                </thead>
                <tbody>
                  {_.filter(bookings, function (o) {
                    return (
                      o.status !== "Đang chờ khám" &&
                      o.status !== "Đã khám xong"
                    );
                  }).map((item, index) => {
                    let services = _.filter(
                      item.record.labServices,
                      function (o) {
                        return o.service.lab === user.lab._id;
                      }
                    );
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
                          {services.map((item, index) => {
                            return (
                              <div key={index}>
                                {item.service.name} <br />{" "}
                              </div>
                            );
                          })}
                        </td>

                        <td>
                          {" "}
                          <div>
                            <div className="font-bold">{item.hour} </div>
                            <div>{moment(item.date).format("DD-MM-YYYY")}</div>
                          </div>
                        </td>

                        <th>
                          {item.status === "Đang khám" && (
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
                        <td>
                          <button
                            className="btn btn-ghost btn-xs"
                            onClick={() => {
                              navigate(
                                `/system/laboratory/result/${item._id}/${item.record._id}`
                              );
                            }}
                          >
                            Chi tiết
                          </button>
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
                    <th>Thời gian</th>
                    <th></th>
                    <th>Trạng thái</th>
                    <th>Kết quả khám</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </>
        ) : (
          <>Hiện không có bệnh nhân đang khám</>
        )}
      </div>
    </>
  );
}

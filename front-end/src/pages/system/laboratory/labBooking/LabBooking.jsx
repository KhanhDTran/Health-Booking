import _ from "lodash";
import moment from "moment";
import "moment/locale/vi";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import LabHeader from "../../../../components/LabHeader";
import { putRequestToast } from "../../../../services/commonSv";
import { fetchBookings } from "../../../../store/features/fetchDataSlice";
moment().format();

export default function LabBooking() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { bookings } = useSelector((state) => state.fetchData);

  // useState
  const [x, setX] = useState("");
  const [date, setDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)));
  const [listBookings, setListBookings] = useState([]);

  // UseEffect
  useEffect(() => {}, []);

  useEffect(() => {
    document.title = "Lịch Hẹn Khám Bệnh";
    dispatch(fetchBookings({ lab: user.lab._id, status: "Đang chờ khám" }));
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (bookings) {
      let list = _.filter(bookings, (o) => {
        return (
          moment(o.date).format("DD-MM-YYYY") ===
          moment(date).format("DD-MM-YYYY")
        );
      });
      setListBookings(list);
    }
  }, [bookings]);

  function handleChangeDate(e) {
    setDate(e);
    let list = _.filter(bookings, (o) => {
      return (
        moment(o.date).format("DD-MM-YYYY") === moment(e).format("DD-MM-YYYY")
      );
    });
    setListBookings(list);
  }

  // function
  function a() {}

  async function handleAdd(item) {
    let res = await putRequestToast(
      "/clinic/edit-booking-to-examining",
      {
        _id: item._id,
        query: {
          status: "Đang khám",
        },
      },
      `Đang chuyển sang "Đang khám bệnh"...`
    );
    if (res)
      dispatch(fetchBookings({ lab: user.lab._id, status: "Đang chờ khám" }));
  }

  return (
    <>
      <LabHeader />
      <div className="container mx-auto p-4">
        <div className="w-full flex justify-center text-3xl">
          Danh sách lịch hẹn khám bệnh
        </div>
        <div className="flex flex-col">
          <div className="p-4 w-96 flex flex-col  gap-4 justify-center">
            <label
              htmlFor="date"
              className="text-2xl w-40 hover:cursor-pointer"
            >
              Chọn ngày <i className="fa-solid fa-calendar"></i>
            </label>
            <DatePicker
              id="date"
              startDate={new Date(new Date().setHours(0, 0, 0, 0))}
              selected={date}
              onChange={(e) => handleChangeDate(e)}
              dateFormat="dd - MM - yyyy"
            />
          </div>
        </div>

        <div className="divider"></div>
        <div className="w-full flex justify-center text-4xl p-10 m-10 text-3xl">
          Danh sách đang chờ khám
        </div>

        {listBookings && listBookings.length > 0 ? (
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
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((item, index) => {
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
                          <div
                            className="tooltip"
                            data-tip="Chuyển sang đang khám"
                          >
                            <button
                              className="btn btn-ghost btn-xs"
                              onClick={() => handleAdd(item)}
                            >
                              <i className="fa-regular fa-square-plus text-2xl"></i>
                            </button>
                          </div>
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
                    <th>Thời gian</th>
                    <th></th>
                    <th>Trạng thái</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </>
        ) : (
          <>Không có lịch hẹn hôm này</>
        )}
      </div>
    </>
  );
}

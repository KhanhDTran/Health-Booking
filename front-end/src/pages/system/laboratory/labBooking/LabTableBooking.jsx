import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import "moment/locale/vi";
moment().format();

export default function LabTableBooking(props) {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  // console.log(user);

  return (
    <>
      {props.bookings && !_.isEmpty(props.bookings) && (
        <>
          <div className="overflow-x-auto w-full">
            <table className="table w-full ">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Bệnh nhân</th>
                  <th>Dịch vụ</th>
                  {props.status === "Đang khám" && <th>Kết quả khám</th>}
                  {props.status === "Đang chờ khám" && <th>Thời gian</th>}
                  <th></th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {props.bookings.map((item, index) => {
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

                      {props.status === "Đang chờ khám" && (
                        <td>
                          {" "}
                          <div>
                            <div className="font-bold">{item.hour} </div>
                            <div>{moment(item.date).format("DD-MM-YYYY")}</div>
                          </div>
                        </td>
                      )}
                      {props.status === "Đang khám" && (
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
                      )}

                      <th>
                        {item.status === "Đang chờ khám" && (
                          <div
                            className="tooltip"
                            data-tip="Chuyển sang đang khám"
                          >
                            <button
                              className="btn btn-ghost btn-xs"
                              onClick={() => props.handleAdd(item)}
                            >
                              <i className="fa-regular fa-square-plus text-2xl"></i>
                            </button>
                          </div>
                        )}
                        {item.status === "Đang khám" && (
                          <div
                            className="tooltip"
                            data-tip="Chuyển sang đang chờ khám"
                          >
                            <button
                              className="btn btn-ghost btn-xs"
                              onClick={() => props.handleMinus(item)}
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
                  {props.status === "Đang khám" && <th>Kết quả khám</th>}
                  {props.status === "Đang chờ khám" && <th>Thời gian</th>}
                  <th></th>
                  <th>Trạng thái</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </>
      )}
    </>
  );
}

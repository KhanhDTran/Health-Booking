import _ from "lodash";
import moment from "moment";
import "moment/locale/vi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
moment().format();

export default function ClinicTablebooking(props) {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  return (
    <>
      {props.bookings && !_.isEmpty(props.bookings) && (
        <>
          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Bệnh nhân</th>

                  <th>Dịch vụ</th>
                  <th>Thời gian</th>
                  <th>Trạng thái</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {props.bookings.map((item, index) => {
                  return (
                    <tr key={item._id}>
                      <th>
                        <span> {index + 1} </span>
                      </th>
                      <td>
                        <div className="flex items-center space-x-3">
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
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="flex items-center space-x-3">
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
                        {" "}
                        <div>
                          <div className="font-bold">{item.hour} </div>
                          <div>{moment(item.date).format("DD-MM-YYYY")}</div>
                        </div>
                      </td>
                      <td>
                        <span>{item.status} </span>
                      </td>
                      <th>
                        <button
                          className="btn btn-ghost btn-xs"
                          //   onClick={() => props.cancleBooking(item)}
                        >
                          Hủy lịch khám
                        </button>
                      </th>
                    </tr>
                  );
                })}
              </tbody>
              {/* foot */}
              <tfoot>
                <tr>
                  <th></th>
                  <th>Bác sĩ</th>
                  <th>Phòng khám </th>
                  <th>Dịch vụ</th>
                  <th>Thời gian</th>
                  <th>Trạng thái</th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          </div>
        </>
      )}
    </>
  );
}

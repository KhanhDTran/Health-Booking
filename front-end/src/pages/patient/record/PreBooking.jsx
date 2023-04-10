import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import "moment/locale/vi";
moment().format();

export default function PreBooking(props) {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(props.preBooking);

  return (
    <>
      <div className="divider"></div>
      <div className="flex flex-col gap-4 p-4">
        <div className="w-full flex justify-center text-4xl m-4">
          <span>Thông tin hồ sơ bệnh án trước đó</span>
        </div>
        <div className="shadow-2xl ">
          <div className="overflow-x-auto">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Tên dịch vụ</th>
                  <th>Thời gian</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="">
                <tr>
                  <td></td>
                  <td> {props.preBooking.services[0].name} </td>
                  <td>
                    {" "}
                    <div className="font-bold">{props.preBooking.hour} </div>
                    <div>
                      {moment(props.preBooking.date).format("DD-MM-YYYY")}
                    </div>{" "}
                  </td>
                  <td>
                    <Link
                      to={{
                        pathname:
                          props.user === "patient"
                            ? `/patient/detail-record/${props.preBooking._id}`
                            : `/system/clinic/patient_record/${props.preBooking._id}`,
                      }}
                      target="_blank"
                    >
                      Chi tiết
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

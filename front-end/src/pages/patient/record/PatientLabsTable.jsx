import _ from "lodash";
import moment from "moment";
import "moment/locale/vi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
moment().format();

export default function PatientLabsTable(props) {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <>
        <div className="divider"></div>
        <div className="flex flex-col gap-4 p-4">
          <div className="w-full flex justify-center text-4xl m-4">
            <span>Đăng ký lịch khám lâm sàng</span>
          </div>
          <div className="shadow-2xl">
            <div className="overflow-x-auto">
              <table className="table w-full">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                    <th>phòng khám</th>
                    <th>Phòng</th>
                    <th>Loại khám</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {props.records &&
                    props.records[0].labs.length > 0 &&
                    props.records[0].labs.map((item, index) => {
                      return (
                        <tr key={item._id}>
                          <th> {index + 1} </th>
                          <td>
                            {" "}
                            <div className="avatar">
                              <div className=" h-28 w-28 ">
                                <img
                                  className="mask mask-circle bg-base-200 h-36 w-36 hover:cursor-pointer"
                                  src={item.image}
                                />
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="flex flex-col">
                              <div>{item.name}</div>
                            </div>
                          </td>

                          <td>{item.room}</td>
                          <td>{item.type}</td>
                          <td>
                            {" "}
                            <button
                              className="btn btn-ghost btn-xs"
                              onClick={() => props.handleBookingLab(item)}
                            >
                              Đăng ký khám
                            </button>{" "}
                          </td>
                        </tr>
                      );
                    })}
                  {/* row 1 */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

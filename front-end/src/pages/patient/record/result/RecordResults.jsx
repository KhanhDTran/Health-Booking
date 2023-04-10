import _ from "lodash";
import moment from "moment";
import "moment/locale/vi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
moment().format();

export default function RecordResults(props) {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <div className="divider"></div>
      <div className="flex flex-col gap-4">
        <div className="w-full flex justify-center text-4xl m-4">
          Kết quả khám lâm sàng
        </div>
        <div>
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
                    <th>Kết quả</th>
                  </tr>
                </thead>
                <tbody>
                  {props.results &&
                    props.results.length > 0 &&
                    props.results.map((item, index) => {
                      if (item.result)
                        return (
                          <tr key={item._id}>
                            <th> {index + 1} </th>
                            <td>
                              {" "}
                              <div className="avatar">
                                <div className=" h-28 w-28 ">
                                  <img
                                    className="mask mask-circle bg-base-200 h-36 w-36 hover:cursor-pointer"
                                    src={item.lab.image}
                                  />
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="flex flex-col">
                                <div>{item.lab.name}</div>
                              </div>
                            </td>

                            <td>{item.lab.room}</td>
                            <td>{item.lab.type}</td>
                            <td>
                              <button
                                className="btn btn-ghost btn-xs"
                                onClick={() => props.handleShowResult(item)}
                              >
                                Xem chi tiết
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
      </div>
    </>
  );
}

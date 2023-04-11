import moment from "moment";
import "moment/locale/vi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
moment().format();

export default function RecordTableServices(props) {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="shadow-2xl ">
      <div className="text-2xl p-4">Danh sách dịch vụ</div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Tên dịch vụ</th>
              <th></th>
              <th>Phòng Khám lâm sàng</th>
              <th>Địa chỉ phòng Khám</th>
              <th>Giá tiền</th>
            </tr>
          </thead>
          <tbody className="h-40">
            {props.type !== "" &&
              props.serviceList.map((item, index) => {
                return (
                  <tr key={item._id}>
                    <th>{index + 1}</th>
                    <td> {item.name} </td>
                    <td>
                      {" "}
                      <div className="tooltip" data-tip="Chỉ định dịch vụ">
                        <button
                          className="btn btn-ghost btn-xs"
                          onClick={() => props.handleAddService(item)}
                        >
                          <i className="fa-regular fa-square-plus text-2xl"></i>
                        </button>
                      </div>{" "}
                    </td>

                    <td> {item.lab.name} </td>
                    <td> {item.lab.address} </td>
                    <td>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.unitPrice * 1000)}
                    </td>
                  </tr>
                );
              })}
          </tbody>
          <thead>
            <tr>
              <th></th>
              <th>Tên dịch vụ</th>
              <th></th>
              <th>Phòng Khám lâm sàng</th>
              <th>Địa chỉ phòng Khám</th>
              <th>Giá tiền</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}

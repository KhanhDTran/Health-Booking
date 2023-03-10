import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import "moment/locale/vi";
moment().format();

export default function TableIndicatedServices(props) {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="shadow-2xl">
      <div className="text-2xl p-4">Danh sách dịch vụ đã chỉ định</div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Tên dịch vụ</th>
              <th>Phòng Khám lâm sàng</th>
              <th>Đơn vị</th>
              <th>Số lượng</th>
              <th></th>
              <th>Giá tiền</th>
            </tr>
          </thead>
          <tbody className="h-40">
            {props.selectedList.map((item, index) => {
              return (
                <tr key={item.service._id}>
                  <th>{index + 1}</th>
                  <td> {item.service.name} </td>

                  <td> {item.service.lab.name} </td>
                  <td> {item.service.unit} </td>
                  <td> {item.quantity} </td>
                  <td>
                    {" "}
                    <div className="tooltip" data-tip="Bỏ chỉ định dịch vụ">
                      <button
                        className="btn btn-ghost btn-xs"
                        onClick={() => props.handleMinusService(item)}
                      >
                        <i className="fa-regular fa-square-minus text-2xl"></i>
                      </button>
                    </div>{" "}
                  </td>
                  <td>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.service.unitPrice * 1000)}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <thead>
            <tr>
              <th></th>
              <th>Tên dịch vụ</th>
              <th>Phòng Khám lâm sàng</th>
              <th>Đơn vị</th>
              <th>Số lượng</th>
              <th></th>
              <th>Giá tiền</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}

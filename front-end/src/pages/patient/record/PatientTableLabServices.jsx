import moment from "moment";
import "moment/locale/vi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
moment().format();

export default function PatientTableLabServices(props) {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <div className="divider"></div>
      <div className="flex flex-col gap-4 p-4">
        <div className="w-full flex justify-center text-4xl m-4">
          <span>Danh sách chỉ định dịch vụ khám lâm sàng</span>
        </div>
        <div className="shadow-2xl ">
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
                </tr>
              </thead>
              <tbody className="h-40">
                {props.serviceList.map((item, index) => {
                  return (
                    <tr key={item.service._id}>
                      <th>{index + 1}</th>
                      <td> {item.service.name} </td>
                      <td> {item.service.lab.name} </td>
                      <td> {item.service.unit} </td>
                      <td> {item.quantity} </td>
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
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

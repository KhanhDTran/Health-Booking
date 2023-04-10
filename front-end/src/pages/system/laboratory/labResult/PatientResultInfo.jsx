import moment from "moment";
import "moment/locale/vi";
moment().format();

export default function PatientResultInfo(props) {
  return (
    <div className="p-4">
      <div className="w-full flex justify-center text-4xl m-4">
        <span>Thông tin khám bệnh</span>
      </div>
      <div className="card   w-full  shadow-2xl bg-base-100 ">
        <div className="avatar justify-center flex items-center">
          <div className=" h-36 w-36 ">
            <img
              className="mask mask-circle bg-base-200 h-36 w-36"
              src={props.booking.patient.image}
            />
          </div>
        </div>
        <div className="p-4 m-4 w-full not-prose flex grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          <div className="w-full">
            <span>Tên bệnh nhân: {props.booking.patient.name} </span>
          </div>
          <div className="w-full">
            <span>Giới tính: {props.booking.patient.gender} </span>
          </div>
          <div className="w-full">
            <span>Sinh năm: {props.booking.patient.age} </span>
          </div>
          <div className="w-full">
            <span> Địa chỉ: {props.booking.patient.address} </span>
          </div>
          <div className="w-full">
            <span>Số điện thoại: {props.booking.patient.phone}</span>
          </div>
          <div className="w-full">
            <span>Phòng khám: {props.booking.lab.name} </span>
          </div>
          <div className="w-full">
            <span>Số phòng: {props.booking.lab.room} </span>
          </div>
          <div className="w-full">
            <span>Giờ khám: {props.booking.hour} </span>
          </div>
          <div className="w-full">
            <span>
              Ngày khám: {moment(props.booking.date).format("DD-MM-YYYY")}
            </span>
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <div className="container mx-auto shadow-2xl">
        <div className="w-full">
          <span className="p-4 m-4 text-3xl">Danh sách dịch vụ: </span>
          <div className="overflow-x-auto p-4">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Tên</th>
                  <th>Số Lượng</th>
                </tr>
              </thead>
              <tbody>
                {props.services.map((item, index) => {
                  // console.log(item);
                  return (
                    <tr key={index}>
                      <th> {index + 1} </th>
                      <td>{item.service.name} </td>
                      <td>
                        {item.quantity} {item.service.unit}{" "}
                      </td>
                    </tr>
                  );
                  // <div></div>;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

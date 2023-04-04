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
          {/* <div className="w-full">
            <span>Dịch vụ: {props.records[0].booking.services[0].name} </span>
          </div> */}
        </div>
      </div>
    </div>
  );
}

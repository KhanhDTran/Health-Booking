import { useNavigate } from "react-router-dom";

export default function DoctorInfoSection(props) {
  let navigate = useNavigate();

  return (
    <>
      {props.doctor && (
        <div className="doctor-info min-h-96  flex flex-col lg:flex-row">
          <div className="avatar w-full  lg:w-1/2 items-center justify-center">
            <div className=" w-1/3  max-w-64 rounded-full">
              <img src={props.doctor.image} />
            </div>
          </div>
          <div className="info h-full items-center flex flex-col gap-4 p-4">
            <h1 className="text-4xl font-bold">
              {props.doctor.position} {props.doctor.name}
            </h1>
            <p>
              <b>Chuyên khoa:</b> {props.doctor.specialty.name}
            </p>
            <p>
              <b>Giới thiệu:</b> {props.doctor.description}
            </p>
            <p>
              <b>Năm Sinh:</b> {props.doctor.age}
            </p>
            <p>
              <b>Email: </b> {props.doctor.email}
            </p>
            <p>
              <b>Phone: </b> {props.doctor.phone}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

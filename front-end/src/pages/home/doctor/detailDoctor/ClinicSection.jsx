import { useNavigate } from "react-router-dom";

export default function ClinicSection(props) {
  let navigate = useNavigate();

  return (
    <>
      {props.clinic && (
        <div className="clinic-info flex flex-col p-4 gap-10">
          <div className="w-full text-center text-3xl">
            <h1 className="">
              <i className="fa-regular fa-hospital"></i> Phòng khám
            </h1>
          </div>
          <div className="flex flex-col lg:flex-row p-4 ">
            <div className="w-full lg-w-1/3 items-center justify-center">
              <figure>
                <img
                  src={props.clinic.image}
                  alt="Shoes"
                  className="w-92 h-44  lg:h-64 rounded-box"
                />
              </figure>
            </div>
            <div className="w-full">
              <div className="info h-full flex flex-col gap-4 lg:gap-8 p-4 ">
                <h1 className="text-4xl font-bold">{props.clinic.name}</h1>
                <p>
                  {" "}
                  <b>Phòng: </b> {props.clinic.room}{" "}
                </p>
                <p>
                  <i className="fa-solid fa-location-dot"></i> <b>Địa chỉ:</b>{" "}
                  {props.clinic.address}, {props.clinic.province}
                </p>
                {props.clinic.hospital && (
                  <p>
                    {" "}
                    <b>Bệnh viện :</b> {props.clinic.hospital}{" "}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

export default function OtherDocSection(props) {
  let navigate = useNavigate();

  return (
    <div className="doctor-info ">
      <div className="w-full text-center text-3xl">
        <h1 className="">Các bác sĩ chuyên khoa khác</h1>
      </div>
      <div className=" p-4 pt-20 ">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-2">
            {props.doctors &&
              !_.isEmpty(props.doctors) &&
              props.doctors.map((item) => {
                return (
                  <div key={item._id}>
                    <div
                      className="card  bg-base-200 hover:cursor-pointer  hover:bg-base-300 shadow-xl"
                      onClick={() => {
                        window.scrollTo(0, 0);
                        navigate(`/doctor/${item._id}`);
                      }}
                    >
                      <div className="avatar flex justify-center p-4">
                        <div className="w-40 rounded-full">
                          <img src={item.image} />
                        </div>
                      </div>
                      <div className="card-body">
                        <h2 className="card-title">
                          {item.position} {item.name}
                        </h2>
                        <p> Chuyên khoa {item.specialty.name} </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

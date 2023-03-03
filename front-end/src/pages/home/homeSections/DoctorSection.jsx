import _ from "lodash";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function DoctorSection() {
  let navigate = useNavigate();

  const { doctors } = useSelector((state) => state.fetchData);

  return (
    <div className=" p-4 pt-20 ">
      <div className="flex flex-col gap-20">
        <div className="title text-center text-2xl lg:text-5xl font-bold">
          <h1>Bác Sĩ Chuyên Khoa Nổi Bật</h1>
        </div>

        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-2">
            {doctors &&
              _.sampleSize(doctors, 4).map((item) => {
                return (
                  <div key={item._id}>
                    <div
                      className="card  bg-base-200 hover:cursor-pointer  hover:bg-base-300 shadow-xl"
                      onClick={() => {
                        navigate(
                          `/doctor/${item._id}/${item.position}/${item.name}`
                        );
                      }}
                    >
                      <div className="avatar flex justify-center p-4">
                        <div className="w-52 rounded-full">
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

        <div className="flex justify-center pb-4">
          <button
            className="btn btn-outline btn-info"
            onClick={() => {
              navigate(`/all-doctors`);
            }}
          >
            Xem Thêm
          </button>
        </div>
      </div>
    </div>
  );
}

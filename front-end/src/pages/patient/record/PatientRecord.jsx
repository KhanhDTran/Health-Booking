import _ from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../../components/Footer";
import PatientHeader from "../../../components/PatientHeader";
import { fetchBookings } from "../../../store/features/fetchDataSlice";
import BookingTable from "../booking/BookingTable";

export default function PatientRecord() {
  const dispatch = useDispatch();
  // useState
  const { role, user } = useSelector((state) => state.user);
  const { bookings } = useSelector((state) => state.fetchData);

  useEffect(() => {
    document.title = "Hồ Sơ Bệnh Án";
    window.scrollTo(0, 0);
  }, []);

  // UseEffect
  useEffect(() => {
    if (user) {
      dispatch(fetchBookings({ patient: user.patient._id }));
    }
  }, [user]);

  // function
  function a() {}

  async function b() {}

  return (
    <>
      <PatientHeader />
      {role && role === "patient" ? (
        <div>
          <div className="container mx-auto m-4 min-h-screen">
            <div className="flex flex-col gap-4">
              <div className="flex w-full justify-center text-4xl">
                <span className="p-4 m-4">Danh sách hồ sơ bệnh án</span>
              </div>
              {/* -------- */}

              <BookingTable
                bookings={_.filter(bookings, (o) => {
                  return o.clinic && o.status !== "Đang chờ khám";
                })}
                // cancleBooking={cancleBooking}
                record={"record"}
              />

              {!bookings ||
                (_.isEmpty(bookings) && (
                  <div className="text-4xl flex justify-center h-96">
                    {" "}
                    <span>Không có hồ sơ bệnh án nào</span>{" "}
                  </div>
                ))}
              {/* -------- */}
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <Err401Page />
      )}
    </>
  );
}

import moment from "moment";
import "moment/locale/vi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postRequestToast } from "../../../../services/commonSv";
moment().format();

export default function ModalBooking(props) {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  async function handleBooking() {
    let res = await postRequestToast(
      "/patient/create-booking",
      {
        clinic: props.clinic._id,
        patient: user.patient._id,
        doctor: props.doctor._id,
        services: [props.service._id],
        schedule: props.schedule._id,
        status: "Đang chờ khám",
      },
      "Đang tiến hành đặt lịch...."
    );
    props.setSchedule(false);
  }

  return (
    <>
      <input
        type="checkbox"
        id="booking-modal"
        className="modal-toggle"
        checked={props.schedule === null ? false : true}
        onChange={props.setSchedule}
      />
      <div className="modal">
        <div className="modal-box relative w-11/12 max-w-5xl">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => props.setSchedule(false)}
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Thông tin đặt lịch</h3>
          <div className="divider"></div>

          {/* ----- content ---- */}

          <div className="flex flex-col gap-4 ">
            <div className="overflow-x-auto">
              <table className="table w-full">
                {/* head */}

                <tbody>
                  {/* row 1 */}
                  <tr>
                    <td>
                      <i className="fa-solid fa-user-doctor p-2"></i>
                      <b>Bác sĩ:</b>
                    </td>
                    <td>
                      {" "}
                      {props.doctor.position} {props.doctor.name}
                    </td>
                  </tr>
                  {/* row 1 */}
                  {/* row 2 */}
                  <tr>
                    <td>
                      <i className="fa-regular fa-hospital p-2"></i>
                      <b>Phòng khám:</b>
                    </td>
                    <td> {props.clinic.name}</td>
                  </tr>
                  {/* row 2 */}
                  {/* row 3 */}
                  <tr>
                    <td>
                      <i className="fa-solid fa-suitcase-medical p-2"></i>
                      <b>Dịch vụ:</b>
                    </td>
                    <td> {props.service.name}</td>
                  </tr>
                  {/* row 3 */}
                  {/* row 4 */}
                  <tr>
                    <td>
                      <i className="fa-solid fa-dollar-sign p-2"></i>
                      <b>Giá:</b>
                    </td>
                    <td>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(props.service.unitPrice * 1000)}
                    </td>
                  </tr>
                  {/* row 4 */}
                  {/* row 5 */}
                  <tr>
                    <td>
                      <i className="fa-solid fa-location-dot p-2"></i>
                      <b>Địa chỉ:</b>
                    </td>
                    <td>
                      {" "}
                      {props.clinic.address}, {props.clinic.province}
                    </td>
                  </tr>
                  {/* row 5 */}
                  {/* row 6 */}
                  <tr>
                    <td>
                      <i className="fa-regular fa-clock p-2"></i>
                      <b>Giờ:</b>
                    </td>
                    <td> {props.schedule.hour}</td>
                  </tr>
                  {/* row 6 */}
                  {/* row 7 */}
                  <tr>
                    <td>
                      <i className="fa-solid fa-calendar-days p-2"></i>
                      <b>Ngày</b>
                    </td>
                    <td> {moment(props.schedule.date).format("DD-MM-YYYY")}</td>
                  </tr>
                  {/* row 7 */}
                </tbody>
              </table>
            </div>
          </div>

          {/* ----- content ---- */}

          <div className="flex justify-center mt-4 pt-4">
            <button className="btn btn-info" onClick={() => handleBooking()}>
              Đặt Lịch
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

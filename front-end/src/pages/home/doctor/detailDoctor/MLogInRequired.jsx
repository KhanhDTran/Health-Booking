import moment from "moment";
import "moment/locale/vi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { select_doctor } from "../../../../store/features/patientSlice";
moment().format();

export default function MLogInRequired(props) {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <input
        type="checkbox"
        id="modal-login-required"
        className="modal-toggle"
        checked={props.openMLoginRequired}
        onChange={props.setOpenMLoginRequired}
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="modal-login-required"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => props.setOpenMLoginRequired(false)}
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Yêu cầu đăng nhập</h3>
          <div className="divider"></div>
          <p className="py-4">Bạn cần đăng nhập để có thể đăng ký lịch khám.</p>
          <div className="flex justify-center mt-4 pt-4">
            <button
              className="btn btn-info"
              onClick={() => {
                dispatch(
                  select_doctor({
                    _id: props.doctor._id,
                    position: props.doctor.position,
                    name: props.doctor.name,
                  })
                );
                navigate("/login");
              }}
            >
              Đăng nhập
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

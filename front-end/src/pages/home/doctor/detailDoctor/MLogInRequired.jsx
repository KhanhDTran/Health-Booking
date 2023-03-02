import moment from "moment";
import "moment/locale/vi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
                dispatch(select_doctor(props.doctor._id));
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

import logo from "../../assets/images/logo.png";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getRequestToast } from "../../services/commonSv";
import { logged_in } from "../../store/features/userSlice";

export default function Login() {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  const { role } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    document.title = "Đăng nhập | Health Booking";
  }, []);

  async function handleLogin() {
    if (!username || !password) {
      toast.warning("Nhập thiếu thông tin");
    } else {
      let res = await getRequestToast(
        "/login",
        { username, password },
        "Đang đăng nhập..."
      );
      if (res) dispatch(logged_in(res));
    }
  }
  async function handleKeyDown(e) {
    if (e.key === "Enter") {
      await handleLogin();
    }
  }

  useEffect(() => {
    if (role) {
      if (role === "admin") {
        navigate("/system/admin/");
      }
    }
  }, [role]);

  return (
    <div data-theme="">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col  gap-10 w-full">
          <div className="text-center  flex-col">
            <div className="w-24 rounded mx-auto">
              <img src={logo} className="" />
            </div>
            <span className="text-4xl ">Health Booking</span>
            <span></span>
          </div>
          <div
            className="card flex-shrink-0 w-10/12 md:w-1/2 shadow-2xl bg-base-100"
            data-theme="light"
          >
            <div className="card-body">
              <div className="form-control">
                <label className="label" htmlFor="username">
                  <span className="label-text text-lg">Tên tài khoản</span>
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Tên tài khoản..."
                  className="input input-bordered"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="password">
                  <span className="label-text text-lg ">Mật khẩu</span>
                </label>{" "}
                <input
                  id="password"
                  autoComplete="off"
                  type="password"
                  placeholder="**************"
                  className="input input-bordered w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                />
                <a
                  href="#"
                  className="label-text-alt link link-hover  text-md mt-2"
                >
                  Quên mật khẩu?
                </a>
                <a
                  href="/signup"
                  className="label-text-alt link link-hover  text-md mt-2 text-base"
                >
                  Đăng ký tài khoản
                </a>
              </div>
              <div className="form-control mt-6">
                <button
                  className="btn btn-primary"
                  onClick={() => handleLogin()}
                >
                  Đăng nhập
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

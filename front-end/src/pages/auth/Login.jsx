import logo from "../../assets/images/logo.png";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
// import { userLogin } from "../../store/actions/userAction";
import { useNavigate } from "react-router-dom";

export default function Login() {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [showPass, setShowPass] = useState(false);
  //   const { user, logged_in } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    document.title = "Đăng nhập | Health Booking";
  }, []);

  async function handleLogin() {
    if (!username || !password) {
      toast.warning("Missing input");
    } else {
      dispatch(userLogin({ username, password }));
    }
  }
  async function handleKeyDown(e) {
    if (e.key === "Enter") {
      await handleLogin();
    }
  }

  //   useEffect(() => {
  //     if (user) {
  //       if (user.role.keyMap === "R1") {
  //         navigate("/system/admin");
  //       } else {
  //         navigate("/system/doctor");
  //       }
  //     }
  //   }, []);
  //   useEffect(() => {
  //     if (user) {
  //       if (user.role.keyMap === "R1") {
  //         navigate("/system/admin");
  //       } else {
  //         navigate("/system/doctor");
  //       }
  //     }
  //   }, [logged_in]);

  return (
    <div data-theme="">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col  gap-10 lg:w-5/6">
          <div className="text-center  flex-col">
            <div className="w-24 rounded mx-auto">
              <img src={logo} className="" />
            </div>
            <span className="text-4xl ">Health Booking</span>
            <span></span>
          </div>
          <div
            className="card flex-shrink-0 w-ful max-w shadow-2xl bg-base-100"
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
                  type={!showPass ? "password" : "text"}
                  id="password"
                  autoComplete="off"
                  placeholder="Mật khẩu"
                  className="input input-bordered md:w-96"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                />
                <i
                  className={
                    !showPass
                      ? "fa-solid fa-eye text-md absolute right-10 top-48 hover:cursor-pointer"
                      : "fa-solid fa-eye-slash text-md absolute right-10 top-48 hover:cursor-pointer"
                  }
                  onClick={() => setShowPass(!showPass)}
                ></i>
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

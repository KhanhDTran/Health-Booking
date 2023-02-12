import { useState, useEffect } from "react";
import logo from "../../assets/images/logo.png";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { postData } from "../../services/commonSv";

export default function Signup() {
  useEffect(() => {
    document.title = "Đăng ký | Health Booking";
  }, []);

  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [address, setAddress] = useState("");
  let [username, setUsername] = useState("");
  let [pass, setPass] = useState("");
  let [phone, setPhone] = useState("");
  let [age, setAge] = useState("2023");
  let [gender, setGender] = useState("Nam");
  let [check, setCheck] = useState(false);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  async function signUp() {
    if (checkInput()) {
      let res = await postData(
        "/create-patient",
        {
          name,
          username,
          password: pass,
          phone,
          address,
          gender,
          age,
          email,
        },
        "Đang tạo tài khoản..."
      );
      if (res) {
        navigate("/login");
      }
    }
  }

  function checkInput() {
    if (!name || !email || !address || !username || !pass || !phone) {
      toast.warning("Nhập thiếu thông tin");
      return false;
    }
    return true;
  }

  return (
    <div className="min-h-screen">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col w-full h-full">
          <div className="w-24 rounded mx-auto">
            <img src={logo} className="" />
          </div>
          <span className="text-4xl ">Health Booking</span>
          <span></span>
          <div className="text-center lg:text-left">
            <p className="text-2xl md:text-4xl font-bold">Đăng ký tài khoản</p>
          </div>
          <div className="card   w-full  shadow-2xl bg-base-100">
            <div className="card-body grid gap-4 md:grid-cols-2 grid-cols-1">
              <div className="form-control">
                <span className="label">
                  <label className="label-text" htmlFor="name">
                    Họ tên
                  </label>
                </span>
                <input
                  type="text"
                  id="name"
                  placeholder="Họ tên..."
                  className="input input-bordered"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-control">
                <span className="label">
                  <label className="label-text" htmlFor="email">
                    Email
                  </label>
                </span>
                <input
                  type="text"
                  id="email"
                  placeholder="Email..."
                  className="input input-bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-control">
                <span className="label">
                  <label className="label-text" htmlFor="username">
                    Tên tài khoản
                  </label>
                </span>
                <input
                  type="text"
                  id="username"
                  placeholder="Tên tài khoản..."
                  className="input input-bordered"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-control">
                <span className="label">
                  <label className="label-text" htmlFor="pass">
                    Mật khẩu
                  </label>
                </span>
                <input
                  type="password"
                  id="pass"
                  placeholder="Mật khẩu..."
                  className="input input-bordered"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
              </div>
              <div className="form-control">
                <span className="label">
                  <label className="label-text" htmlFor="address">
                    Địa chỉ
                  </label>
                </span>
                <input
                  type="text"
                  id="address"
                  placeholder="Địa chỉ..."
                  className="input input-bordered"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="form-control">
                <span className="label">
                  <label className="label-text" htmlFor="phone">
                    Số điện thoại
                  </label>
                </span>
                <input
                  type="text"
                  id="phone"
                  placeholder="Số điện thoại..."
                  className="input input-bordered"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="form-control">
                <span className="label">
                  <label className="label-text" htmlFor="gender">
                    Giới tính
                  </label>
                </span>
                <select
                  className="select select-bordered w-full"
                  id="gender"
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>
              <div className="form-control">
                <span className="label">
                  <label className="label-text" htmlFor="age">
                    Năm sinh
                  </label>
                </span>
                <select
                  className="select select-bordered w-full"
                  id="age"
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                >
                  <option value="1940">1940</option>
                  <option value="1941">1941</option>
                  <option value="1942">1942</option>
                  <option value="1943">1943</option>
                  <option value="1944">1944</option>
                  <option value="1945">1945</option>
                  <option value="1946">1946</option>
                  <option value="1947">1947</option>
                  <option value="1948">1948</option>
                  <option value="1949">1949</option>
                  <option value="1950">1950</option>
                  <option value="1951">1951</option>
                  <option value="1952">1952</option>
                  <option value="1953">1953</option>
                  <option value="1954">1954</option>
                  <option value="1955">1955</option>
                  <option value="1956">1956</option>
                  <option value="1957">1957</option>
                  <option value="1958">1958</option>
                  <option value="1959">1959</option>
                  <option value="1960">1960</option>
                  <option value="1961">1961</option>
                  <option value="1962">1962</option>
                  <option value="1963">1963</option>
                  <option value="1964">1964</option>
                  <option value="1965">1965</option>
                  <option value="1966">1966</option>
                  <option value="1967">1967</option>
                  <option value="1968">1968</option>
                  <option value="1969">1969</option>
                  <option value="1970">1970</option>
                  <option value="1971">1971</option>
                  <option value="1972">1972</option>
                  <option value="1973">1973</option>
                  <option value="1974">1974</option>
                  <option value="1975">1975</option>
                  <option value="1976">1976</option>
                  <option value="1977">1977</option>
                  <option value="1978">1978</option>
                  <option value="1979">1979</option>
                  <option value="1980">1980</option>
                  <option value="1981">1981</option>
                  <option value="1982">1982</option>
                  <option value="1983">1983</option>
                  <option value="1984">1984</option>
                  <option value="1985">1985</option>
                  <option value="1986">1986</option>
                  <option value="1987">1987</option>
                  <option value="1988">1988</option>
                  <option value="1989">1989</option>
                  <option value="1990">1990</option>
                  <option value="1991">1991</option>
                  <option value="1992">1992</option>
                  <option value="1993">1993</option>
                  <option value="1994">1994</option>
                  <option value="1995">1995</option>
                  <option value="1996">1996</option>
                  <option value="1997">1997</option>
                  <option value="1998">1998</option>
                  <option value="1999">1999</option>
                  <option value="2000">2000</option>
                  <option value="2001">2001</option>
                  <option value="2002">2002</option>
                  <option value="2003">2003</option>
                  <option value="2004">2004</option>
                  <option value="2005">2005</option>
                  <option value="2006">2006</option>
                  <option value="2007">2007</option>
                  <option value="2008">2008</option>
                  <option value="2009">2009</option>
                  <option value="2010">2010</option>
                  <option value="2011">2011</option>
                  <option value="2012">2012</option>
                  <option value="2013">2013</option>
                  <option value="2014">2014</option>
                  <option value="2015">2015</option>
                  <option value="2016">2016</option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                </select>
              </div>
            </div>
            <div className="pl-10">
              Đã có tài khoản?
              <a
                href="/login"
                className="label-text-alt link link-hover  text-md mt-2 text-base"
              >
                Đăng nhập
              </a>
            </div>
            <div className="">
              <span className="pl-10 pt-4">
                <input
                  type="checkbox"
                  className="checkbox checkbox-success"
                  checked={check}
                  onChange={() => setCheck(!check)}
                />
                <span
                  className=" md:text-xl hover:cursor-pointer"
                  onClick={() => setCheck(!check)}
                >
                  Tôi xác thực thông tin nhập là chính xác
                </span>
              </span>
            </div>
            <div className="form-control mt-6 flex  items-center m-4">
              <button
                className="btn btn-primary w-64"
                disabled={!check}
                onClick={signUp}
              >
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

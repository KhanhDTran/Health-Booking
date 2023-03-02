import _ from "lodash";
import PatientHeader from "../../../components/PatientHeader";
import backgroundImage from "../../../assets/images/home/background.jpg";
import logo from "../../../assets/images/logo.png";

export default function FirstSection() {
  return (
    <>
      <PatientHeader />
      <div className="flex flex-col h-screen">
        <div
          className="hero  h-full"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center ">
            <div className="max-w-lg ">
              <div className="w-24 rounded mx-auto">
                <img className="" src={logo} />
              </div>
              <h1 className="mb-5 text-5xl font-bold">HEATH BOOKING</h1>
              <p className="mb-5">
                Người có sức khỏe, có hy vọng; và người có hy vọng, có tất cả
                mọi thứ.
                <br />
                <span>
                  He who has health, has hope and he who has hope, has
                  everything.
                </span>
                <br />
                <span>-Thomas Carlyle</span>
              </p>
              <button className="btn btn-primary w-30">Khám Phá</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

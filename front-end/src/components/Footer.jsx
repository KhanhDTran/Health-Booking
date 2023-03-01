import logo from "../assets/images/logo.png";

export default function Footer() {
  return (
    <>
      <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
        <div className="grid grid-flow-col gap-4">
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </div>
        <div>
          <div className="">
            <div className="w-24 rounded mx-auto">
              <img className="" src={logo} />
            </div>
            <h1 className=" text-lg font-bold">Heath Booking</h1>
          </div>
        </div>
        <div>
          <p>
            Copyright @Khanh.D.Tran - Ha Noi - 2023. Every images for education
          </p>
        </div>
      </footer>
    </>
  );
}

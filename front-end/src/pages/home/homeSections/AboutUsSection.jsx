export default function AboutUsSection() {
  return (
    <div className="pb-16">
      <div className="container mx-auto  h-full p-4 flex flex-col gap-10 lg:gap-24">
        <div className="h-1/4 justify-center flex-col lg:flex-row p-4">
          <h1 className="text-3xl  lg:text-5xl font-bold text-center">
            Why Health Booking
          </h1>
        </div>
        <div className="flex flex-col gap-4 text-center">
          <p>Tiết kiệm được thời gian xếp hàng đợi số thứ tự 123.</p>
          <p>
            Chủ động sắp xếp quỹ thời gian của mình trong việc đi khám, chữa
            bệnh24.
          </p>
          <p>
            Dễ dàng tìm kiếm và lựa chọn bác sĩ chuyên khoa phù hợp với nhu cầu
            của mình43.
          </p>
          <p>
            Tránh được những rủi ro về sức khỏe do tiếp xúc với môi trường đông
            người trong mùa dịch bệnh3.
          </p>
        </div>
        <div className="flex justify-center  ">
          <div className="stats stats-vertical lg:stats-horizontal shadow justify-center">
            <div className="stat   bg-base-200 ">
              <div className="stat-title">Phòng Khám</div>
              <div className="stat-value">300</div>
              <div className="stat-value">
                <i className="fa-regular fa-hospital"></i>
              </div>
            </div>

            <div className="stat bg-base-200 ">
              <div className="stat-title">Bác Sĩ</div>
              <div className="stat-value">4,200</div>
              <div className="stat-value">
                <i className="fa-solid fa-user-doctor"></i>
              </div>
            </div>

            <div className="stat bg-base-200 ">
              <div className="stat-title">Người Dùng</div>
              <div className="stat-value">12.000</div>
              <div className="stat-value">
                <i className="fa-solid fa-users"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

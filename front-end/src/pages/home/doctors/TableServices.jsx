export default function TableServices(props) {
  return (
    <div className="p-4">
      <div>
        <h1 className="text-2xl ">Bảng giá dịch vụ</h1>
      </div>
      <div>
        {props.services && props.services.length > 0 && (
          <div className="overflow-x-auto w-full ">
            <table className="table w-full lg:w-1/2">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Tên dịch vụ</th>
                  <th>Giá (VNĐ) </th>
                </tr>
              </thead>
              <tbody>
                {props.services.map((item, key) => {
                  return (
                    <tr key={item._id}>
                      <th>
                        <input
                          type="checkbox"
                          className="checkbox checkbox-info"
                          checked={
                            props.selectService === item._id ? true : false
                          }
                          onChange={() => props.setSelectService(item._id)}
                        />
                      </th>
                      <th>
                        <span> {item.name} </span>{" "}
                      </th>
                      <th>
                        <span>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.unitPrice * 1000)}
                        </span>
                      </th>
                    </tr>
                  );
                })}
                {/* row */}
              </tbody>
              {/* foot */}
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

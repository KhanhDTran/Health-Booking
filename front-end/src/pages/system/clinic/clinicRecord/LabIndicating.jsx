import _ from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { putRequestToast } from "../../../../services/commonSv";
import {
  fetchAllLabs,
  fetchServices,
} from "../../../../store/features/fetchDataSlice";
import {
  convertToSelectOptions,
  customStyles,
} from "../../../../utils/CommonUtils";
import RecordTableServices from "./RecordTableServices";
import TableIndicatedServices from "./TableIndicatedServices";

export default function LabIndicating(props) {
  const dispatch = useDispatch();

  const { services, labs } = useSelector((state) => state.fetchData);

  const [type, setType] = useState("");
  const [serviceList, setServiceList] = useState([]);
  const [selectedLab, setSelectedLab] = useState(null);
  const [labOptions, setlabOptions] = useState([]);

  const [selectedList, setSelectedList] = useState([]);
  const [check, setCheck] = useState(false);

  // console.log(props.record);

  // UseEffect
  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchAllLabs({}));
  }, []);

  useEffect(() => {
    if (!_.isEmpty(labs)) setlabOptions(convertToSelectOptions(labs));
  }, [labs]);

  useEffect(() => {
    if (props.record.labServices && props.record.labServices.length > 0) {
      let list = _.map(props.record.labServices, (o) => {
        let x = {
          quantity: o.quantity,
          service: o.service,
          _id: o._id,
        };
        return x;
      });
      setSelectedList(list);
    }
  }, [props.record]);

  useEffect(() => {
    if (services)
      setServiceList(
        _.filter(services, (o) => {
          return o.lab;
        })
      );
  }, [services]);

  // function
  function handleOnChangeType(x) {
    setType(x);
    setSelectedLab(null);
    setServiceList(
      _.filter(services, (o) => {
        return o.lab && o.lab.type === x;
      })
    );
    if (x !== "")
      setlabOptions(
        convertToSelectOptions(
          _.filter(labs, (o) => {
            return o.type === x;
          })
        )
      );
    if (x === "") setlabOptions(convertToSelectOptions(labs));
  }

  function handleChangeLab(e) {
    if (e) {
      let service = _.find(services, (o) => o.lab && o.lab._id === e.value);
      setServiceList(
        _.filter(services, (o) => {
          return o.lab && o.lab._id === e.value;
        })
      );
      setType(service.lab.type);
      setSelectedLab(e);
    } else {
      setType("");
      setServiceList([]);
    }
  }

  function handleAddService(service) {
    let list = selectedList;
    let checkService = _.find(list, (o) => {
      return o.service._id === service._id;
    });
    if (checkService) {
      checkService.quantity = +checkService.quantity + 1;
    } else {
      let x = {
        service: {
          _id: service._id,
          name: service.name,
          lab: service.lab,
          unit: service.unit,
          unitPrice: service.unitPrice,
        },
        quantity: 1,
      };
      list.push(x);
    }
    setSelectedList(list);
    setCheck(!check);
  }

  function handleMinusService(e) {
    e.quantity -= 1;
    if (e.quantity === 0) {
      let list = _.filter(selectedList, (o) => {
        return o.service._id !== e.service._id;
      });
      setSelectedList(list);
    }
    setCheck(!check);
  }

  async function handleSaveIndicatedList() {
    let x = _.map(selectedList, (o) => {
      return o.service.lab._id;
    });
    let labs = _.uniq(_.sortBy(x));
    await putRequestToast(
      "/clinic/indicate-labs",
      {
        _id: props.record._id,
        query: {
          labs,
          labServices: selectedList,
        },
      },
      `Đang lưu danh sách chỉ định...`
    );
  }

  return (
    <>
      <div className="divider"></div>

      <div className="w-full flex justify-center text-4xl">
        <span>Chỉ định khám lâm sàng</span>
      </div>
      <div className="w-full flex justify-center text-4xl">
        <select
          className="select select-info w-full max-w-xs "
          onChange={(e) => {
            if (e.target.value === "1") props.setShowLabIndicating(false);
            if (e.target.value === "2") props.setShowLabIndicating(true);
          }}
        >
          <option value={"1"}>Ẩn chỉ định khám lâm sàng</option>
          <option value={"2"}>Hiện chỉ định khám lâm sàng</option>
        </select>
      </div>
      {props.showLabIndicating && (
        <>
          <div className="container mx-auto p-4 m-4">
            {/* ------------------------- table indicated */}

            {/* ---------- table indicated services ------------------ */}
            <TableIndicatedServices
              {...{
                selectedList: _.sortBy(selectedList, (o) => {
                  return o.service.lab.name;
                }),
                handleMinusService,
              }}
            />
            <div className="w-full flex justify-center p-4 m-4">
              <button
                className="btn btn-info w-40"
                onClick={handleSaveIndicatedList}
              >
                Lưu danh sách chỉ định
              </button>
            </div>

            {/* ------------------------ */}

            <div className="p-4 m-4 w-full not-prose flex grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              <div className="form-control gap-2 flex">
                <label htmlFor="type" className="pl-2">
                  Loại Khám Lâm Sàng
                </label>
                <select
                  className="select select-info w-full "
                  value={type}
                  onChange={(e) => handleOnChangeType(e.target.value)}
                >
                  <option value="">Loại khám lâm sàng</option>
                  <option value="Xét nghiệm máu">Xét nghiệm máu</option>
                  <option value="Xét nghiệm nước tiểu">
                    Xét nghiệm nước tiểu
                  </option>
                  <option value="Siêu âm ">Siêu âm </option>
                  <option value="Chụp X-Quang ">Chụp X-Quang </option>
                  <option value="Chụp cộng hưởng từ">Chụp cộng hưởng từ</option>
                </select>
              </div>

              <div className="w-64 lg:w-96 ">
                <label htmlFor="">Phòng khám lâm sàng</label>
                <Select
                  isClearable={true}
                  className="my-react-select-container"
                  classNamePrefix="my-react-select"
                  options={labOptions}
                  styles={customStyles}
                  value={selectedLab}
                  placeholder={"Phòng khám lâm sàng....."}
                  onChange={(e) => {
                    handleChangeLab(e);
                  }}
                />{" "}
              </div>
            </div>

            {/* ---------- table services ------------------ */}
            <RecordTableServices {...{ type, serviceList, handleAddService }} />
          </div>
        </>
      )}
    </>
  );
}

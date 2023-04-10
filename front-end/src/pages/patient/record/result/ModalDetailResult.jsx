import { useEffect, useState, useCallback } from "react";
import _ from "lodash";
import ImageViewer from "react-simple-image-viewer";

export default function ModalDetailResult(props) {
  function handlePreviewImage(img) {}

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <>
      {" "}
      <>
        <input
          type="checkbox"
          id="modal-booking-lab"
          checked={props.selectedResult}
          onChange={props.setSelectedResult}
          className="modal-toggle"
        />
        <div className="modal">
          <div className="modal-box relative  w-11/12 max-w-7xl h-10/12 ">
            <label
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={() => {
                props.setSelectedResult(false);
              }}
            >
              ✕
            </label>
            <h3 className="text-lg font-bold">Kết quả khám lâm sàng</h3>
            <div className="flex flex-col gap-4 items-center justify-center">
              <div className="avatar">
                <div className=" h-28 w-28 ">
                  <img
                    className="mask mask-circle bg-base-200 h-36 w-36 hover:cursor-pointer"
                    src={props.selectedResult.lab.image}
                  />
                </div>
              </div>
              <p>{props.selectedResult.lab.name}</p>
            </div>
            <div className="divider"></div>
            <div className="flex flex-row p-4 gap-4">
              <div className="flex flex-row gap-4">
                {props.selectedResult.images.length > 0 && (
                  <>
                    <div>
                      {props.selectedResult.images.map((src, index) => (
                        <img
                          src={src}
                          onClick={() => openImageViewer(index)}
                          key={index}
                          style={{
                            margin: "2px",
                            width: "200px",
                            height: "140px",
                            borderRadius: "5px",
                          }}
                          alt=""
                        />
                      ))}

                      {isViewerOpen && (
                        <ImageViewer
                          src={props.selectedResult.images}
                          currentIndex={currentImage}
                          disableScroll={false}
                          closeOnClickOutside={true}
                          onClose={closeImageViewer}
                        />
                      )}
                    </div>
                  </>
                )}
              </div>
              <div className="bg-base-200 w-full">
                <div
                  className="prose lg:prose-xl p-4"
                  dangerouslySetInnerHTML={{
                    __html: props.selectedResult.resultHtml,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

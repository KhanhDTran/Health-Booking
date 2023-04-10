import moment from "moment";
import "moment/locale/vi";
moment().format();
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";

export default function ConclusionRecord(props) {
  const mdParser = new MarkdownIt(/* Markdown-it options */);

  return (
    <>
      <div className="divider"></div>
      <div className="w-full flex justify-center text-4xl">
        <span>Kết luận kết quả</span>
      </div>

      <div className="w-full flex justify-center text-4xl">
        <select
          className="select select-info w-full max-w-xs "
          onChange={(e) => {
            if (e.target.value === "1") props.setShowConclusion(false);
            if (e.target.value === "2") props.setShowConclusion(true);
          }}
        >
          <option value={"1"}>Ẩn kết luận</option>
          <option value={"2"}>Hiện kết luận</option>
        </select>
      </div>

      {props.showConclusion && (
        <>
          {" "}
          <MdEditor
            className="m-4"
            style={{
              height: "600px",
              width: "100%",
            }}
            value={props.conclusion}
            renderHTML={(text) => mdParser.render(text)}
            onChange={props.handleEditorChange}
          />
          <div className="p-4 m-4 flex flex-col gap-4">
            <label htmlFor="date">Ngày tháng khám lại</label>
            <input
              type="text"
              id="date"
              placeholder="Ngày tháng khám lại..."
              value={props.reExamineDate}
              onChange={(e) => props.setReExamineDate(e.target.value)}
              className="input input-bordered input-info w-full max-w-xs"
            />
          </div>
          <div className="w-full flex justify-center">
            <button
              className="btn btn-info w-40"
              onClick={props.handleSaveConclusion}
            >
              Lưu kết luận{" "}
            </button>
          </div>
        </>
      )}

      {/* ---------------- Tái khám ------------------- */}
    </>
  );
}

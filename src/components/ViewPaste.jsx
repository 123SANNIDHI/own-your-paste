
import {useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const {id}= useParams();

  const allPastes = useSelector((state) => state.paste.pastes);

  const paste=allPastes.filter((p)=> p._id === id)[0];
  console.log("final paste",paste);
  return (
    <div>
      <div className="flex items-center gap-4 mt-2">
        <input
          className="p-2 rounded-2xl flex-grow" // Added flex-grow to input
          type="text"
          placeholder="enter title here"
          value={paste.title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* <button onClick={createPaste}>
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button> */}
      </div>

      <div className="mt-8">
        <textarea
          className="rounded-2xl mt-4 min-w-[500px] p-4"
          value={paste.value}
          disabled
          placeholder="enter content here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};


export default ViewPaste
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removePastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);

  const [searchParams, setSearchParams] = useState("");
  const dispatch = useDispatch();

  const filterData = pastes.filter((paste) => {
    return paste.title.toLowerCase().includes(searchParams.toLowerCase());
  });

  function handleDelete(pasteId) {
    dispatch(removePastes(pasteId));
  }
  return (
<div>
  <div className="flex items-center gap-4 mt-2">
    <input
      className="p-2 rounded-2xl min-w-[600px] mt-5"
      type="text"
      placeholder="Search pastes by title..."
      value={searchParams}
      onChange={(e) => setSearchParams(e.target.value)}
    />
  </div>
  <div className="flex flex-col gap-5 mt-5">
    {filterData.length > 0 &&
      filterData.map((paste) => {
        return (
          <div className="border" key={paste?._id}>
            <div>{paste.title}</div>
            <div>{paste.value}</div>
            <div className="flex flex-row gap-4 place-content-evenly">
              <button>
                <a
                  href={`/?pasteId=${paste?._id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Edit
                </a>
              </button>
              <button>
                <a
                  href={`/pastes/${paste?._id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </a>
              </button>
              <button onClick={() => handleDelete(paste?._id)}>
                Delete
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(paste?.value);
                  toast.success("copied successufully");
                }}
              >
                Copy
              </button>
              <button
                onClick={async () => {
                  const shareText = `${paste.value}\n\n${window.location.origin}/pastes/${paste._id}`;
                  const shareData = {
                    title: paste.title,
                    text: shareText,
                    url: `${window.location.origin}/pastes/${paste._id}`,
                  };
                  if (navigator.share) {
                    try {
                      await navigator.share(shareData);
                      toast.success("Paste shared!");
                    } catch (err) {
                      toast.error("Share cancelled or failed.");
                    }
                  } else {
                    toast.error("Sharing not supported in this browser.");
                  }
                }}
              >
                Share
              </button>
              <span className="text-xs text-black-400 ml-auto">
                {new Date(paste.createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        );
      })}
  </div>
</div>
  );
};
export default Paste;
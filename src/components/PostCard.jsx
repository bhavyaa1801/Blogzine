import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredimage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div
        className="
          w-full
          bg-[#EFE3CF]
          hover:bg-[#E4D2B8]
          rounded-xl
          border border-[#A57A5A]/30
          shadow-sm hover:shadow-lg
          transition-all duration-200
          flex flex-col
          h-full
          overflow-hidden
          hover:-translate-y-1
        "
      >
        {/* IMAGE */}
        <div className="w-full h-48 overflow-hidden">
          <img
            src={appwriteService.getFileView(featuredimage)}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* CONTENT */}
        <div className="p-4 flex-grow">
          <h2 className="text-lg font-semibold line-clamp-2">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;

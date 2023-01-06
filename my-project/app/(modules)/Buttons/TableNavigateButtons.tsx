"use client";
import React from "react";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const TableNavigateButtons = ({ id }: { id: string }) => {
  const router = useRouter();

  return (
    <div className="flex justify-end gap-4">
      <ChatBubbleOvalLeftEllipsisIcon className="text-black h-6 w-6 cursor-pointer" />
      <InformationCircleIcon
        onClick={() => {
          router.push(`/teacher/book/${id}`);
        }}
        className="text-black h-6 w-6 cursor-pointer"
      />
    </div>
  );
};

export default TableNavigateButtons;

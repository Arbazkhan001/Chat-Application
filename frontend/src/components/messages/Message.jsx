import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const fromMe = message.senderId === authUser._id;
    const formattedTime = extractTime(message.createdAt);
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const bubbleBgColor = fromMe ? "bg-blue-500" : "";

    const shakeClass = message.shouldShake ? "shake" : "";

    let content = null;

    if (message.imgUrl) {
        // If message has an image, render the image
        content = (
            <img src={message.imgUrl} alt="Message Image" className="w-auto h-auto max-w-30 max-h-40" />
        );
    } else {
        // If message does not have an image, render the text message
        content = (
            <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
                {message.message}
            </div>
        );
    }

    return (
        <div className={`chat ${chatClassName}`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img alt='Profile Pic' src={fromMe ? authUser.profilePic : selectedConversation?.profilePic} />
                </div>
            </div>
            {content}
            <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
                {formattedTime}
            </div>
        </div>
    );
};

export default Message;

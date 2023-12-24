import React from "react";

const GuestCounterModule = (props) => {
    const {
        totalRoom = 0,
        totalGuest = 0,
        remainingGuest = 0
    } = props

    return (
        <div>
            <div>
                <span>住客人數：{totalGuest}人</span>
                <span> / {totalRoom}房</span>
            </div>
            <div className="mt-[12px] px-[12px] py-[6px] border border-[#01DCF0] bg-[#A2E4F0] rounded-md">
                <span className="text-[14px] text-[#555]">尚未分配人數：{remainingGuest}人</span>
            </div>
        </div>
    )
}

export default GuestCounterModule;
import React, { useMemo, memo, useState, useEffect } from 'react';
import GuestCounterModule from 'common/module/GuestCounterModule'
import RoomAllocationItemModule from 'common/module/RoomAllocationItemModule'

const RoomAllocationModule = (props) => {
    const {
        guest,
        room,
        roomGuestMax,
        onChange
    } = props;

    // const [roomAllocationList, setRoomAllocationList] = useState(()=> {
    //     return new Array(room).fill({ adult: 1, child: 0 })
    // })
    const [roomAllocationList, setRoomAllocationList] = useState(()=> {
        return new Array(room).fill({ adult: 1, child: 0 })
    })

    const [remainingGuest, setRemainingGuest] = useState(()=>{
        return guest - room
    });

    const onRoomAllocationItemChange = (name, number, index) => {
        let dateList = JSON.parse(JSON.stringify(roomAllocationList));
        dateList[index][name] = Number(number);

        let newRemainingGuest = dateList.reduce((total, currenctValue)=>{
            return {
                adult:total.adult + currenctValue.adult,
                child:total.child + currenctValue.child
            }
        },{ adult:0, child:0 })
        

        setRoomAllocationList(dateList);
        onChange(dateList)
        setRemainingGuest(guest - Object.values(newRemainingGuest).reduce((a, b)=>a+b))
    }
 
    return (
        <div className='px-[30px]'>
            <GuestCounterModule
                totalRoom={room}
                totalGuest={guest}
                remainingGuest={remainingGuest}
            />
            {
                roomAllocationList.map((item, index)=>{
                    return(
                        <RoomAllocationItemModule
                            {...item}
                            key={`roomAllocationList_id_${index}`}
                            roomAllocationListIndex={index}
                            roomGuestMax={roomGuestMax}
                            remainingGuest={remainingGuest}
                            onRoomAllocationItemChange={onRoomAllocationItemChange}
                        />
                    )
                })
            }
        </div>
    )
}

export default memo(RoomAllocationModule);
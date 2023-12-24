import React, { useState, useMemo } from 'react';
import CustomInputNumberModule from 'common/components/CustomInputNumber'

const RoomAllocationItemModule = (props) => {
    const {
        roomGuestMax,
        adult,
        child,
        remainingGuest,
        roomAllocationListIndex,
        onRoomAllocationItemChange
    } = props;

    const [ adultCount, setAdultCount ] = useState(Number(adult));
    const [ childCount, setChildCount ] = useState(Number(child));

    const totalMaxDisabled = useMemo(()=> { return Object.is((roomGuestMax - adultCount - childCount), 0) || Object.is(remainingGuest, 0) }, [adultCount, childCount, remainingGuest])

    return (
        <div className='py-[20px] border-b border-[#808080] last:border-0'>
            <div className='mb-[6px]'>房間：{roomGuestMax}人</div>
            <div className='flex justify-between'>
                <div>
                    <div>大人</div>
                    <div className='text-[14px] text-[#808080]'>
                        <span>年齡</span>
                        <span>20+</span>
                    </div>
                </div>
                <div>
                    <CustomInputNumberModule 
                        min={0}
                        max={roomGuestMax}
                        step={1}
                        name={'adult'}
                        value={adultCount}
                        disabled={false}
                        totalMaxDisabled={totalMaxDisabled}
                        onChange={(e)=> {
                            setAdultCount(e.target.value)
                            onRoomAllocationItemChange(e.target.name, e.target.value, roomAllocationListIndex)
                        }}
                        onBlur={(e)=> { 
                            onRoomAllocationItemChange(e.target.name, e.target.value, roomAllocationListIndex)
                        }}
                    />
                </div>
            </div>
            <div className='flex justify-between'>
                <div>
                    <div>小孩</div>
                </div>
                <div>
                    <CustomInputNumberModule 
                        min={0}
                        max={roomGuestMax}
                        step={1}
                        name={'child'}
                        value={childCount}
                        disabled={false}
                        totalMaxDisabled={totalMaxDisabled}
                        onChange={(e)=> { 
                            setChildCount(e.target.value)
                            onRoomAllocationItemChange(e.target.name, e.target.value, roomAllocationListIndex)
                        }}
                        onBlur={(e)=> { 
                            //onRoomAllocationItemChange(e.target.name, e.target.value, roomAllocationListIndex)
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default RoomAllocationItemModule;
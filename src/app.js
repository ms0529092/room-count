import React from 'react';
import RoomAllocation from 'containers/RoomAllocationPage';
const App = () => {
    return (
        <div className='container mx-auto'>
            <div className='page'>
                <RoomAllocation
                    guest={10}
                    room={3}
                    roomGuestMax={4}
                    onChange={(result)=> {
                        console.log(result);
                    }}
                />
            </div>
        </div>
    )
}

export default App
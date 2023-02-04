import TimeAgo from 'timeago-react';
import '../../styles/utility.scss';
import ProfileAvatar from '../ProfileAvatar';

const RoomItem = ({ room }) => {

    const { createdAt, name, lastMessages } = room;
    console.log('lastMessage', lastMessages)

    return (
        <div style={{ height: '100%' }}>
            <div className="d-flex justify-content-between align-items-center h-100 ">
                <h3 className="text-disappear">{name}</h3>
                <TimeAgo
                    datetime={lastMessage ? new Date(lastMessage.createdAt) : new Date(createdAt)} className='font-normal text-black-45 '
                />
            </div>
            <div className="d-flex align-items-center text-black-70">
                {
                    lastMessages ? (
                        <>
                            <div className='d-flex align-items-center'>
                                <ProfileAvatar src={lastMessages.author.avatar} name={lastMessages.author.name} size="sm" />
                            </div>

                            <div className='text-disappear ml-2'>
                                <div className='italic' >{lastMessage.author.name}</div>
                                <span>{lastMessages.text || lastMessages.file.name}</span>
                            </div>

                        </>
                    ) : (
                        <span>No messages yet ...</span>
                    )}

            </div>
        </div>
    )
}

export default RoomItem;
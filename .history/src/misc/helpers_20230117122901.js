//we will define all our reusable function which helps during the code

export function getNameInitials(name) {
    const splitName = name.toUpperCase().split('');

    if (splitName.length > 1) {
        return splitName[0][0] + splitName[1][0];
    }

    return splitName[0][0]
}

export function transformToArrWithId(snapVal) {
    return snapVal ? Object.keys(snapVal).map(roomId => {
        return { ...snapVal[roomId], id: roomId };
    }) : []
}

export async function getUserUpdate(userId, keyToUpdate, value, db) {

    const updates = {};

    updates[`/profiles/${userId}/${keyToUpdate}`] = value;
    
}
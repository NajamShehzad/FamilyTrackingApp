const getCircle = (data) => {
    return {
        type: "GET_CIRCLE",
        data
    }
}

const removeCircleData = () => {
    return {
        type: "REMOVE_CIRCLE_DATA"
    }
}

export {
    getCircle,
    removeUser
}
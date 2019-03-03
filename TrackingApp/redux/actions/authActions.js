const updateCircledata = (data) => {
    return {
        type: "UPDATE_CIRCLE_DATA",
        data
    }
}

const removeCircleData = () => {
    return {
        type: "REMOVE_CIRCLE_DATA"
    }
}

export {
    updateCircledata,
    removeCircleData
}
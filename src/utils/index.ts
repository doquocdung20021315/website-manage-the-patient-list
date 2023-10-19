interface IDataGlobal {
    arrayID: Array<number>
}
let dataGlobal:IDataGlobal = {
    arrayID: []
}

export const getDataGlobal = () => {
    return dataGlobal
}

export const setDataGlobal = (data:IDataGlobal) => {
    dataGlobal = data
}

// state是仓库的数据
// mutations是一个同步修改state的数据
export const state=()=>{
    return {
        // 机票的信息对象
        infoData:{
            seat_infos:{}
        },
        allPrice:0
    }
}

export  const mutations ={
    // 修改机票信息
    setInfoData(state,data){
        state.infoData = data
    },
    setAllPirce(state,price){
        state.allPrice = price
    }
}
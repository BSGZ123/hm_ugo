export default {
    // 购物车内商品总量
    total: function(state) {
        let c = 0
        if (state.shopCart.length <= 0) {
            return c
        }
        state.shopCart.forEach(x => {
            if (x.isCheck) {
                c += x.count
            }
        })
        return c
    },
    defaultAddress: function(state) {
        if (state.addressList.length > 0) {
            let i = state.addressList.findIndex(item => item.isDefault)
            return state.addressList[i]
        }
        return {}
    },
    addressDetail: function(state) {
        if (state.addressList.length > 0) {
            let i = state.addressList.findIndex(item => item.isDefault)
            return state.addressList[i].province + state.addressList[i].city + state.addressList[i].county + state.addressList[i].addressDetail
        } else {
            return "请选择收货地址"
        }
    },
    addressDetailList: function(state) {
        console.log('捕捉')
        if (state.addressList.length > 0) {
            return state.addressList.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    tel: item.tel,
                    address: item.province + item.city + item.addressDetail
                }
            })
        }
        return []
    }
}
import * as types from './type.js'
import utils from '../plugins/utils.js'
export default {
    [types.HANDLER_SHOPCART.ADD_TO_SHOPCART](state, goods) {
        // 去重，有重复的 更新数量
        const i = state.shopCart.findIndex(x => x.id === goods.goods_id)
        if (i !== -1) {
            state.shopCart[i].count++
                utils.setStorageHandle(utils.enumKey.CART, state.shopCart)
            return
        }
        // 梳理出来的商品信息对象
        const info = {
            // 商品Id
            id: goods.goods_id,
            // 名称
            name: goods.goods_name,
            // 图片
            pic: goods.goods_small_logo,
            // 价格
            price: goods.goods_price,
            // 数量
            count: 1,
            // 是否默认被选中
            isCheck: true
        }
        state.shopCart.unshift(info)
        utils.setStorageHandle(utils.enumKey.CART, state.shopCart)
    },
    [types.HANDLER_SHOPCART.UPDATE_GOODS_COUNT](state, goods) {
        const i = state.shopCart.findIndex(x => x.id === goods.id)
        if (i !== -1) {
            // 根据索引值，获取到对应的那个商品，
            // 然后更新数量
            state.shopCart[i].count = goods.count
                // 把更新过后的购物车数据，立即存储到Storage中
            utils.setStorageHandle(utils.enumKey.CART, state.shopCart)
        }
    },
    [types.HANDLER_SHOPCART.UPDATE_GOODS_STATUS](state, goods) {
        const i = state.shopCart.findIndex(x => x.id === goods.id)
        if (i !== -1) {
            state.shopCart[i].isCheck = goods.isCheck
            utils.setStorageHandle(utils.enumKey.CART, state.shopCart)
        }
    },
    [types.HANDLER_SHOPCART.UPDATE_ALL_GOODS_STATUS](state, status) {
        if (!status) {
            return
        }
        state.shopCart.forEach(x => {
            x.isCheck = status
        })
        utils.setStorageHandle(utils.enumKey.CART, state.shopCart)
    },
    [types.HANDLER_SHOPCART.REMOVE_GOODS_BY_ID](state, id) {
        const i = state.shopCart.findIndex(x => x.id === id)
        if (i !== -1) {
            state.shopCart.splice(i, 1)
            utils.setStorageHandle(utils.enumKey.CART, state.shopCart)
        }
    },
    [types.HANDLER_ADDRESS.ADD_TO_ADDRESS_LIST](state, content) {
        let addressInfo = JSON.parse(JSON.stringify(content))
        if (addressInfo.isDefault) {
            state.addressList.forEach(i => i.isDefault = false)
        }
        addressInfo.id = utils.genID(9)
        state.addressList.push(addressInfo)
        utils.setStorageHandle(utils.enumKey.ADDRESS, state.addressList)
    },
    [types.HANDLER_ADDRESS.CHOOSE_DEFAULT_ADDRESS](state, id) {
        state.addressList.forEach(x => {
            if (x.id == id) {
                x.isDefault = true
            } else {
                x.isDefault = false
            }
        })
        utils.setStorageHandle(utils.enumKey.ADDRESS, state.addressList)
    },
    [types.HANDLER_ADDRESS.EDIT_ADDRESS_BY_ID](state,content) {
        let i = state.addressList.findIndex(x=>x.id == content.id)
        // 直接赋值 getters 无法监听state上list 中成员的变化 
        // 可以先移除 再 插入 通过改变数组长度的方法来使 getters捕捉到
        state.addressList.splice(i,1)
        state.addressList.splice(i,0,content)
        utils.setStorageHandle(utils.enumKey.ADDRESS, state.addressList)
    }
}
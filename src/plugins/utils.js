export default {
    // 根据时间戳生成随机id 用于记录地址
    genID(length) {
        return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
    },
    enumKey: {
        CART: 'shopcart',
        ADDRESS: 'address'
    },
    setStorageHandle: (key, obj) => {
        window.localStorage.setItem(key, JSON.stringify(obj))
    },
    getStorageHandle: key => JSON.parse(window.localStorage.getItem(key) || "[]")
}
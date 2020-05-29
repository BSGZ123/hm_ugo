import utils from '../plugins/utils.js'
export default {
    shopCart: utils.getStorageHandle(utils.enumKey.CART),
    addressList: utils.getStorageHandle(utils.enumKey.ADDRESS)
}
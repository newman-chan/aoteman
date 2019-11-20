import wepy from 'wepy'

export default class MixinEvent extends wepy.mixin {
    data = {
        mixin: '公用事件'
    }
    methods = {
        catchtouchmove(e){
            return true;
        }
    }
}

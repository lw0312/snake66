// 定义foot
class Food {
    // 定义一个属性表示食物所对应的元素
    element: HTMLElement;
    constructor() {
        // 获取页面中的food元素并将器赋值给element
        this.element = document.querySelector('.food')!
    }
    // 获取food的x轴坐标
    get x() {
        return this.element.offsetLeft
    }
    // 获取food的y轴坐标
    get y() {
        return this.element.offsetTop
    }
    // 修改food的位置
    change() {
        // 生成随机位置，food位置最小是0，最大290
        let x = Math.round(Math.random() * 29) * 10
        let y = Math.round(Math.random() * 29) * 10
        this.element.style.left = `${x}px`
        this.element.style.top = `${y}px`
    }
}
export default Food
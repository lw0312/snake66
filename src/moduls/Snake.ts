class Snake {
    // 表示蛇的元素
    head: HTMLElement
    // 蛇的身体
    bodies: HTMLCollection;
    // 获取蛇的容器
    element: HTMLElement
    constructor() {
        this.element = document.querySelector('.snake')!
        this.head = document.querySelector('.snake>div')!
        this.bodies = this.element.getElementsByTagName('div')
    }
    // 获取蛇的坐标（蛇头坐标）
    get x() {
        return this.head.offsetLeft
    }
    get y() {
        return this.head.offsetTop
    }
    set x(value) {
        // 如果新值和旧值相同，则直接返回不再修改
        if (this.x === value) {
            return
        }
        // x值的合法范围 0~290之间
        if (value < 0 || value > 290) {
            // 进入判断说明蛇撞墙了，抛出异常
            throw new Error('蛇撞墙了')
        }
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            // 发生了掉头 ,让蛇向反方向继续移动
            if (value > this.x) {
                // 如果新值value大于旧值x，则说明蛇在向右走，此时发生掉头，应该时蛇继续向左走
                value = this.x - 10
            } else {
                value = this.x + 10
            }
        }
        // 移动身体
        this.moveBody()
        this.head.style.left = value + 'px'
        // 检查有没有撞自己
        this.checkHeadBody()
    }
    set y(value) {
        if (this.y === value) {
            return
        }
        if (value < 0 || value > 290) {
            // 进入判断说明蛇撞墙了
            throw new Error('蛇撞墙了')
        }
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            // 发生了掉头
            if (value > this.y) {
                value = this.y - 10
            } else {
                value = this.y + 10
            }
        }
        this.moveBody()
        this.head.style.top = value + 'px'
        // 检查有没有撞自己
        this.checkHeadBody()
    }

    // 设置蛇增加身体的方法
    addBodies() {
        // 向element中添加div
        this.element.insertAdjacentHTML('beforeend', '<div></div>')
    }

    // 添加一个蛇身体移动的方法
    moveBody() {
        /* 
            将后边的身体设置为前边身体的位置
        */
        // 遍历获取所有的身体
        for (let i = this.bodies.length - 1; i > 0; i--) {
            // 获取前边身体的位置
            let x = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let y = (this.bodies[i - 1] as HTMLElement).offsetTop;
            // 将值设置到当前身体上
            (this.bodies[i] as HTMLElement).style.left = x + 'px';
            (this.bodies[i] as HTMLElement).style.top = y + 'px';
        }
    }

    // 检查蛇头是否撞到身体
    checkHeadBody() {
        // 获取所有的身体，检查其是否和蛇头的坐标发生重叠
        for (let i = 1; i < this.bodies.length; i++) {
            let bd = this.bodies[i] as HTMLElement
            if (this.x === bd.offsetLeft && this.y === bd.offsetTop) {
                // 进入判断说明蛇头撞到了身体，游戏结束
                throw new Error('撞到自己')
            }
        }
    }
}

export default Snake;
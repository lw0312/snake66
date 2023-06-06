import ScorePanel from './ScorePanel'
import Food from './Food'
import Snake from './Snake'
// 游戏控制器，控制其他的所有类
class GameControl {
    // 定义三个属性
    snake: Snake
    food: Food
    scorepanel: ScorePanel
    // 创建一个属性来存储蛇的移动方向，按键的方向
    direction: string = ''
    // 创建一个属性用来记录游戏是否结束
    isLive = true
    constructor() {
        this.snake = new Snake()
        this.food = new Food()
        this.scorepanel = new ScorePanel()
        this.init()
    }
    // 游戏初始化的方法，调用即游戏开始
    init() {
        // 绑定键盘按键按下的事件
        /* 
            bind(this)的意思是将当前函数中的this绑定到该事件处理函数中，确保事件处理函数中的this指向当前对象。
            这是因为在事件处理函数中，this指向的是触发事件的元素，而不是当前对象。
            通过bind(this)，可以将当前对象的上下文传递给事件处理函数，确保事件处理函数中的this指向当前对象
        */
        document.addEventListener('keydown', this.keydownHandler.bind(this))
        this.run()
    }
    // 创建一个键盘按下的响应函数
    keydownHandler(e: KeyboardEvent) {
        // 需要检查，e.key 的值是否合法
        this.direction = e.key
    }
    // 创建蛇移动的方法
    run() {
        // 根据键盘事件，判断蛇移动方法
        // 获取蛇现在的坐标
        let x = this.snake.x
        let y = this.snake.y
        switch (this.direction) {
            case 'ArrowUp':
                y -= 10
                break;
            case 'ArrowDown':
                y += 10
                break;
            case 'ArrowLeft':
                x -= 10
                break;
            case 'ArrowRight':
                x += 10
                break;
        }
        // 检查蛇是否吃到食物
        this.checkEat(x, y)
        // 修改蛇的x和y
        /* 
            try语句块中的代码是可能会抛出异常的代码，如果try语句块中的代码执行过程中出现了异常，那么程序就会跳转到catch语句块中，执行其中的代码。
            catch语句块中的e表示捕获到的异常对象，可以通过该对象获取到异常的信息。
        */
        try {
            this.snake.x = x
            this.snake.y = y
        } catch (e) {
            // 进入到catch，说明出现了异常，游戏结束，弹出提示信息
            alert((e as any).message + 'GAME OVER')
            this.isLive = false
        }
        // 开启一个定时器调用
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorepanel.level - 1) * 30)
    }
    // 蛇吃食检测
    checkEat(x: number, y: number) {
        if (x === this.food.x && y === this.food.y) {
            // 食物的位置要进行重置
            this.food.change()
            // 分数增加
            this.scorepanel.addScore()
            // 蛇身体增加
            this.snake.addBodies()
        }
    }
}
export default GameControl
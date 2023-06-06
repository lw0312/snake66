// 定义表示记分牌的类
class ScorePanel {
    // score和level的数据
    score = 0
    level = 1
    // score和level的元素
    scoreEle: HTMLElement;
    levelEle: HTMLElement;
    // 限制等级
    maxLevel: number
    // 设置一个变量表示多少分时升级
    upScore: number
    constructor(maxLevel: number = 10, upScore: number = 10) {
        this.scoreEle = document.querySelector('.score')!
        this.levelEle = document.querySelector('.level')!
        this.maxLevel = maxLevel
        this.upScore = upScore
    }
    // 设置加分的方法
    addScore() {
        this.scoreEle.innerHTML = ++this.score + ''
        // 判断分数是多少
        if (this.score % this.upScore === 0) {
            this.levelUp()
        }
    }
    // 提升等级的方法
    levelUp() {
        if (this.level < this.maxLevel) {
            this.levelEle.innerHTML = ++this.level + ''
        }
    }
}
export default ScorePanel
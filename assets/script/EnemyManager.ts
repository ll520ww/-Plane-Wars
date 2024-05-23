import {_decorator, Component, instantiate, Node, Prefab} from 'cc';

const {ccclass, property} = _decorator;

@ccclass('EnemyManager')
export class EnemyManager extends Component {
    @property(Prefab)
    enemy: Prefab

    productEnemy() {
        const {x, y} = this.node.getPosition()
        const node = instantiate(this.enemy)
        const moveX = (Math.random() * 2 - 1) * 200
        node.setPosition(moveX, y)
        this.node.addChild(node)
    }

    start() {
        this.schedule(this.productEnemy, 0.5)
    }

    update(deltaTime: number) {

    }
}


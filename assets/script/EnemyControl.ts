import {_decorator, Component, instantiate, Node, Prefab, v3} from 'cc';

const {ccclass, property} = _decorator;

@ccclass('EnemyControl')
export class EnemyControl extends Component {

    start() {

    }

    update(deltaTime: number) {
        const {x, y} = this.node.getPosition()
        const moveY = y - 300 * deltaTime
        this.node.setPosition(x, moveY)
        if (moveY < -900) {
            this.node.destroy()
        }
    }
}


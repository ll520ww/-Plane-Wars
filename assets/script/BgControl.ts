import {_decorator, Collider2D, Component, Contact2DType, Label, Node, PhysicsSystem2D} from 'cc';
import {GameManager} from './GameManager';

const {ccclass, property} = _decorator;

@ccclass('BgControl')
export class BgControl extends Component {
    @property({type: GameManager})
    public GameManagerNode: GameManager | null = null

    start() {
        this.GameManagerNode.just(true)
    }


    update(deltaTime: number) {
        for (const item of this.node.children) {
            const {x, y} = item.getPosition()
            const moveY = y - 100 * deltaTime
            item.setPosition(x, moveY)
            if (moveY < -800) {
                item.setPosition(x, moveY + 800 * 2);
            }
        }
    }
}


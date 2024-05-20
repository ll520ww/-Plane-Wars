import {_decorator, Component, Node} from 'cc';

const {ccclass, property} = _decorator;

@ccclass('bulletControl')
export class bulletControl extends Component {
    start() {

    }

    update(deltaTime: number) {
        const {x, y} = this.node.getPosition()
        const moveY = y + 600 * deltaTime
        this.node.setPosition(x, moveY)
        if (moveY > 800) {
            this.node.destroy()
        }
    }
}


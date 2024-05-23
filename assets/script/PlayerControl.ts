import {_decorator, Component, EventTouch, instantiate, Node, Prefab, v3} from 'cc';

const {ccclass, property} = _decorator;

@ccclass('PlayerControl')
export class PlayerControl extends Component {
    @property(Prefab)
    bullet: Prefab = null;

    start() {
        this.isAddlisten(true)
    }

    onMove(e: EventTouch) {
        const {x, y} = e.getUILocation()
        this.node.setWorldPosition(v3(x, y))
    }

    isAddlisten(e) {
        if (e) {
            this.node.on(Node.EventType.TOUCH_MOVE, this.onMove,this)
            this.schedule(() => {
                const {x, y} = this.node.getPosition();
                const node = instantiate(this.bullet);
                node.setParent(this.node.parent);
                node.setPosition(x, y + 70);
            }, 0.5);
        } else {
            this.node.off(Node.EventType.TOUCH_MOVE, this.onMove,this)
            this.unscheduleAllCallbacks()
        }
    }

    update(deltaTime: number) {
    }
}


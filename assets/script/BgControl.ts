import {_decorator, Collider2D, Component, Contact2DType, Node, PhysicsSystem2D} from 'cc';

const {ccclass, property} = _decorator;

@ccclass('BgControl')
export class BgControl extends Component {
    start() {
        PhysicsSystem2D.instance.on(
            Contact2DType.BEGIN_CONTACT,
            this.onBeginContact,
            this
        );
    }
    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact(self: Collider2D, other: Collider2D) {
        console.log("self",self,"other",other)
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


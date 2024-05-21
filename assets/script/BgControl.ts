import {_decorator, Collider2D, Component, Contact2DType, Node, PhysicsSystem2D} from 'cc';
import {BulletControl} from './BulletControl';
import {EnemyControl} from './EnemyControl';
import {EndModal} from './EndModal';

const {ccclass, property} = _decorator;

@ccclass('BgControl')
export class BgControl extends Component {
    @property({type: EndModal})
    public EndModalNode: EndModal | null = null

    start() {
        PhysicsSystem2D.instance.on(
            Contact2DType.BEGIN_CONTACT,
            this.onBeginContact,
            this
        );
        PhysicsSystem2D.instance.on(
            Contact2DType.BEGIN_CONTACT,
            this.onBeginContactSelf,
            this
        );
    }

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact(self: Collider2D, other: Collider2D) {
        if (self.tag === 0 && other.tag === 1) {
            self.getComponent(BulletControl)?.die()
            other.getComponent(EnemyControl)?.die()
        } else if (self.tag === 1 && other.tag === 0) {
            self.getComponent(EnemyControl)?.die()
            other.getComponent(BulletControl)?.die()
        }
    }

    //与用户相撞
    onBeginContactSelf(self: Collider2D, other: Collider2D) {
        if (self.tag === 2 || other.tag === 2) {
            if (self.tag === 1) {
                self.getComponent(EnemyControl)?.die()
            }
            if (other.tag === 1) {
                other.getComponent(EnemyControl)?.die()
            }
            this.EndModalNode.node.active = true
        }
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


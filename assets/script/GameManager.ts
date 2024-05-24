import {_decorator, Collider2D, Component, Contact2DType, find, Label, Node, PhysicsSystem2D} from 'cc';
import {PlayerControl} from './PlayerControl';
import {EnemyManager} from './EnemyManager';
import {EnemyControl} from './EnemyControl';
import {BulletControl} from './BulletControl';

const {ccclass, property} = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property({type: Node})
    public Menu: Node | null = null
    totalSteps: number = 0
    @property({type: Label})
    public TotalLabel: Label | null = null
    @property({type: Label})
    public stepLabel: Label | null = null
    active: boolean = false
    @property({type: EnemyManager})
    public EnemyManagerNode: EnemyManager | null = null
    @property({type: PlayerControl})
    public PlayerControlNode: PlayerControl | null = null
    step: number = 0
    @property({type: Label})
    public stepsLabel: Label | null = null;

    start() {
        this.setState(false, 0)
    }

    update(deltaTime: number) {

    }

    setState(e: boolean, totalStep: number) {
        this.Menu.active = e
        this.totalSteps = totalStep
        this.TotalLabel.string = `${this.totalSteps}`
        this.active = e
        if (e) {
            this.EnemyManagerNode.unscheduleAllCallbacks()
        }
    }

    resetStart() {
        this.setState(false, 0)
        this.PlayerControlNode.isAddlisten(true)
        this.EnemyManagerNode.schedule(this.EnemyManagerNode.productEnemy, 0.5)
        this.stepLabel.string = "0"
        this.step = 0
        this.just(true)
    }

    just(e) {
        if (e) {
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
        } else {
            PhysicsSystem2D.instance.off(
                Contact2DType.BEGIN_CONTACT,
                this.onBeginContact,
                this
            );
            PhysicsSystem2D.instance.off(
                Contact2DType.BEGIN_CONTACT,
                this.onBeginContactSelf,
                this
            );
        }
    }

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact(self: Collider2D, other: Collider2D) {
        if (self.tag === 0 && other.tag === 1) {
            self.getComponent(BulletControl)?.die()
            other.getComponent(EnemyControl)?.die()
            this.stepsLabel.string = String(this.step + 1)
            this.step += 1
        } else if (self.tag === 1 && other.tag === 0) {
            self.getComponent(EnemyControl)?.die()
            other.getComponent(BulletControl)?.die()
            this.stepsLabel.string = String(this.step + 1)
            this.step += 1
        }
    }

    //与用户相撞
    onBeginContactSelf(self: Collider2D, other: Collider2D) {
        if ((self.tag === 2 && other.tag === 1) || (self.tag === 1 && other.tag === 2)) {
            if (self.tag === 1) {
                self.getComponent(EnemyControl)?.die()
            }
            if (other.tag === 1) {
                other.getComponent(EnemyControl)?.die()
            }
            PhysicsSystem2D.instance.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            this.setState(true, this.step)
            this.just(false)
            this.PlayerControlNode.isAddlisten(false)
        }
    }
}


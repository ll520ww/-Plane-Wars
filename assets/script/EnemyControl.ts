import {
    _decorator,
    Component,
    resources,
    Sprite,
    SpriteFrame,
} from 'cc';

const {ccclass, property} = _decorator;

@ccclass('EnemyControl')
export class EnemyControl extends Component {
    isDead: boolean = false
    airplaneDeadImages: any[] = [];

    start() {
        this.loadImages()
    }

    loadImages() {
        resources.loadDir("enemy-death", SpriteFrame,
            (_err, SpriteFrames) => {
                this.airplaneDeadImages = SpriteFrames;
            }
        )
    }

    playAirplaneDead() {
        for (let i = 0; i < this.airplaneDeadImages?.length; i++) {
            setTimeout(() => {
                if (this.node?.getComponent) {
                    this.node.getComponent(Sprite).spriteFrame = this.airplaneDeadImages[i]
                }
            }, i * 80)

        }
    }

    update(deltaTime: number) {
        const {x, y} = this.node.getPosition()
        const moveY = y - 300 * deltaTime
        this.node.setPosition(x, moveY)
        if (moveY < -900) {
            this.node.destroy()
        }
    }

    die() {
        if (this.isDead) {
            return
        }
        this.isDead = true
        this.playAirplaneDead()
        setTimeout(() => {
            this.node?.destroy?.()
        }, 200)
    }
}


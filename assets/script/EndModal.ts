import {_decorator, Component, Node} from 'cc';

const {ccclass, property} = _decorator;

@ccclass('EndModal')
export class EndModal extends Component {
    start() {
        this.node.active = false
    }

    update(deltaTime: number) {

    }
}


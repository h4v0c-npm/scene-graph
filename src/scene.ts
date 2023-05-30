import { Renderer } from '@h4v0c/ctx2d';
import { Node } from './node';
import { Camera } from './camera';

export class Scene extends Node {
    render(renderer: Renderer, time: number, deltaTime: number, camera?: Camera) {
        if (camera) {
            camera.updateWorldMatrix();
            camera.update(time, deltaTime);
            camera.render(renderer);
        }

        this.updateWorldMatrix(camera?.projectionMatrix);
        this.update(time, deltaTime);
        super.render(renderer);
    }
}

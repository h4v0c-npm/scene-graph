# sg2d
A simple scene-graph that works with [@h4v0c/renderer2d](https://www.npmjs.com/package/@h4v0c/renderer2d)

## Classes:
* `Base` (`abstract`, `extends` [EventEmitter](https://www.npmjs.com/package/@h4v0c/event-emitter)): The base class to all nodes.
    * Properties:
        * `id` (`readonly`, `UID`): unique id set by [@h4v0c/uid](https://www.npmjs.com/package/@h4v0c/uid)
        * `type` (`readonly`, `string`): node type, set by `this.constructor.name`
        * `name` (`string`): user mutable name for the node, defaults to `this.constructor.name`
* `Node` (`extends Base`):
    * Properties:
        * `position` (`vec2`): relative position
        * `rotation`: (`number`): relative rotation (still WiP)
        * `scale`: (`vec2`): relative scale
        * `localMatrix`: (`mat3`): the local view matrix
        * `worldMatrix`: (`mat3`) = the world view matrix
        * `parent`: (`Node`): this node's parent `Node`
        * `children`: (`Node[]`): `Node` children of this node
    * Methods:
        * `setParent`(`parent`: `Node`): set this node's parent to `parent`
        * `updateLocalMatrix`(): updates this node's `localMatrix`, typically only called by `updateWorldMatrix` (see below)
        * `updateWorldMatrix`(`otherMatrix`?: `mat3`): calls `updateLocalMatrix` and updated this node's `worldMatrix`, including mutating by parent node's `worldMatrix`. `otherMatrix` is an optional matrix that can be set to further mutate this node and it's child nodes, typically used by the `Camera` node to provide a `projectionMatrix`.
        * `update`(`time`: `number`, `deltaTime`: `number`): updates properties and children
        * `render`(`renderer`: `Renderer`, ...`args`: `any[]`): renders the node and children
* `Scene` (extends `Node`):
    * Methods:
        * `render`(`renderer`: `Renderer`, `time`: `number`, `deltaTime`: `number`, `camera`?: `Camera`): Renders the entire scene, including children, passing all _required_ parameters to it's children. The optional parameter, `camera` is used only if a `Camera` is created, and will calculate and include it's `projectionMatrix` in the scene's `worldMatrix` (which is then used for it's children).
* `Camera` (extends `Node`):
    * Properties:
        * `projectionMatrix` (`mat3`): The camera's `projectionMatrix`, calculated by `Scene.render` (if included). It is the inverted form of it's `worldMatrix`, after it's `worldMatrix` is calculated.
* `Sprite` (extends `Node`):
    * Properties:
        * `_texture` (`protected`, `Texture`): holds the `Texture` data
        * `region` (`vec4`): defines the rectangle area of `_texture` to draw
        * `centered` (`boolean`): true means that the position of the drawn texture will be half it's width and height, false means the position will be the top-left of the texture.
* `AnimatedSprite` (extends `Sprite`):
    * Properties:
        * `animating` (`boolean`, default: `true`): animation is on or off
        * `animationSpeed` (`number`, default: `250`): time before next frame
        * `frameIndex` (`number`, default: `0`): current frame
        * `frames`: (`vec4[]`, default: `[]`): all frames (a `frame` is like a `region` from `Sprite`)
        * `_frameTime` (`private`, `number`, default: `0`): holds the current time
* `TileMap` (extends `Node`):

(MORE TO COME)

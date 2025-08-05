import ForceGraph3D from '3d-force-graph';
import * as THREE from 'three';
import "./style.css"

interface NodeType {
    gen?: number;
    id?: string | number;
}

const data = {
    nodes: [
        { gen: 0, id: "julia" },
        { gen: 0, id: "lee" },
        { gen: 1, id: "anish" },
        { gen: 1, id: "izzy" },
        { gen: 1, id: "ash" },
        { gen: 1, id: "emma" },
        { gen: 2, id: "vivek" },
        { gen: 2, id: "li" },
        { gen: 2, id: "katherine" },
        { gen: 2, id: "max" },
        { gen: 2, id: "andy" },
        { gen: 2, id: "andrew" },
        { gen: 2, id: "charles" },
        { gen: 2, id: "anish jr" },
        { gen: 2, id: "pius" },
        { gen: 2, id: "violet" },
        { gen: 2, id: "vidur" },
        { gen: 2, id: "mithun" },
        { gen: 2, id: "ivory" },
        { gen: 2, id: "yusuf" },
        { gen: 2, id: "aiden" },
        { gen: 2, id: "jesse" },
        { gen: 2, id: "vincent" },
        { gen: 2, id: "yue" },
        { gen: 2, id: "kaitlyn" },
        { gen: 2, id: "justin" },
        { gen: 2, id: "edward" },
        { gen: 2, id: "steven" },
        { gen: 2, id: "amy" },
        { gen: 2, id: "faisal" },
        { gen: 2, id: "eddie" },
        { gen: 2, id: "keeler" },
        { gen: 2, id: "mik" }
    ],
    links: [
        // imps
        { source: "anish", target: "vivek", family: "imps" },
        { source: "anish", target: "li", family: "imps" },
        { source: "anish", target: "katherine", family: "imps" },
        { source: "anish", target: "max", family: "imps" },
        { source: "anish", target: "andy", family: "imps" },
        { source: "anish", target: "andrew", family: "imps" },
        { source: "anish", target: "charles", family: "imps" },
        { source: "anish", target: "anish jr", family: "imps" },
        { source: "anish", target: "pius", family: "imps" },
        { source: "anish", target: "violet", family: "imps" },
        { source: "anish", target: "vidur", family: "imps" },
        { source: "anish", target: "mithun", family: "imps" },
        { source: "anish", target: "ivory", family: "imps" },
        { source: "anish", target: "yusuf", family: "imps" },

        // izzy's icees
        { source: "izzy", target: "ivory", family: "icees" },
        { source: "izzy", target: "aiden", family: "icees" },
        { source: "izzy", target: "jesse", family: "icees" },
        { source: "izzy", target: "vincent", family: "icees" },
        { source: "izzy", target: "andrew", family: "icees" },
        { source: "izzy", target: "yue", family: "icees" },
        { source: "izzy", target: "kaitlyn", family: "icees" },
        { source: "izzy", target: "justin", family: "icees" },

        // ashlings
        { source: "ash", target: "aiden", family: "ashlings" },
        { source: "ash", target: "jesse", family: "ashlings" },
        { source: "ash", target: "edward", family: "ashlings" },
        { source: "ash", target: "steven", family: "ashlings" },
        { source: "ash", target: "max", family: "ashlings" },
        { source: "ash", target: "violet", family: "ashlings" },

        // lee's leafs
        { source: "lee", target: "li", family: "leafs" },
        { source: "lee", target: "katherine", family: "leafs" },
        { source: "lee", target: "amy", family: "leafs" },
        { source: "lee", target: "max", family: "leafs" },
        { source: "lee", target: "faisal", family: "leafs" },
        { source: "lee", target: "jesse", family: "leafs" },
        { source: "lee", target: "izzy", family: "leafs" },

        // julia's icecreams
        { source: "julia", target: "eddie", family: "icecream" },
        { source: "julia", target: "aiden", family: "icecream" },
        { source: "julia", target: "katherine", family: "icecream" },
        { source: "julia", target: "jesse", family: "icecream" },
        { source: "julia", target: "kaitlyn", family: "icecream" },
        { source: "julia", target: "keeler", family: "icecream" },
        { source: "julia", target: "mik", family: "icecream" },
        { source: "julia", target: "ivory", family: "icecream" },

        // mochis
        { source: "emma", target: "eddie", family: "mochis" },
        { source: "emma", target: "aiden", family: "mochis" },
        { source: "emma", target: "jesse", family: "mochis" },
    ]
};

const textureLoader = new THREE.TextureLoader();

const createCircularMask = () => {
    const canvas = document.createElement('canvas');
    const size = 256;
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext('2d')!;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();

    return new THREE.CanvasTexture(canvas);
};

const createStarfield = () => {
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1,
        sizeAttenuation: false
    });

    const starsVertices = [];
    const numStars = 2000;

    for (let i = 0; i < numStars; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starsVertices.push(x, y, z);
    }

    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    return new THREE.Points(starsGeometry, starsMaterial);
};

const circularMask = createCircularMask();

const graph = new ForceGraph3D(document.querySelector('body')!)
    .graphData(data)
    .nodeLabel("id")
    .nodeAutoColorBy("gen")
    .linkAutoColorBy("family")
    .linkLabel("family")
    .linkWidth(1)
    .linkOpacity(0.5)
    .linkResolution(6)
    .nodeThreeObject((node: NodeType) => {
        const id = typeof node.id === "string" ? node.id : String(node.id);

        const texture = textureLoader.load(`/${id}.png`);
        const material = new THREE.SpriteMaterial({
            map: texture,
            alphaMap: circularMask,

            // get rid of black border behind mask
            // interestingly, this occludes links and not other sprites
            depthTest: false,
        });

        const sprite = new THREE.Sprite(material);
        const scale = 12 + 6 * (node.gen ?? 0);
        sprite.scale.set(scale, scale, 1);
        sprite.renderOrder = 100000; // render over links

        return sprite;
    })
    .nodeThreeObjectExtend(true); // enables custom objects

const starfield = createStarfield();
graph.scene().add(starfield);

const initialDistance = 300;
graph.cameraPosition({ x: initialDistance, y: 0, z: 0 });

let angle = 0;
const rotationSpeed = 0.001;

let isUserInteracting = false;
let interactionTimeout: number;

const getCurrentAngleFromCamera = () => {
    const cameraPos = graph.cameraPosition();
    return Math.atan2(cameraPos.z, cameraPos.x);
}

const getCurrentDistanceFromCamera = () => {
    const cameraPos = graph.cameraPosition();
    // distance from center (ignoring Y for horizontal rotation)
    return Math.sqrt(cameraPos.x * cameraPos.x + cameraPos.z * cameraPos.z);
};

// detect user interaction + resume after 2.5 seconds of no interaction
const graphElement = graph.graphData().nodes.length > 0 ? graph : null;
if (graphElement) {
    const canvas = document.querySelector('canvas');
    if (canvas) {
        canvas.addEventListener('mousedown', () => {
            isUserInteracting = true;
            clearTimeout(interactionTimeout);
            interactionTimeout = setTimeout(() => {
                isUserInteracting = false;
                angle = getCurrentAngleFromCamera();
            }, 2500);
        });

        canvas.addEventListener('wheel', () => {
            isUserInteracting = true;
            clearTimeout(interactionTimeout);
            interactionTimeout = setTimeout(() => {
                isUserInteracting = false;
                angle = getCurrentAngleFromCamera();
            }, 2500);
        });
    }
}

const animate = () => {
    if (!isUserInteracting) {
        angle += rotationSpeed;

        // default to initialDistance if camera is at center
        const distance = getCurrentDistanceFromCamera() || initialDistance;
        const x = Math.cos(angle) * distance;
        const z = Math.sin(angle) * distance;

        const currentY = graph.cameraPosition().y;
        graph.cameraPosition({ x, y: currentY, z });
    }

    requestAnimationFrame(animate);
};

animate();

window.addEventListener("resize", () => {
    graph.width(window.innerWidth).height(window.innerHeight);
})

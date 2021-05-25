const raycaster = document.querySelector('[ar-raycaster]');
const cursor = document.querySelector('#cursor');
const scene = document.querySelector('a-scene');
const walker = document.querySelector('#walker');
const { stringify } = AFRAME.utils.coordinates;

scene.addEventListener('loaded', onSceneLoaded);

function onSceneLoaded() {
    raycaster.addEventListener('raycaster-intersection', (event) => {
        cursor.setAttribute('position', event.detail.intersections[0].point);
    });
}

let firstTime = true;
raycaster.addEventListener('click', () => {
    const target = raycaster.components.cursor.intersection.point;

    if (firstTime) {
        walker.setAttribute('position', target);
        firstTime = false;
    } else {
        walker.object3D.lookAt(target);
        
        const currentPosition = walker.object3D.position;
        const distance = currentPosition.distanceTo(target);

        const animation = document.createElement('a-animation');
        animation.setAttribute('attribute', 'position');
        animation.setAttribute('to', stringify(target));
        animation.setAttribute('dur', distance * 7000);
        animation.setAttribute('easing', 'linear');
        walker.appendChild(animation);
    }
});
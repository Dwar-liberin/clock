import { MindARThree } from "mindar-image-three";
import * as THREE from "three";
import { videoLoader } from "./libs/videoLoader/videoLoader.js";
import { loadTexture } from "./libs/loader.js";
// import { imageLoader } from "./libs/imageLoader/imageLoader.js";

document.addEventListener("DOMContentLoaded", () => {
  const start = async () => {
    const mindarThree = new MindARThree({
      container: document.body,
      imageTargetSrc: "./assets/targets/cromaVideo.mind",
    });
    const { renderer, scene, camera } = mindarThree;

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);

    const { videoPlane, video } = await videoLoader({
      path: "https://static.dreemar.com/asset/video/a16ca1ae-0ca4-4fa6-b4af-f1b978750408",
    });

    // const { planeMesh } = await imageLoader({
    //   src: "./assets/logo/Button.png",
    // });

    // const iconGeometry = new THREE.PlaneGeometry(1.2, 0.4);

    // const textureLoader = new THREE.TextureLoader();

    // const iconTexture = textureLoader.load("./assets/logo/saveIconred.jpg");

    // const imageMesh = new THREE.MeshBasicMaterial({
    //   map: iconTexture,
    // });

    // const planeMesh = new THREE.Mesh(iconGeometry, imageMesh);

    // planeMesh.scale.set(0.5, 0.5, 0.5);

    // console.log("Video", videoPlane);

    videoPlane.position.set(0, 0, 0);

    videoPlane.scale.set(0.7, 0.8, 0.8);
    videoPlane.rotation.set(0, 0, 0);

    videoPlane.userData.clickable = true; // set the user Data to clickable.

    // planeMesh.position.set(0, -0.9, 0);
    // planeMesh.userData.clickable = true;

    // const raccoon = await loadGLTF(
    //   "./assets/models/musicband-raccoon/scene.gltf"
    // );

    // raccoon.scene.scale.set(0.1, 0.1, 0.1);
    // raccoon.scene.position.set(0, 1, 0);

    scene.add(light);

    // const anchor = mindarThree.addAnchor(1);

    const anchorVideo = mindarThree.addAnchor(0);

    // anchor.group.add(raccoon.scene);

    anchorVideo.group.add(videoPlane);

    // anchorVideo.group.add(planeMesh);

    // planeMesh.userData.clickable = true;

    // anchorVideo.group.add(raccoon.scene);

    // const image = mindarThree.addAnchor(0);
    // image.group.add(planeMesh);

    anchorVideo.onTargetFound = () => {
      video.play();
    };

    anchorVideo.onTargetLost = () => {
      video.pause();
    };

    document.body.addEventListener("click", (e) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

      const mouse = new THREE.Vector2(mouseX, mouseY);
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        let o = intersects[0].object;

        while (o.parent && !o.userData.clickable) {
          o = o.parent;
        }

        if (o.userData.clickable) {
          window.location.href = "https://dl.osunio.com/tbCg";
        }
      }
    });

    // video.addEventListener("play", () => {
    //   video.currentTime = 6;
    // });

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  };
  start();
});

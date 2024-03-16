/**
  * @param {{src: string}} src
  * @returns {Promise<{ planeMesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap>, imageMesh: THREE.MeshBasicMaterial }>}

*/
import { loadTexture } from "../loader.js";
import * as THREE from "three";

export function imageLoader({ src }) {
  return new Promise(async (resolve, reject) => {
    try {
      const iconGeometry = new THREE.CircleGeometry(0.075, 32);

      const texture = await loadTexture(src);

      const imageMesh = new THREE.MeshBasicMaterial({
        map: texture,
      });

      const planeMesh = new THREE.Mesh(iconGeometry, imageMesh);
      planeMesh.scale.set(0.5, 0.5, 0.5);

      resolve({
        planeMesh,
      });
    } catch (error) {
      console.log("Err", error);
    }
  });
}

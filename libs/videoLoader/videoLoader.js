import { loadVideo } from "../loader.js";
import * as THREE from "three";
import { createChromaMaterial } from "../../libs/chroma-video.js";

export function videoLoader({ path }) {
  return new Promise(async (resolve, reject) => {
    const video = await loadVideo(path);
    const texture = new THREE.VideoTexture(video);

    const geometry = new THREE.PlaneGeometry(0.8, 0.7);
    // const material = new THREE.MeshBasicMaterial({ map: texture });

    const material = createChromaMaterial(texture, 0xff29ff);

    const videoPlane = new THREE.Mesh(geometry, material);

    resolve({
      videoPlane,
      video,
    });
  });
}

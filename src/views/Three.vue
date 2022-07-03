<template>
  <div class="page" ref="three"></div>
</template>

<script>
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default {
  data: () => ({
    scene: null,
    camera: null,
    renderer: null,

    cube: null,
    line: null,
  }),
  mounted() {
    this.init();
    // this.addGeometry();
    // this.addLine();
    this.addLight();
    this.addGltf();
    this.animate();
  },
  methods: {
    init() {
      this.scene = new this.$three.Scene();
      this.scene.background = new this.$three.Color(0xa0a0a0);

      this.camera = new this.$three.PerspectiveCamera(
        45,
        this.$refs.three.clientWidth / this.$refs.three.clientHeight,
        1,
        1000
      );
      this.camera.position.set(1, 2, -3);
      this.camera.lookAt(0, 1, 0);

      this.renderer = new this.$three.WebGLRenderer();
      this.renderer.setSize(
        this.$refs.three.clientWidth,
        this.$refs.three.clientHeight
      );

      this.$refs.three.appendChild(this.renderer.domElement);
    },
    addGeometry() {
      const geometry = new this.$three.BoxGeometry();
      const material = new this.$three.MeshBasicMaterial({ color: 0x00ff00 });
      this.cube = new this.$three.Mesh(geometry, material);

      this.scene.add(this.cube);
      this.camera.position.z = 10;
    },
    addLine() {
      const material = new this.$three.LineBasicMaterial({ color: 0x0000ff });
      const points = [];
      points.push(new this.$three.Vector3(-5, 0, 0));
      points.push(new this.$three.Vector3(0, 5, 0));
      points.push(new this.$three.Vector3(5, 0, 0));
      const geometry = new this.$three.BufferGeometry().setFromPoints(points);
      this.line = new this.$three.Line(geometry, material);

      this.scene.add(this.line);
    },
    addGltf() {
      const loader = new GLTFLoader();
      loader.load(
        "/model/Soldier.glb",
        (gltf) => {
          this.scene.add(gltf.scene);
        },
        undefined,
        (error) => {
          console.error(error);
        }
      );
    },
    addLight() {
      const hemiLight = new this.$three.HemisphereLight(0xffffff, 0x444444);
      hemiLight.position.set(0, 20, 0);
      this.scene.add(hemiLight);
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
      // this.cube.rotation.x += 0.01;
      // this.cube.rotation.y += 0.01;
    },
  },
};
</script>

<style scoped></style>

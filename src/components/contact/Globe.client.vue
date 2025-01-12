<template>
  <div ref="globeEl" class="globe-container"></div>
</template>

<script setup>
import * as THREE from 'three';
import cloudsImg from "@/assets/images/clouds.png";

const globeEl = ref(null);
const globeInstance = ref(null);

const arcsData = [
  // Europe
  { startLat: 51.5074, startLng: -0.1278, endLat: 52.5200, endLng: 13.4050, color: '#4444ff', label: 'London - Berlin' },
  { startLat: 48.8566, startLng: 2.3522, endLat: 52.5200, endLng: 13.4050, color: '#ff44ff', label: 'Paris - Berlin' },
  { startLat: 41.9028, startLng: 12.4964, endLat: 52.5200, endLng: 13.4050, color: '#44ffff', label: 'Rome - Berlin' },
  { startLat: 40.4168, startLng: -3.7038, endLat: 52.5200, endLng: 13.4050, color: '#ffff44', label: 'Madrid - Berlin' },
  // Americas
  { startLat: 40.7128, startLng: -74.0060, endLat: 52.5200, endLng: 13.4050, color: '#ff4444', label: 'New York - Berlin' },
  { startLat: 34.0522, startLng: -118.2437, endLat: 52.5200, endLng: 13.4050, color: '#ff8844', label: 'Los Angeles - Berlin' },
  { startLat: -23.5505, startLng: -46.6333, endLat: 52.5200, endLng: 13.4050, color: '#44ff88', label: 'São Paulo - Berlin' },
  { startLat: 19.4326, startLng: -99.1332, endLat: 52.5200, endLng: 13.4050, color: '#88ff44', label: 'Mexico City - Berlin' },
  // Asia
  { startLat: 35.6762, startLng: 139.6503, endLat: 52.5200, endLng: 13.4050, color: '#44ff44', label: 'Tokyo - Berlin' },
  { startLat: 31.2304, startLng: 121.4737, endLat: 52.5200, endLng: 13.4050, color: '#ff4488', label: 'Shanghai - Berlin' },
  { startLat: 22.3193, startLng: 114.1694, endLat: 52.5200, endLng: 13.4050, color: '#8844ff', label: 'Hong Kong - Berlin' },
  { startLat: 1.3521, startLng: 103.8198, endLat: 52.5200, endLng: 13.4050, color: '#44ffaa', label: 'Singapore - Berlin' },
  { startLat: 28.6139, startLng: 77.2090, endLat: 52.5200, endLng: 13.4050, color: '#aaff44', label: 'New Delhi - Berlin' },
  // Oceania
  { startLat: -33.8688, startLng: 151.2093, endLat: 52.5200, endLng: 13.4050, color: '#ffaa44', label: 'Sydney - Berlin' },
  // Africa
  { startLat: 30.0444, startLng: 31.2357, endLat: 52.5200, endLng: 13.4050, color: '#ff44aa', label: 'Cairo - Berlin' },
  { startLat: -33.9249, startLng: 18.4241, endLat: 52.5200, endLng: 13.4050, color: '#44aaff', label: 'Cape Town - Berlin' }
];

const pointsData = [
  // Berlin (larger marker)
  { lat: 52.5200, lng: 13.4050, size: 0.8, color: '#ffffff', label: 'Berlin' },
  // Europe
  { lat: 51.5074, lng: -0.1278, size: 0.5, color: '#4444ff', label: 'London' },
  { lat: 48.8566, lng: 2.3522, size: 0.5, color: '#ff44ff', label: 'Paris' },
  { lat: 41.9028, lng: 12.4964, size: 0.5, color: '#44ffff', label: 'Rome' },
  { lat: 40.4168, lng: -3.7038, size: 0.5, color: '#ffff44', label: 'Madrid' },
  // Americas
  { lat: 40.7128, lng: -74.0060, size: 0.5, color: '#ff4444', label: 'New York' },
  { lat: 34.0522, lng: -118.2437, size: 0.5, color: '#ff8844', label: 'Los Angeles' },
  { lat: -23.5505, lng: -46.6333, size: 0.5, color: '#44ff88', label: 'São Paulo' },
  { lat: 19.4326, lng: -99.1332, size: 0.5, color: '#88ff44', label: 'Mexico City' },
  // Asia
  { lat: 35.6762, lng: 139.6503, size: 0.5, color: '#44ff44', label: 'Tokyo' },
  { lat: 31.2304, lng: 121.4737, size: 0.5, color: '#ff4488', label: 'Shanghai' },
  { lat: 22.3193, lng: 114.1694, size: 0.5, color: '#8844ff', label: 'Hong Kong' },
  { lat: 1.3521, lng: 103.8198, size: 0.5, color: '#44ffaa', label: 'Singapore' },
  { lat: 28.6139, lng: 77.2090, size: 0.5, color: '#aaff44', label: 'New Delhi' },
  // Oceania
  { lat: -33.8688, lng: 151.2093, size: 0.5, color: '#ffaa44', label: 'Sydney' },
  // Africa
  { lat: 30.0444, lng: 31.2357, size: 0.5, color: '#ff44aa', label: 'Cairo' },
  { lat: -33.9249, lng: 18.4241, size: 0.5, color: '#44aaff', label: 'Cape Town' }
];

const initGlobe = async (Globe) => {
  console.log("Initializing globe");
  globeInstance.value = Globe()(globeEl.value)
    .width(600)
    .height(600)
    .backgroundColor("#000000")
    .globeImageUrl("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
    .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
    .atmosphereColor("#3D5AF1")
    .atmosphereAltitude(0.15)
    .arcsData(arcsData)
    .arcColor('color')
    .arcDashLength(0.4)
    .arcDashGap(0.2)
    .arcDashAnimateTime(1500)
    .arcStroke(0.5)
    .arcAltitude(0.3)
    .pointsData(pointsData)
    .pointColor('color')
    .pointsMerge(true)
    .pointAltitude(0.01)
    .pointRadius('size')
    .pointLabel('label')
    .pointLat('lat')
    .pointLng('lng')
    .pointResolution(20)
    .onGlobeReady(() => {
      console.log("Globe ready");
      addCloudsLayer();
      globeInstance.value.pointOfView({
        lat: 25.0,
        lng: 18.0,
        altitude: 2.5
      }, 1000);
    });

  // Add hover effect for points
  globeInstance.value
    .onPointHover(point => {
      if (point) {
        globeInstance.value.pointRadius(p => p === point ? 0.8 : 0.5);
      } else {
        globeInstance.value.pointRadius('size');
      }
    });

  // Auto-rotate
  globeInstance.value.controls().autoRotate = true;
  globeInstance.value.controls().autoRotateSpeed = 1;
};

const addCloudsLayer = () => {
  const CLOUDS_ALT = 0.004;
  const CLOUDS_ROTATION_SPEED = -0.006;

  if (!globeInstance.value) return;

  const globeRadius = globeInstance.value.getGlobeRadius();
  const cloudsGeometry = new THREE.SphereGeometry(
    globeRadius * (1 + CLOUDS_ALT),
    75,
    75
  );

  const cloudTextureUrl = cloudsImg || '//unpkg.com/three-globe/example/img/clouds.png';

  new THREE.TextureLoader().load(cloudTextureUrl, (cloudsTexture) => {
    const cloudsMaterial = new THREE.MeshPhongMaterial({
      map: cloudsTexture,
      transparent: true,
      opacity: 0.8,
    });

    const cloudsMesh = new THREE.Mesh(cloudsGeometry, cloudsMaterial);

    if (globeInstance.value.scene()) {
      globeInstance.value.scene().add(cloudsMesh);

      const rotateClouds = () => {
        cloudsMesh.rotation.y += (CLOUDS_ROTATION_SPEED * Math.PI) / 180;
        requestAnimationFrame(rotateClouds);
      };

      rotateClouds();
    }
  });
};

onMounted(() => {
  if (typeof window !== "undefined") {
    import("globe.gl").then((Globe) => {
      console.log("Globe module loaded");
      initGlobe(Globe.default);
    });
  }
});

onBeforeUnmount(() => {
  if (globeInstance.value) {
    globeInstance.value.scene().dispose();
  }
});

// Expose the globe instance to the parent component
defineExpose({
  globeInstance
});
</script>

<style scoped>
.globe-container {
  width: 100%;
  max-width: 600px;
  height: 600px;
  margin: 0 auto;
  position: relative;
  border-radius: 40px;
}
</style>
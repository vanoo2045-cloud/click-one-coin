<template>
  <button
    class="upgrade-btn"
    :class="{
      'has-skin': !!skinImage,
      'is-disabled': disabled
    }"
    :disabled="disabled"
    type="button"
    @click="$emit('click')"
  >
    <img
      v-if="skinImage"
      :src="skinImage"
      alt=""
      class="btn-skin"
      draggable="false"
    >

    <span v-if="skinImage && overlayTitle" class="title-patch" />
    <span v-if="skinImage && overlayTitle" class="skin-title">{{ title }}</span>
    <span v-if="skinImage" class="skin-subtitle">{{ subtitle }}</span>
    <span v-if="skinImage" class="skin-price">{{ cost }}</span>

    <template v-if="!skinImage">
      <span class="text-block">
        <span class="title">{{ title }}</span>
        <span class="subtitle">{{ subtitle }}</span>
      </span>
      <span class="price-frame">
        <span class="price">{{ cost }}</span>
      </span>
    </template>
  </button>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  cost: { type: Number, required: true },
  skinImage: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  overlayTitle: { type: Boolean, default: false }
})

defineEmits(['click'])
</script>

<style scoped>
.upgrade-btn {
  position: relative;
  /* display: block; */
  width: 100%;
  /* aspect-ratio: 5.2 / 1; */
  min-height: 58px;
  border: none;
  padding: 0;
  cursor: pointer;
  background: #2a1c10;
  image-rendering: pixelated;
  -webkit-tap-highlight-color: transparent;
  transition: filter 0.05s steps(2), transform 0.05s steps(2);
}

.upgrade-btn.has-skin {
  background: transparent;
}

.upgrade-btn:active:not(:disabled) {
  transform: translateY(2px);
  filter: brightness(0.92);
}

.upgrade-btn.is-disabled {
  opacity: 0.45;
  filter: grayscale(0.5);
  cursor: not-allowed;
}

.btn-skin {
  /* position: absolute; */
  /* inset: 0; */
  width: 100%;
  height: 100%;
  /* object-fit: fill; */
  image-rendering: pixelated;
  pointer-events: none;
  display: block;
}

.title-patch {
  position: absolute;
  /* left: 19%;
  top: 20%;
  width: 52%;
  height: 30%; */
  background: #2a1c10;
  pointer-events: none;
}

.skin-title {
  position: absolute;
  display: none;
  left: 20%;
  top: 24%;
  font-family: 'Press Start 2P', monospace;
  font-size: clamp(6px, 1.9vw, 8px);
  color: #fff;
  text-shadow: 1px 1px 0 #000;
  pointer-events: none;
  z-index: 1;
}

.skin-subtitle {
  position: absolute;
  left: 20%;
  bottom: 18%;
  font-family: 'VT323', monospace;
  font-size: clamp(15px, 4.2vw, 19px);
  color: #d0d0d0;
  text-shadow: 1px 1px 0 #000;
  pointer-events: none;
  z-index: 1;
}

.skin-price {
  position: absolute;
  right: 8%;
  top: 50%;
  transform: translateY(-50%);
  font-family: 'Press Start 2P', monospace;
  font-size: clamp(9px, 2.6vw, 11px);
  color: #fff;
  text-shadow: 2px 2px 0 #000;
  pointer-events: none;
  z-index: 1;
  min-width: 44px;
  text-align: center;
}

.text-block {
  padding: 10px 14px;
  text-align: left;
}

.title {
  font-family: 'Press Start 2P', monospace;
  font-size: 9px;
  color: #fff;
}

.subtitle {
  font-family: 'VT323', monospace;
  font-size: 18px;
  color: #bbb;
}

.price-frame {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.price {
  font-family: 'Press Start 2P', monospace;
  font-size: 11px;
  color: #fff;
}
</style>

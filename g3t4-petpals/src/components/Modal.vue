<style lang="scss" scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;

  .modal-inner {
    position: relative;
    max-width: 640px;
    width: 80%;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    background-color: #fff;
    border-radius:15px;
    padding: 20px;
  }
}
</style>

<template>
<transition name="modal-animation">
  <div v-show="modalActive" class="modal">
    <transition name="modal-animation-inner">
      <div v-show="modalActive" class="modal-inner">
        <i @click="close" class="far fa-times-circle"></i>
        <!-- Modal Content -->
        <slot></slot>
        <button v-if="type=='register'" @click="close" class="btn btn-go" style="width: 50%; margin-left: 25%; margin-top: 20px;">Back to Login</button>
        <button v-else @click="close" class="btn btn-go" style="width: 50%; margin-left: 25%; margin-top: 20px;">Done</button>
      </div>
    </transition>
  </div>
</transition>
</template>

<script>
export default {
  props: ["modalActive",'type'],
  
  setup(props, { emit }) {
    const close = () => {
      emit("close");
    };

    return { close };
  },
};
</script>


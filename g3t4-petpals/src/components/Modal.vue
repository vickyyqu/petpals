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

  .modal-dialog{
    position: relative;
    max-width: 640px;
    width: 80%;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    background-color: #fff;
    border-radius:15px;
    padding: 20px;
    overflow-y: initial;
  }
}

.modal-body {
  overflow-y: auto;
  max-height: calc(100vh - 280px);
}
</style>

<template>

  <div class="modal" v-show="modalActive">
      <div class="modal-dialog"> 
      <div class="modal-content" v-show="modalActive">
      <div class="modal-body">
        <i @click="close" class="far fa-times-circle"></i>
       <slot></slot>
      </div>
      <div class="modal-footer border-0">
        <button v-if="type=='register'" @click="close" class="btn btn-go mx-auto mb-4">Back to Login</button>
        <button v-else @click="close" class="btn btn-go mx-auto mb-3 mt-1">Done</button>
      </div>
      </div>
      </div>
  </div>

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


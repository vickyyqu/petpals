<!-- <template>
    <div>{{ index }} - {{ source.text }}</div>
  </template>
  
  <script>
    export default {
      name: 'item-component',
      props: {
        index: { // index of current item
          type: Number
        },
        source: { // here is: {uid: 'unique_1', text: 'abc'}
          type: Object,
          default () {
            return {}
          }
        }
      }
    }
  </script> -->

  <template>
    <div class="item">
      <div class="id">{{ source.id }} - {{ source.text }}</div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'item',
    props: {
      source: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .item {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid lightgrey;
    padding: 1em;
  }
  </style>
  
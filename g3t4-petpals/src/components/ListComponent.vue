<!-- <template>
    <div class="scrolling-component" ref="scrollComponent">
        <PostComponent v-for="post in posts" :post="post"></PostComponent>
    </div>
</template>

<script>
import getPosts from '../api/getPost.js'
import PostComponent from './Post.vue';
import {ref, onMounted, onUnmounted} from 'vue'

export default {
    components: {
        PostComponent
    },
    setup() {
        const posts = ref(getPosts[10])
        const scrollComponent = ref(null)

        const loadMorePosts = () => {
            let newPosts = getPosts(10)
            console.log(newPosts)
            posts.value.push(...newPosts)
        }

        onMounted(() => {
            window.addEventListener("scroll", handleScroll)
        })
        onUnmounted(() => {
            window.removeEventListener("scroll", handleScroll)
        })
        const handleScroll = (e) => {
            let element = scrollComponent.value
            if (element.getBoundingClientRect().bottom < window.innerHeight) {
                loadMorePosts()
  }
        }

        return {
            posts, 
            scrollComponent
        }
    }
}
</script> -->

<template>
    <div>
      <virtual-list style="height: 360px; overflow-y: auto;"
        :data-key="'uid'"
        :data-sources="items"
        :data-component="itemComponent"
      />
    </div>
  </template>
  
  <script>
    import Item from '../components/Item.vue'
    import VirtualList from 'vue-virtual-scroll-list'
  
    export default {
      name: 'root',
      data () {
        return {
          itemComponent: Item,
          items: [{uid: 'unique_1', text: 'abc'}, {uid: 'unique_2', text: 'xyz'}]
        }
      },
      components: { 'virtual-list': VirtualList }
    }
  </script>
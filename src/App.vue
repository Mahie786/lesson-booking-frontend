<template>
  <div id="app">
    <nav-bar />
    <router-view />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar,
  },

  mounted() {
    this.$store.dispatch("cart/initializeCart");
  },
  methods: {
    addToCart(lesson) {
      this.cartItems.push({ ...lesson });
      // Update lesson spaces
      const lessonIndex = this.lessons.findIndex((l) => l.id === lesson.id);
      if (lessonIndex !== -1) {
        this.lessons[lessonIndex].spaces--;
      }
    },
    removeFromCart(lessonId) {
      const index = this.cartItems.findIndex((item) => item.id === lessonId);
      if (index !== -1) {
        // Restore lesson space
        const lessonIndex = this.lessons.findIndex((l) => l.id === lessonId);
        if (lessonIndex !== -1) {
          this.lessons[lessonIndex].spaces++;
        }
        this.cartItems.splice(index, 1);
      }
    },
  },
};
</script>

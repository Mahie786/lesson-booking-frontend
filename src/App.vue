<template>
  <div id="app">
    <!-- Navigation component -->
    <nav-bar />
    <!-- Router view component - displays the component for the current route -->
    <router-view />
  </div>
</template>

<script>
// Import the NavBar component
import NavBar from "@/components/NavBar.vue";

export default {
  name: "App",
  components: {
    // Register the NavBar component for use in the template
    NavBar,
  },

  mounted() {
    // Initialize the cart when the app is mounted
    this.$store.dispatch("cart/initializeCart");
  },
  methods: {
    // Method to add a lesson to the cart
    addToCart(lesson) {
      // Add a copy of the lesson to the cart items
      this.cartItems.push({ ...lesson });
      // Update the available spaces for the lesson
      const lessonIndex = this.lessons.findIndex((l) => l.id === lesson.id);
      if (lessonIndex !== -1) {
        this.lessons[lessonIndex].spaces--;
      }
    },
    // Method to remove a lesson from the cart
    removeFromCart(lessonId) {
      // Find the index of the lesson in the cart
      const index = this.cartItems.findIndex((item) => item.id === lessonId);
      if (index !== -1) {
        // Restore the lesson space
        const lessonIndex = this.lessons.findIndex((l) => l.id === lessonId);
        if (lessonIndex !== -1) {
          this.lessons[lessonIndex].spaces++;
        }
        // Remove the lesson from the cart
        this.cartItems.splice(index, 1);
      }
    },
  },
};
</script>

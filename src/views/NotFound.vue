<template>
  <div class="not-found">
    <h2>404 - Page Not Found</h2>
    <p>The page you're looking for doesn't exist.</p>
    <router-link to="/" class="home-btn">Go Home</router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom">
    <div class="container">
      <!-- Brand -->
      <router-link class="navbar-brand fw-bold text-dark" to="/lessons">
        <i class="bi bi-book-half me-2"></i>
        Lesson Booking
      </router-link>

      <!-- Navbar toggler for mobile -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navbar links -->
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav align-items-center">
          <li class="nav-item">
            <router-link to="/lessons" class="nav-link" active-class="active fw-semibold">
              Lessons
            </router-link>
          </li>
          <li class="nav-item ms-lg-3">
            <router-link
              to="/cart"
              class="nav-link d-flex align-items-center"
              active-class="active fw-semibold"
            >
              <i class="bi bi-cart me-2"></i>
              Cart
              <span v-if="cartItemsCount > 0" class="badge bg-primary rounded-pill ms-2">
                {{ cartItemsCount }}
              </span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    cartItemsCount: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style scoped>
.navbar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.nav-link {
  color: #666;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #333;
}

.nav-link.active {
  color: #0d6efd !important;
}

.navbar-brand {
  color: #333;
  font-size: 1.4rem;
  transition: color 0.2s ease;
}

.navbar-brand:hover {
  color: #0d6efd;
  text-decoration: none;
}

/* Remove active background and keep brand styling consistent */
.navbar-brand.router-link-active {
  background: none;
  color: #333;
}

/* Adding some padding to ensure proper mobile display */
@media (max-width: 991.98px) {
  .nav-item {
    padding: 0.5rem 0;
  }

  .ms-lg-3 {
    margin-left: 0 !important;
  }
}
</style>

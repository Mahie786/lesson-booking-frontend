<template>
  <!-- Main navigation bar -->
  <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom">
    <div class="container">
      <!-- Brand logo and name -->
      <router-link class="navbar-brand fw-bold text-dark" to="/lessons">
        <i class="bi bi-book-half me-2"></i>
        School Lessons
      </router-link>

      <!-- Navbar toggler for mobile view -->
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

      <!-- Collapsible navbar content -->
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav align-items-center">
          <!-- Lessons link -->
          <li class="nav-item">
            <router-link to="/lessons" class="nav-link" active-class="active fw-semibold">
              Lessons
            </router-link>
          </li>
          <!-- Cart link with item count badge -->
          <li class="nav-item ms-lg-3">
            <router-link
              to="/cart"
              class="nav-link d-flex align-items-center"
              active-class="active fw-semibold"
            >
              <i class="bi bi-cart me-2"></i>
              Cart
              <!-- Badge showing cart item count -->
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
    // Prop to receive cart item count from parent component
    cartItemsCount: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style scoped>
/* Add subtle shadow to navbar */
.navbar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

/* Style navigation links */
.nav-link {
  color: #666;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #333;
}

/* Style active navigation link */
.nav-link.active {
  color: #0d6efd !important;
}

/* Style navbar brand */
.navbar-brand {
  color: #333;
  font-size: 1.4rem;
  transition: color 0.2s ease;
}

.navbar-brand:hover {
  color: #0d6efd;
  text-decoration: none;
}

/* Remove active background from brand link */
.navbar-brand.router-link-active {
  background: none;
  color: #333;
}

/* Responsive adjustments for mobile */
@media (max-width: 991.98px) {
  .nav-item {
    padding: 0.5rem 0;
  }

  .ms-lg-3 {
    margin-left: 0 !important;
  }
}
</style>

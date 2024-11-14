<template>
  <div class="checkout">
    <h2>Checkout</h2>
    <form @submit.prevent="processCheckout" class="checkout-form">
      <div class="form-group">
        <label>Name:</label>
        <input v-model="formData.name" type="text" required @input="validateName" />
      </div>
      <div class="form-group">
        <label>Phone:</label>
        <input v-model="formData.phone" type="tel" required @input="validatePhone" />
      </div>
      <button type="submit" :disabled="!isFormValid" class="submit-btn">
        Complete Order
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Checkout",
  data() {
    return {
      formData: {
        name: "",
        phone: "",
      },
    };
  },
  computed: {
    isFormValid() {
      return this.formData.name && this.formData.phone;
    },
  },
  methods: {
    validateName(event) {
      event.target.value = event.target.value.replace(/[^A-Za-z\s]/g, "");
    },
    validatePhone(event) {
      event.target.value = event.target.value.replace(/[^0-9]/g, "");
    },
    async processCheckout() {
      // Implementation
    },
  },
};
</script>

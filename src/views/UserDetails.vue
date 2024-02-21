<template>
  <div>
    <user-details :userId="userId"></user-details>
  </div>
</template>

<script>
import UserDetails from '@/components/UserDetails';

export default {
  components: {
    UserDetails,
  },
  data() {
    return {
      userId: null,
    };
  },
  watch: {
    $route(to) {
      this.userId = to.params.id;
    },
  },
  created() {
    this.userId = this.$route.params.id;
  },
};
</script>

<template>
    <div class="container ">
    
      <div class="row ">
        <div class="col-md-12 text-right">
          <button @click="showCreateForm" class="btn btn-primary mt-4 " style="margin-bottom:20px;border-radius: 10px; background: #1665c7;">Create User &nbsp;<i class="bi bi-person-plus-fill"></i></button>
        </div>
      </div>
  
      <div v-if="loading" class="text-center mt-4">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
  
      <div v-else class="row bg-light " style="border-radius:5px">
        <div v-for="user in users" :key="user.id" class="col-md-3 mb-4 " style="margin-top:15px">
          <div class="card d-flex flex-column h-100">
            <div class="row ">
              <div class="col"></div>
              <div class="col"></div>
              <div class="col">
                <button @click="deleteUser(user.id)" class="btn btn-link delete-icon">
                  <i class="bi bi-trash-fill"></i>
                </button>
              </div>
            </div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png" style="height:60px;width:60px" class="rounded mx-auto d-block" alt="...">
            <div class="card-body flex-grow-1 text-center">
              <h5 class="card-title">{{ user.name }}</h5>
              <p class="card-text">
                <strong>Email:</strong> {{ user.email }}
              </p>
            </div>
            <div class="card-footer text-end">
            <router-link v-if="!user.local" :to="{ name: 'UserDetails', params: { id: user.id } }" class="btn btn-primary btn-lg btn-block" style="font-size:14px;">
              View
            </router-link>

              <button @click="editUser(user)" class="btn btn-secondary btn-lg btn-block" style="font-size:14px;background:#060606">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      
  
      <!--modal for user form -->
      <div :class="{ 'modal fade': true, 'show': showBackdrop }" ref="userFormModal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ formAction === 'create' ? 'Create User' : 'Edit User' }}</h5>
              <button type="button" class="close" @click="closeUserFormModal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <user-form :user="selectedUser" :action="formAction" @submit="handleSubmit" />
            </div>
          </div>
        </div>
      </div>
  
      <!--modal for delete confirmation -->
      <div :class="{ 'modal': true, 'show': showBackdrop }" ref="deleteModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Confirm Delete</h5>
              <button type="button" class="close" @click="closeDeleteModal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Are you sure you want to delete this user?</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeDeleteModal">Cancel</button>
              <button @click="confirmDelete" type="button" class="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import UserForm from '@/components/UserForm';
  
  export default {
    data() {
      return {
        loading: false,
        showForm: false,
        selectedUser: {},
        formAction: 'create',
        users: [],
        userIdToDelete: null, // Track user ID for deletion
        showBackdrop: false, 
      };
    },
    mounted() {
      this.fetchUsers();
    },
    methods: {
      async fetchUsers() {
        try {
          this.loading = true;
          const response = await this.$axios.get('https://jsonplaceholder.typicode.com/users');
          this.users = response.data.map(user => ({ ...user, local: false }));
        } catch (error) {
          console.error('Error fetching users:', error);
        } finally {
          this.loading = false;
        }
      },

      editUser(user) {
        this.showForm = true;
        this.selectedUser = { ...user };
        this.formAction = 'update';
        this.openUserFormModal();
      },
      closeUserFormModal() {
        this.showBackdrop = false; 
        this.$refs.userFormModal.classList.remove('show');
        this.$refs.userFormModal.style.display = 'none';
      },
      openUserFormModal() {
        this.showBackdrop = true; 
        this.$refs.userFormModal.classList.add('show');
        this.$refs.userFormModal.style.display = 'block';
      },
      deleteUser(userId) {
        this.showBackdrop = true; 
        this.userIdToDelete = userId;
        this.$refs.deleteModal.classList.add('show');
        this.$refs.deleteModal.style.display = 'block';
      },

      async confirmDelete() {
        if (this.userIdToDelete) {
          await this.$axios.delete(`https://jsonplaceholder.typicode.com/users/${this.userIdToDelete}`);
          this.users = this.users.filter(user => user.id !== this.userIdToDelete);
          this.closeDeleteModal();
        }
      },
      closeDeleteModal() {
        this.showBackdrop = false; 
        this.$refs.deleteModal.classList.remove('show');
        this.$refs.deleteModal.style.display = 'none';
      },
      showCreateForm() {
        this.showForm = true;
        this.selectedUser = {};
        this.formAction = 'create';
        this.openUserFormModal();
      },
      
      async handleSubmit(userData, action) {
      try {
        if (action === 'create') {
          // Generate a new id based on local users
          const newId = this.users.length > 0 ? Math.max(...this.users.map(user => user.id)) + 1 : 1;

          // Add the new id and set local property
          const newUser = { ...userData, id: newId, local: true };

          // Update local data with the new user
          this.users.unshift(newUser);
        } else if (action === 'update') {
          // Update user locally
          const index = this.users.findIndex(u => u.id === userData.id);
          if (index !== -1) {
            this.users.splice(index, 1, userData);
          }
        }

        this.showForm = false;
        this.closeUserFormModal();
      } catch (error) {
        console.error('Error handling form submission:', error);
      }
    },

    },
    components: {
      UserForm,
    },
  };
  </script>
  
<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-16 px-4">
    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 right-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-300"></div>
      <div class="absolute bottom-1/3 left-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>
    </div>

    <div class="relative z-10 max-w-6xl mx-auto">
      <!-- Enhanced Header -->
      <div class="text-center mb-16">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 bg-clip-text text-transparent">
          My Projects
        </h1>
        <div class="flex items-center justify-center gap-3 mb-4">
          <div class="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
          <div class="w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
        </div>
        <p class="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Explore my collection of web development projects, built with modern technologies and best practices.
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-20">
        <div class="relative">
          <div class="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div class="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-600 rounded-full animate-spin animation-delay-150"></div>
        </div>
        <p class="mt-6 text-lg text-slate-600 animate-pulse">Loading amazing projects...</p>
      </div>

      <!-- No Projects State -->
      <div v-else-if="projects.length === 0" class="text-center py-20">
        <div class="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-white/20 max-w-2xl mx-auto">
          <div class="mb-8">
            <svg class="w-24 h-24 mx-auto text-slate-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
          </div>
          
          <h3 class="text-2xl font-bold text-slate-800 mb-4">No Projects Yet</h3>
          <p class="text-slate-600 text-lg leading-relaxed mb-8">
            The project showcase is currently empty. Check back soon for exciting new developments!
          </p>
          
          <div v-if="isAdmin" class="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
            <p class="text-blue-800 font-semibold mb-4">
              🚀 Admin Mode: Ready to add your first project?
            </p>
            <button
              @click="showNewProjectModal = true"
              class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold
                     hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300
                     shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              Create First Project
            </button>
          </div>
        </div>
      </div>

      <!-- Projects Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <div 
          v-for="(project, index) in projects" 
          :key="project.id"
          class="group bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl 
                 border border-white/20 overflow-hidden transition-all duration-500 transform hover:-translate-y-2"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <!-- Project Card -->
          <div class="relative">
            <!-- Project Image/Placeholder -->
            <div class="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 relative overflow-hidden">
              <img 
                v-if="project.screenshots && project.screenshots.length > 0"
                :src="project.screenshots[0].image" 
                :alt="project.name"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div v-else class="flex items-center justify-center h-full">
                <div class="text-center">
                  <svg class="w-16 h-16 mx-auto text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <p class="text-slate-500 font-medium">No Image</p>
                </div>
              </div>
              
              <!-- Overlay on hover -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div class="text-white">
                  <p class="text-sm font-medium">Click to explore</p>
                </div>
              </div>
            </div>

            <!-- Card Content -->
            <div class="p-6">
              <div class="flex items-start justify-between mb-4">
                <h3 class="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                  {{ project.name }}
                </h3>
                
                <!-- Admin Actions -->
                <div v-if="isAdmin" class="flex items-center gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    @click.stop="$emit('edit-project', project)"
                    class="w-8 h-8 bg-yellow-100 hover:bg-yellow-200 text-yellow-600 rounded-lg flex items-center justify-center transition-colors duration-200"
                    title="Edit Project"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button
                    @click.stop="deleteProject(project.id)"
                    class="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg flex items-center justify-center transition-colors duration-200"
                    title="Delete Project"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Tech Stack -->
              <div v-if="project.tech_stack" class="mb-4">
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="tech in project.tech_stack.split(',')" 
                    :key="tech"
                    class="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full hover:bg-blue-200 transition-colors"
                  >
                    {{ tech.trim() }}
                  </span>
                </div>
              </div>

              <!-- Description Preview -->
              <p v-if="project.description" class="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                {{ project.description }}
              </p>

              <!-- Action Button -->
              <router-link
                :to="`/projects/${project.id}`"
                class="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold text-sm
                       hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300
                       shadow-lg hover:shadow-xl group"
              >
                View Details
                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Add Project Button -->
      <div v-if="isAdmin && projects.length > 0" class="text-center mt-16">
        <button
          @click="showNewProjectModal = true"
          class="group bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg
                 hover:from-emerald-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-300
                 shadow-xl hover:shadow-2xl flex items-center gap-3 mx-auto"
        >
          <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
          </div>
          Add New Project
        </button>
      </div>
    </div>

    <!-- Enhanced New Project Modal -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <NewProjectModal
        v-if="showNewProjectModal"
        :isVisible="showNewProjectModal"
        @close="showNewProjectModal = false"
        @created="handleProjectCreated"
      />
    </transition>
  </div>
</template>

<script>
import axios from 'axios'
import { useAuth } from '../composables/useAuth'
import NewProjectModal from './NewProjectModal.vue'

export default {
  name: 'ProjectList',
  components: { NewProjectModal },
  setup() {
    const { isAdmin } = useAuth()
    return { isAdmin }
  },
  data() {
    return {
      projects: [],
      loading: true,
      showNewProjectModal: false
    }
  },
  mounted() {
    this.fetchProjects()
    window.addEventListener('projects:refresh', this.fetchProjects)
  },
  beforeUnmount() {
    window.removeEventListener('projects:refresh', this.fetchProjects)
  },
  methods: {
    fetchProjects() {
      this.loading = true
axios.get(`${import.meta.env.VITE_API_URL}/projects`)
.then(response => {
          this.projects = response.data
        })
        .catch(error => {
          console.error('Error fetching projects:', error)
          this.showErrorNotification('Failed to load projects. Please try again later.')
        })
        .finally(() => {
          this.loading = false
        })
    },
    deleteProject(id) {
      const token = localStorage.getItem('admin_token')
      if (!token) {
        this.showErrorNotification('Unauthorized access.')
        return
      }

      // Enhanced confirmation dialog
      if (!confirm('⚠️ Are you sure you want to delete this project?\n\nThis action cannot be undone.')) {
        return
      }

axios.delete(`${import.meta.env.VITE_API_URL}/projects/${id}`, {
    headers: { 'X-ADMIN-TOKEN': token }
  })

        .then(() => {
          this.projects = this.projects.filter(p => p.id !== id)
          this.showSuccessNotification('Project deleted successfully!')
          window.dispatchEvent(new Event('projects:refresh'))
        })
        .catch(err => {
          console.error('Delete error:', err)
          this.showErrorNotification('Error deleting project. Please try again.')
        })
    },
    handleProjectCreated() {
      this.showNewProjectModal = false
      this.fetchProjects()
      this.showSuccessNotification('Project created successfully!')
    },
    showSuccessNotification(message) {
      // You can implement a toast notification system here
      console.log('Success:', message)
    },
    showErrorNotification(message) {
      // You can implement a toast notification system here
      console.error('Error:', message)
      alert(message) // Temporary fallback
    }
  }
}
</script>

<style scoped>
/* Line clamp utilities */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Animation delays */
.animation-delay-150 {
  animation-delay: 150ms;
}

/* Custom hover effects */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:translate-x-1 {
  transform: translateX(0.25rem);
}

.group:hover .group-hover\:rotate-90 {
  transform: rotate(90deg);
}

/* Enhanced loading animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Card entrance animation */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.grid > div {
  animation: slideInUp 0.6s ease-out forwards;
}

/* Smooth transitions for all interactive elements */
* {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
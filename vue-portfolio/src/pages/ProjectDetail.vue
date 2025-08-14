<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
    <div class="p-6 max-w-5xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20">
      <!-- Back Button -->
      <button
        @click="$router.push('/')"
        class="group flex items-center gap-2 text-sm text-slate-600 mb-8 hover:text-blue-600 transition-all duration-200 hover:translate-x-1"
      >
        <svg class="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        Back to Projects
      </button>

      <div v-if="project" class="space-y-8">
        <!-- Project Header -->
        <div class="text-center space-y-4">
          <h1 class="text-4xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent">
            {{ project.name }}
          </h1>
          
          <!-- Tech Stack with modern pill design -->
          <div class="space-y-3">
            <label class="block text-sm font-semibold text-slate-700">Tech Stack</label>
            <div class="flex flex-wrap justify-center gap-2 min-h-[2.5rem] items-center">
              <template v-if="project.tech_stack">
                <span
                  v-for="tech in techStackArray"
                  :key="tech"
                  class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200 shadow-sm"
                >
                  {{ tech }}
                </span>
              </template>
              <span v-else class="text-slate-400 italic">No tech stack specified</span>
              
              <template v-if="isAdmin">
                <button 
                  v-if="!project.tech_stack" 
                  @click="startEdit('tech_stack')" 
                  class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 transition-all duration-200 hover:scale-110"
                  title="Add tech stack"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                  </svg>
                </button>
                <button 
                  v-else 
                  @click="startEdit('tech_stack')" 
                  class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-600 transition-all duration-200 hover:scale-110"
                  title="Edit tech stack"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>
                <button 
                  v-if="project.tech_stack" 
                  @click="updateField('tech_stack', '')" 
                  class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 text-red-600 transition-all duration-200 hover:scale-110"
                  title="Remove tech stack"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </template>
            </div>
            
            <div v-if="editingField === 'tech_stack'" class="flex items-center gap-3 mt-4 max-w-md mx-auto">
              <input
                v-model="editValue"
                @keyup.enter="saveEdit('tech_stack')"
                class="flex-1 border-2 border-blue-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 p-3 rounded-xl transition-all duration-200 text-sm"
                placeholder="e.g., Vue.js, Node.js, MongoDB"
              />
              <button 
                @click="saveEdit('tech_stack')" 
                class="flex items-center justify-center w-10 h-10 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all duration-200 hover:scale-105"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Enhanced Carousel -->
       <!-- Enhanced Carousel - Only show if screenshots exist -->
        <div v-if="project.screenshots?.length" class="space-y-6">
          <div class="relative group">
            <div class="rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-100 to-slate-200 p-1">
              <div class="rounded-xl overflow-hidden">
                <img
                  :src="currentSlide.image"
                  :alt="project.name"
                  class="w-full max-h-[500px] object-cover transition-all duration-500 hover:scale-[1.02]"
                />
              </div>
            </div>
            
            <!-- Navigation Arrows -->
            <button 
              @click="prevSlide" 
              class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
            >
              <svg class="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <button 
              @click="nextSlide" 
              class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
            >
              <svg class="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          <!-- Caption -->
          <div class="text-center space-y-3">
            <div class="flex items-center justify-center gap-3">
              <p class="text-slate-600 italic max-w-2xl">
                {{ currentSlide.caption || 'No caption provided' }}
              </p>
              <template v-if="isAdmin">
                <button 
                  @click="startSlideCaptionEdit" 
                  class="w-8 h-8 bg-amber-50 hover:bg-amber-100 text-amber-600 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>
                <button 
                  @click="deleteSlide(currentSlideIndex)" 
                  class="w-8 h-8 bg-red-50 hover:bg-red-100 text-red-600 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </template>
            </div>

            <div v-if="editingSlideCaption" class="flex justify-center gap-3 max-w-2xl mx-auto">
              <input
                v-model="editValue"
                @keyup.enter="saveSlideCaption"
                class="flex-1 border-2 border-blue-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 p-3 rounded-xl transition-all duration-200"
                placeholder="Enter a descriptive caption"
              />
              <button 
                @click="saveSlideCaption" 
                class="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all duration-200 hover:scale-105"
              >
                <svg class="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Slide Indicators -->
          <div class="flex justify-center gap-3">
            <button
              v-for="(slide, index) in project.screenshots"
              :key="index"
              class="w-3 h-3 rounded-full transition-all duration-300 hover:scale-125"
              :class="{
                'bg-blue-500 shadow-lg': index === currentSlideIndex,
                'bg-slate-300 hover:bg-slate-400': index !== currentSlideIndex
              }"
              @click="currentSlideIndex = index"
            />
          </div>

          <!-- Reorder Slides for Admin (only show if screenshots exist) -->
          <div v-if="isAdmin" class="bg-slate-50 rounded-2xl p-6">
            <h3 class="font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
              Reorder Slides
            </h3>
            <div class="space-y-2">
              <div
                v-for="(slide, index) in project.screenshots"
                :key="index"
                draggable="true"
                @dragstart="onDragStart(index)"
                @dragover.prevent
                @drop="onDrop(index)"
                class="p-4 bg-white border-2 border-slate-200 hover:border-blue-300 rounded-xl cursor-move transition-all duration-200 hover:shadow-md"
              >
                <div class="flex items-center gap-3">
                  <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                  </svg>
                  <span class="font-medium text-slate-700">{{ index + 1 }}.</span>
                  <span class="text-slate-600">{{ slide.caption || 'No caption' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Show message when no screenshots exist -->
        <div v-else-if="!isAdmin" class="bg-slate-50 rounded-2xl p-8 text-center">
          <svg class="w-12 h-12 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          <p class="text-slate-500 text-lg">No screenshots available yet</p>
        </div>

        <!-- Add New Slide - MOVED OUTSIDE carousel, always visible to admin -->
        <div v-if="isAdmin" class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
          <h3 class="font-semibold text-slate-700 mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Add New Slide
          </h3>
          <div class="space-y-4">
            <div class="relative">
              <input
                ref="fileInput"
                type="file"
                @change="handleImageUpload"
                accept="image/*"
                class="w-full p-4 border-2 border-dashed border-blue-300 hover:border-blue-400 rounded-xl bg-white/50 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-500 file:text-white file:cursor-pointer hover:file:bg-blue-600"
              />
            </div>
            <input 
              type="text" 
              v-model="newSlide.caption" 
              placeholder="Add a caption for this image" 
              class="w-full p-4 border-2 border-blue-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 rounded-xl transition-all duration-200 bg-white/70"
            />
            <button 
              @click="addSlide" 
              class="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              Add Slide
            </button>
          </div>
        </div>
        
        <!-- Description Section -->
        <div class="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div class="flex items-start gap-4">
            <div class="flex-1">
              <label class="block text-lg font-semibold text-slate-700 mb-3">Description</label>
              <div class="prose prose-slate max-w-none">
                <p class="text-slate-600 whitespace-pre-line leading-relaxed">
                  {{ project.description || 'No description provided yet.' }}
                </p>
              </div>
            </div>
            <template v-if="isAdmin">
              <div class="flex gap-2">
                <button 
                  v-if="!project.description" 
                  @click="startEdit('description')" 
                  class="w-10 h-10 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl transition-all duration-200 hover:scale-110"
                >
                  <svg class="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                  </svg>
                </button>
                <button 
                  v-else 
                  @click="startEdit('description')" 
                  class="w-10 h-10 bg-amber-50 hover:bg-amber-100 text-amber-600 rounded-xl transition-all duration-200 hover:scale-110"
                >
                  <svg class="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>
                <button 
                  v-if="project.description" 
                  @click="updateField('description', '')" 
                  class="w-10 h-10 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all duration-200 hover:scale-110"
                >
                  <svg class="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </template>
          </div>
          
          <div v-if="editingField === 'description'" class="mt-4 space-y-3">
            <textarea
              v-model="editValue"
              @keyup.ctrl.enter="saveEdit('description')"
              class="w-full border-2 border-blue-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 p-4 rounded-xl transition-all duration-200 min-h-[120px] resize-y"
              placeholder="Describe your project in detail..."
            ></textarea>
            <div class="flex justify-end">
              <button 
                @click="saveEdit('description')" 
                class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105 flex items-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                Save Description
              </button>
            </div>
          </div>
        </div>

        <!-- Links Section -->
        <div class="grid md:grid-cols-2 gap-6">
          <!-- GitHub Link -->
          <div class="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 border border-slate-200">
            <div class="flex items-center justify-between mb-4">
              <label class="text-lg font-semibold text-slate-700 flex items-center gap-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub Repository
              </label>
              <template v-if="isAdmin">
                <div class="flex gap-2">
                  <button 
                    v-if="!project.github_link" 
                    @click="startEdit('github_link')" 
                    class="w-8 h-8 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-all duration-200 hover:scale-110"
                  >
                    <svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                    </svg>
                  </button>
                  <button 
                    v-else 
                    @click="startEdit('github_link')" 
                    class="w-8 h-8 bg-amber-50 hover:bg-amber-100 text-amber-600 rounded-lg transition-all duration-200 hover:scale-110"
                  >
                    <svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </button>
                  <button 
                    v-if="project.github_link" 
                    @click="updateField('github_link', '')" 
                    class="w-8 h-8 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all duration-200 hover:scale-110"
                  >
                    <svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
              </template>
            </div>
            
            <div v-if="project.github_link">
              <a 
                :href="project.github_link" 
                target="_blank" 
                class="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
                View Source Code
              </a>
            </div>
            <div v-else>
              <p class="text-slate-500 italic">No GitHub link provided</p>
            </div>

            <div v-if="editingField === 'github_link'" class="mt-4 space-y-3">
              <input 
                v-model="editValue" 
                @keyup.enter="saveEdit('github_link')" 
                class="w-full border-2 border-blue-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 p-3 rounded-xl transition-all duration-200" 
                placeholder="https://github.com/username/repository"
              />
              <div class="flex justify-end">
                <button 
                  @click="saveEdit('github_link')" 
                  class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
                >
                  Save Link
                </button>
              </div>
            </div>
          </div>

          <!-- Demo Link -->
          <div class="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-6 border border-green-200">
            <div class="flex items-center justify-between mb-4">
              <label class="text-lg font-semibold text-slate-700 flex items-center gap-2">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                </svg>
                Live Demo
              </label>
              <template v-if="isAdmin">
                <div class="flex gap-2">
                  <button 
                    v-if="!project.demo_link" 
                    @click="startEdit('demo_link')" 
                    class="w-8 h-8 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-all duration-200 hover:scale-110"
                  >
                    <svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                    </svg>
                  </button>
                  <button 
                    v-else 
                    @click="startEdit('demo_link')" 
                    class="w-8 h-8 bg-amber-50 hover:bg-amber-100 text-amber-600 rounded-lg transition-all duration-200 hover:scale-110"
                  >
                    <svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </button>
                  <button 
                    v-if="project.demo_link" 
                    @click="updateField('demo_link', '')" 
                    class="w-8 h-8 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all duration-200 hover:scale-110"
                  >
                    <svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
              </template>
            </div>
            
            <div v-if="project.demo_link">
              <a 
                :href="project.demo_link" 
                target="_blank" 
                class="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
                Launch Demo
              </a>
            </div>
            <div v-else>
              <p class="text-slate-500 italic">No demo link provided</p>
            </div>

            <div v-if="editingField === 'demo_link'" class="mt-4 space-y-3">
              <input 
                v-model="editValue" 
                @keyup.enter="saveEdit('demo_link')" 
                class="w-full border-2 border-green-200 focus:border-green-400 focus:ring-4 focus:ring-green-100 p-3 rounded-xl transition-all duration-200" 
                placeholder="https://your-demo-site.com"
              />
              <div class="flex justify-end">
                <button 
                  @click="saveEdit('demo_link')" 
                  class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
                >
                  Save Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="flex items-center justify-center min-h-[400px]">
        <div class="text-center space-y-4">
          <div class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p class="text-slate-500 text-lg">Loading project details...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { useAuth } from '../composables/useAuth'

export default {
  data() {
    return {
      project: null,
      currentSlideIndex: 0,
      editingField: null,
      editValue: '',
      editingSlideCaption: false,
      newSlide: { image: '', caption: '' },
      dragStartIndex: null
    }
  },
  computed: {
    currentSlide() {
      return this.project?.screenshots?.[this.currentSlideIndex] || { image: '', caption: '' }
    },
    isAdmin() {
      const { isAdmin } = useAuth()
      return isAdmin.value
    },
    techStackArray() {
      if (!this.project?.tech_stack) return []
      return this.project.tech_stack
        .split(',')
        .map(tech => tech.trim())
        .filter(tech => tech.length > 0)
    }
  },
  methods: {
    // URL validation with TLD
    validateURL(url) {
      const regex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/
      return regex.test(url)
    },
    nextSlide() {
      if (this.project?.screenshots?.length) {
        this.currentSlideIndex = (this.currentSlideIndex + 1) % this.project.screenshots.length
      }
    },
    prevSlide() {
      if (this.project?.screenshots?.length) {
        this.currentSlideIndex = (this.currentSlideIndex - 1 + this.project.screenshots.length) % this.project.screenshots.length
      }
    },
    startEdit(field) {
      this.editingField = field
      this.editValue = this.project[field] || ''
    },
    saveEdit(field) {
      if (['github_link', 'demo_link'].includes(field) && this.editValue && !this.validateURL(this.editValue)) {
        alert('Please enter a valid URL with a domain (e.g., https://example.com)')
        return
      }
      this.updateField(field, this.editValue)
      this.editingField = null
    },
    updateField(field, value) {
      axios.put(`${import.meta.env.VITE_API_URL}/projects/${this.project.id}`, { [field]: value })
        .then(() => {
          this.project[field] = value
        })
        .catch(err => console.error(`Failed to update ${field}:`, err))
    },
    startSlideCaptionEdit() {
      this.editingSlideCaption = true
      this.editValue = this.currentSlide.caption || ''
    },
    saveSlideCaption() {
      const slides = [...this.project.screenshots]
      slides[this.currentSlideIndex].caption = this.editValue
      axios.put(`${import.meta.env.VITE_API_URL}/projects/${this.project.id}`, { screenshots: slides })
        .then(() => {
          this.project.screenshots = slides
          this.editingSlideCaption = false
        })
        .catch(err => console.error('Failed to update caption:', err))
    },
    deleteSlide(index) {
      if (!confirm('Are you sure you want to delete this slide?')) return
      const updatedSlides = this.project.screenshots.filter((_, i) => i !== index)
      axios.put(`${import.meta.env.VITE_API_URL}/projects/${this.project.id}`, { screenshots: updatedSlides })
        .then(() => {
          this.project.screenshots = updatedSlides
          this.currentSlideIndex = Math.min(this.currentSlideIndex, updatedSlides.length - 1)
        })
        .catch(err => console.error('Failed to delete slide:', err))
    },
    handleImageUpload(e) {
      const file = e.target.files[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = () => {
        this.newSlide.image = reader.result
      }
      reader.readAsDataURL(file)
    },
    addSlide() {
      if (!this.newSlide.image) {
        alert('Please select an image to upload')
        return
      }
      const updatedSlides = [...(this.project.screenshots || []), { ...this.newSlide }]
      axios.put(`${import.meta.env.VITE_API_URL}/projects/${this.project.id}`, { screenshots: updatedSlides })
        .then(() => {
          this.project.screenshots = updatedSlides
          this.newSlide = { image: '', caption: '' }
          // Show the newly added slide immediately
          this.currentSlideIndex = updatedSlides.length - 1
          // Clear file input value to allow re-upload same file if needed
          this.$refs.fileInput.value = ''
        })
        .catch(err => console.error('Failed to add slide:', err))
    },
    // Drag-and-drop reorder
    onDragStart(index) {
      this.dragStartIndex = index
    },
    onDrop(dropIndex) {
      const slides = [...this.project.screenshots]
      const [movedSlide] = slides.splice(this.dragStartIndex, 1)
      slides.splice(dropIndex, 0, movedSlide)
      this.dragStartIndex = null
      axios.put(`${import.meta.env.VITE_API_URL}/projects/${this.project.id}`, { screenshots: slides })
        .then(() => {
          this.project.screenshots = slides
          // Adjust currentSlideIndex if needed
          if (this.currentSlideIndex === this.dragStartIndex) {
            this.currentSlideIndex = dropIndex
          }
        })
        .catch(err => console.error('Failed to reorder slides:', err))
    }
  },
  mounted() {
    const projectId = this.$route.params.id
    axios.get(`${import.meta.env.VITE_API_URL}/projects/${projectId}`)
      .then(res => {
        this.project = res.data
        this.currentSlideIndex = 0
      })
      .catch(err => console.error('Error fetching project:', err))
  }
}
</script>
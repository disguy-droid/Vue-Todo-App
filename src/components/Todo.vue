<script setup>
import { computed, onMounted, ref } from "vue";
import anime from "animejs";

const newTodo = ref("");
const updatedTodo = ref("");
const todos = ref([]);

const isEmpty = computed(() => {
  if (todos.value.length === 0) {
    return true;
  } else {
    return false;
  }
});

// SOLVE THIS PROBLEM 👀 `https://www.youtube.com/watch?v=GGeiCpV_6qg&t=1489s`
function toggleComplete(id) {
  const todo = todos.value.find((todo) => todo.id === id);
  todo.isCompleted = !todo.isCompleted;
}

function addNewTodos() {
  if (newTodo.value.trim()) {
    todos.value.push({
      id: todos.value.length + 1,
      title: newTodo.value,
      isCompleted: false,
      isEdit: false,
    });
  }
  newTodo.value = "";
}

function cancelAddTodo() {
  newTodo.value = "";
}

function removeTodos(id) {
  for (let todoEl = 0; todoEl < todos.value.length; todoEl++) {
    const todoID = todos.value[todoEl];

    if (todoID.id === id) {
      todos.value.splice(todoEl, 1);
    }
  }
}

//  TODO EDIT
function editTodo(id) {
  const todoItems = todos.value.filter((todoEl) => {
    if (todoEl.id == id) {
      todoEl.isEdit = !todoEl.isEdit;
    }
  });
}

// TODO UPDATE
function updateTodo(id) {
  const tobeUpdatedTodos = todos.value.filter((tobeUpdateTodo) => {
    if (tobeUpdateTodo.id === id && updatedTodo.value.trim()) {
      tobeUpdateTodo.title = updatedTodo.value;
      tobeUpdateTodo.isEdit = false;
      updatedTodo.value = "";
    }
  });
}

// TODO EDIT CANCEL
function cancelEdit(id) {
  const tobeCancelTodos = todos.value.filter((tobeCancelTodo) => {
    if (tobeCancelTodo.id === id) {
      updatedTodo.value = "";
      tobeCancelTodo.isEdit = false;
    }
  });
}

onMounted(() => {
  const logos = document.querySelectorAll("#logo");

  logos.forEach((logo) => {
    logo.addEventListener("mouseenter", () => {
      anime.remove(logo);
      anime({
        targets: logo,
        scale: 0.88,
        borderRadius: ["15%", "100%"],
        duration: 200,
        easing: "easeInOutQuad",
      });
    });

    logo.addEventListener("mouseleave", () => {
      anime.remove(logo);
      anime({
        targets: logo,
        scale: 1,
        borderRadius: ["100%", "15%"],
        duration: 200,
        easing: "easeInOutQuad",
      });
    });
  });
});
</script>

<template>
  <div class="">
    <div class="w-11/12 min-h-full mx-auto py-12 flex flex-col">
      <div
        class="w-10/12 mx-auto flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8"
      >
        <input
          @keyup.esc="cancelAddTodo"
          @keyup.enter="addNewTodos"
          tabindex="0"
          v-model="newTodo"
          type="text"
          name="todoInput"
          id="todoInput"
          class="w-10/12 md:w-1/2 rounded-md px-4 py-4 font-sourceCodePro text-base appearance-none border-dark/40 text-dark"
          placeholder="!Add Todos..."
        />
        <button
          @click="addNewTodos"
          class="bg-dark/90 hover:bg-dark px-4 py-3 font-sourceCodePro font-bold text-light rounded-md text-base"
        >
          Add Todo
        </button>
      </div>

      <div
        v-if="isEmpty"
        class="select-none text-center mt-20 text-sm md:text-xl font-sourceCodePro font-bold text-dark/50"
      >
        There is no todos currently.
      </div>

      <div>
        <div
          class="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-12 w-11/12 md:w-9/12 mx-auto"
        >
          <!-- CARDS -->
          <transition-group name="fade">
            <div
              v-for="todo in todos"
              :key="todo.id"
              :class="{
                'grayscale bg-gray-200': todo.isCompleted,
                'grayscale-0 bg-light': !todo.isCompleted,
              }"
              class="w-full h-full border border-dark/10 shadow-md hover:shadow-lg px-4 md:px-6 lg:px-8 py-8 font-sourceCodePro rounded-md flex flex-col justify-between transition-all ease-linear duration-100"
            >
              <input
                @keyup.esc="cancelEdit(todo.id)"
                tabindex="0"
                @keyup.enter="updateTodo(todo.id)"
                v-if="todo.isEdit"
                type="text"
                name="updateTodo"
                id="updateTodo"
                class="w-10/12 md:w-full rounded-md px-4 py-2 font-sourceCodePro text-base appearance-none font-medium border-dark/20 text-dark"
                v-model="updatedTodo"
              />

              <p v-if="!todo.isEdit" class="font-medium text-dark text-lg">
                {{ todo.title }}
              </p>
              <div class="mt-12 flex justify-between items-center space-x-4">
                <div>
                  <span v-if="!todo.isCompleted" class="text-sm text-dark/80"
                    >Not Completed</span
                  >
                  <span v-if="todo.isCompleted" class="text-sm text-dark/80"
                    >Completed</span
                  >
                </div>

                <!-- EDIT ICONS -->
                <div
                  v-if="todo.isEdit"
                  class="flex justify-between items-center space-x-4 select-none"
                >
                  <!-- CHECK -->
                  <div
                    id="logo"
                    @click="updateTodo(todo.id)"
                    class="w-8 h-8 bg-dark/90 hover:bg-dark flex justify-center items-center rounded-md cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      class="bi bi-check-lg w-4 h-4 text-light"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"
                      />
                    </svg>
                  </div>

                  <!-- CROSS -->
                  <div
                    id="logo"
                    @click="cancelEdit(todo.id)"
                    class="w-8 h-8 bg-dark/90 hover:bg-dark flex justify-center items-center rounded-md cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      class="bi bi-x-lg w-4 h-4 text-light"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
                      />
                    </svg>
                  </div>
                </div>
                <!-- NORMAL ICONS -->
                <div
                  v-if="!todo.isEdit"
                  class="flex justify-between items-center space-x-4 select-none"
                >
                  <!-- EDIT -->
                  <div
                    id="logo"
                    v-if="!todo.isCompleted"
                    @click="editTodo(todo.id)"
                    class="w-8 h-8 bg-dark/90 hover:bg-dark flex justify-center items-center rounded-md cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      class="bi bi-pencil w-4 h-4 text-light"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
                      />
                    </svg>
                  </div>
                  <!-- CHECK  -->
                  <div
                    id="logo"
                    @click="toggleComplete(todo.id)"
                    class="w-8 h-8 bg-dark/90 hover:bg-dark flex justify-center items-center rounded-md cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      class="bi bi-check-lg w-4 h-4 text-light"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"
                      />
                    </svg>
                  </div>

                  <!-- CROSS -->
                  <div
                    id="logo"
                    @click="removeTodos(todo.id)"
                    class="w-8 h-8 bg-dark/90 hover:bg-dark flex justify-center items-center rounded-md cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      class="bi bi-x-lg w-4 h-4 text-light"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
                      />
                    </svg>
                  </div>
                </div>
              </div></div
          ></transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

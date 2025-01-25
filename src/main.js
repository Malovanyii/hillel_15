import "./styles.scss";

document.addEventListener("DOMContentLoaded", () => {
	const form = document.querySelector(".js--form");
	const input = document.querySelector(".js--form__input");
	const todosWrapper = document.querySelector(".js--todos-wrapper");

	const todos = JSON.parse(localStorage.getItem("todos")) || [];

	function saveTodos() {
		localStorage.setItem("todos", JSON.stringify(todos));
	}

	function renderTodos() {
		todosWrapper.innerHTML = "";
		todos.forEach((todo, index) => {
			const li = document.createElement("li");
			li.classList.add("todo-item");
			if (todo.checked) {
				li.classList.add("todo-item--checked");
			}

			li.innerHTML = `
				<input type="checkbox" ${todo.checked ? "checked" : ""} data-index="${index}" />
				<span class="todo-item__description">${todo.text}</span>
				<button class="todo-item__delete" data-index="${index}">Видалити</button>
			`;

			todosWrapper.appendChild(li);
		});
	}

	form.addEventListener("submit", (e) => {
		e.preventDefault();
		const todoText = input.value;
		if (todoText) {
			todos.push({ text: todoText, checked: false });
			saveTodos();
			renderTodos();
			input.value = "";
		}
	});

	todosWrapper.addEventListener("change", (e) => {
		if (e.target.type === "checkbox") {
			const index = e.target.dataset.index;
			todos[index].checked = e.target.checked;
			saveTodos();
			renderTodos();
		}
	});

	todosWrapper.addEventListener("click", (e) => {
		if (e.target.classList.contains("todo-item__delete")) {
			const index = e.target.dataset.index;
			todos.splice(index, 1);
			saveTodos();
			renderTodos();
		}
	});

	renderTodos();
});

// Создаем функцию, которая фетчит данные пользователя по url
// fetch('https://dummyjson.com/users/1')
// динамчески подставляем id

// Написать запрос в нем же запрос, который будет фетчить посты этого пользователя fetch('https://dummyjson.com/posts/user/5')

// Обернуть два запроса в Promise.all

// Добавляем блок try catch в функции

// В блоке try для каждого ответа проверяем статус ok

// если статус не ok, то выбрасываем исключение “Пользователя с таким id нет”
// Ловим это исключение в блоке catch и отображаем на странице

// Получаем результат ответов, деструктурируем и получаем переменные fistName, email, posts (по желанию можно больше)

// Передаем их в колбекфункцию

// Пишем функцию по отрисовке данных

// Отображаем на странице fistName, email пользователя

// Посты - массив объектов, проходимся по ним методом forEach и отрисовываем данные
let currentUserId = parseInt(localStorage.getItem('currentUserId')) || 1;

const root = document.createElement('div');
document.body.append(root);

const showUserAndPost = (firstName, email, posts) => {
root.innerHTML = "";

  const container = document.createElement("div");
  root.append(container);

  const userName = document.createElement("h3");
  userName.innerText = firstName;
  container.append(userName);

  const emailUser = document.createElement("p");
  emailUser.innerText = email;
  container.append(emailUser);

  posts.forEach((value) => {
    const postBody = document.createElement("p");
    postBody.innerText = value.body;
    container.append(postBody);
  });
};

async function fetchUser(id, callback) {
  try {
    const [response, responseUser] = await Promise.all([
      fetch(`https://dummyjson.com/users/${id}`),
      fetch(`https://dummyjson.com/posts/user/${id}`),
    ]);

    if (!response.ok) throw new Error(`User ${id} not found`);
    if (!responseUser.ok) throw new Error(`User ${id} not found`);

    const { firstName, email } = await response.json();

    const { posts } = await responseUser.json();

    callback(firstName, email, posts);
  
  } catch (error) {
    console.log(error);
    const errorElement = document.createElement("h3");
    errorElement.innerText = error.message;
    document.body.append(errorElement);
  }
}
fetchUser(currentUserId, (firstName, email, posts) =>
  showUserAndPost(firstName, email, posts)
);
// fetchUser(5, (firstName, email, posts) =>
//   showUserAndPost(firstName, email, posts)
// );



function buttons (){
    const container = document.createElement("div");
    document.body.append(container);

    const preBtn = document.createElement('button');
    preBtn.textContent = 'Previous';
    container.append(preBtn);

    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next';
    container.append(nextBtn);

    nextBtn.addEventListener('click', async () => {
        currentUserId++;
        localStorage.setItem('currentUserId', currentUserId);
        fetchUser(currentUserId, (firstName, email, posts) =>
        showUserAndPost(firstName, email, posts)
      );
      });
    
      preBtn.addEventListener('click', async () => {
        if (currentUserId > 1) {
          currentUserId--;
        localStorage.setItem('currentUserId', currentUserId);
          fetchUser(currentUserId, (firstName, email, posts) =>
  showUserAndPost(firstName, email, posts)
);
        }
    })
}
buttons()

//  Создаем функцию, которая отрисовывает кнопку  вперед(следующий пользователь) навешивает на нее событие (createElement, textContent, id, addEventListener) вешаем на root

// Повторяем для кнопки назад (предыдущий пользователь)

// Создаем функции которые вызывают пользователя с новым id

// Сохраняем при запросе нового пользователя его id в LocalStorage

//  При загрузке страницы получает id пользователя из LS и вызываем функцию с ним


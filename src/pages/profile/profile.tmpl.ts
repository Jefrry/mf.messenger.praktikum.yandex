const template = `<a href="../chat/" class="back-area d-flex flex-column justify-center align-center pointer">
                  <div class="icon d-flex justify-center align-center">
                      <i class="fas fa-arrow-left"></i>
                  </div>
                  </a>
                  <div class="profile d-flex flex-column justify-center align-center">
                  <div class="profile-avatar d-flex flex-column justify-center align-center">
                      <div class="avatar d-flex justify-center align-center mt-1 mr-2">
                          <i class="fas fa-user-alt"></i>
                          <div class="avatar_hover d-flex justify-center align-center pointer">Поменять аватар</div>
                      </div>
                      <span class="name mt-3">Name</span>
                  </div>

                  <ul class="profile-buttons d-flex flex-column mt-10">
                      <li class="profile-buttons__item relative d-flex mt-5 pointer">
                          <button class="link">Изменить данные</button>
                      </li>
                      <li class="profile-buttons__item relative d-flex mt-5 pointer">
                          <button class="link">Изменить пароль</button>
                      </li>
                      <li class="profile-buttons__item relative d-flex mt-5 pointer">
                          <button class="logout">Выйти</button>
                      </li>
                  </ul>
                  </div>`

export {template}
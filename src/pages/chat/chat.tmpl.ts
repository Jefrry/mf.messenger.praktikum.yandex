const template = `<div class="chats d-flex flex-column">
                  <a href="./#/profile" class="chats-header text-right pointer mt-5 px-2">Профиль ></a>
                  <div class="chats-search px-2">
                      
                  </div>
                  <ul class="chats-list d-flex flex-column mt-5">
                      
                  </ul>
                  </div>
                  <div class="messages messages_empty d-flex justify-center align-center">
                  <span class="messages_empty__text">Выберите чат чтобы отправить сообщения</span>
                  </div>
                  <div class="messages messages-chat d-flex flex-column justify-space-between d-none">
                  <header class="messages-header relative d-flex justify-start align-center mx-5 my-4">
                      
                      <div class="avatar d-flex justify-center align-center mr-4">
                          <i class="fas fa-user-alt"></i>
                      </div>
                      <span class="name">Name</span>
                      <button class="info" id="user-info">
                          <i class="fas fa-ellipsis-v"></i>
                      </button>
                  </header>
                  <div class="messages-area d-flex flex-column justify-end mx-5">
                      <span class="date align-self-center my-4">19 июня</span>
                      
                  </div>
                  <div class="messages-controls relative d-flex justify-space-between align-center mx-5 my-4">
                      
                      <button class="clip mr-4" id="clip">
                          <i class="fas fa-paperclip"></i>
                      </button>
                      

                      <button class="send d-flex justify-center align-center ml-4 pa-2">
                          <i class="fas fa-arrow-right"></i>
                      </button>
                  </div>
                  </div>`

export {template}
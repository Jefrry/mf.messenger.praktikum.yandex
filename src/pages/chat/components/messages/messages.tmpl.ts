const template = `<header class="messages-header relative d-flex justify-start align-center mx-5 my-4">
                        
                        <div class="avatar d-flex justify-center align-center mr-4">
                            <i class="fas fa-user-alt"></i>
                        </div>
                        <span class="name">{{title}}</span>
                        <button class="info" id="user-info">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                    </header>
                    <div class="messages-area d-flex flex-column justify-end mx-5">
                        
                    </div>
                    <div class="messages-controls relative d-flex justify-space-between align-center mx-5 my-4">
                        
                        <button class="clip mr-4" id="clip">
                            <i class="fas fa-paperclip"></i>
                        </button>
                        

                        <button class="send d-flex justify-center align-center ml-4 pa-2">
                            <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>`;

export {template};

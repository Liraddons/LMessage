document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('file-input').addEventListener('change', sendFiles);

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    if (message !== '') {
        appendMessage('text', message);
        messageInput.value = ''; // Очистить поле ввода
    }
}

function sendFiles(event) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        
        // Обработка изображений
        if (file.type.startsWith('image/')) {
            reader.onload = function(e) {
                appendMessage('image', e.target.result);
            };
            reader.readAsDataURL(file);
        }
        // Обработка аудио файлов
        else if (file.type.startsWith('audio/')) {
            reader.onload = function(e) {
                appendMessage('audio', e.target.result);
            };
            reader.readAsDataURL(file);
        }
        // Обработка всех остальных файлов
        else {
            reader.onload = function(e) {
                appendMessage('file', { name: file.name, url: e.target.result });
            };
            reader.readAsDataURL(file);
        }
    }
}

function appendMessage(type, content) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');

    if (type === 'text') {
        messageDiv.textContent = content;
    } else if (type === 'image') {
        const img = document.createElement('img');
        img.src = content;
        img.style.maxWidth = '100%';
        messageDiv.appendChild(img);
    } else if (type === 'audio') {
        const audio = document.createElement('audio');
        audio.src = content;
        audio.controls = true;
        messageDiv.appendChild(audio);
    } else if (type === 'file') {
        const link = document.createElement('a');
        link.href = content.url;
        link.download = content.name;
        link.textContent = `Download ${content.name}`;
        messageDiv.appendChild(link);
    }

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Прокрутка вниз
}

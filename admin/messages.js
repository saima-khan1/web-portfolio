const fetchMessage = async () => {
  await fetch('/api/messages')
    .then((response) => response.json())
    .then((data) => {
      data.forEach((details) => {
        const messageSection = document.getElementById('messages');
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message-container');

        const messageHeader = document.createElement('div');
        messageHeader.classList.add('message-header');
        const fromText = document.createElement('h2');
        fromText.textContent = `From: ${details.name}`;
        messageHeader.appendChild(fromText);
        const emailText = document.createElement('p');
        emailText.classList.add('email');
        emailText.textContent = `Email: ${details.email}`;
        messageHeader.appendChild(emailText);

        const readLink = document.createElement('a');
        readLink.classList.add('message-read');
        readLink.textContent = 'Read';
        messageHeader.appendChild(readLink);

        const messageContentDiv = document.createElement('div');
        messageContentDiv.classList.add('message-content');
        const messageLines = details.message.split('\n');
        messageLines.forEach((line) => {
          const messageParagraph = document.createElement('p');
          messageParagraph.textContent = line;
          messageContentDiv.appendChild(messageParagraph);
        });

        readLink.addEventListener('click', () => {
          if (readLink.textContent === 'Read') {
            readLink.textContent = 'Hide';
            messageContentDiv.classList.add('expanded');
          } else {
            readLink.textContent = 'Read';
            messageContentDiv.classList.remove('expanded');
          }
        });

        messageDiv.appendChild(messageHeader);
        messageDiv.appendChild(messageContentDiv);

        messageSection.appendChild(messageDiv);
      });
    })
    .catch((error) => {
      console.log('Error:', error);
    });
};

fetchMessage();

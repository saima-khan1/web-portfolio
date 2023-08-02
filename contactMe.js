const contact = document.getElementById('contact');
const contactRow = document.createElement('div');
contactRow.classList.add('contact-row');
const contactLeft = document.createElement('div');
contactLeft.classList.add('contact-left');
const contactRight = document.createElement('div');
contactRight.classList.add('contact-right');
contactLeft.innerHTML = `
<h1 class="contact-title">Contact me</h1>
<p><i class="fa fa-envelope"></i> saimakhan.6979@gmail.com</p>
<p><i class="fa fa-phone"></i> +46 (123) 456-789</p>
<div class="social-icons">
    
   
  <a href="https://www.facebook.com/your-profile" target="_blank"><i class="fab fa-facebook"></i></a>
  <a href="https://www.instagram.com/your-profile" target="_blank"><i class="fab fa-instagram"></i></a>
  <a href="https://www.linkedin.com/in/saima-khan-899857176/" target="_blank"><i class="fab fa-linkedin"></i></a>


</div>
<a href="path/to/your/cv.pdf" download>
  <button class="btn btn2"> Download CV <i class="fa fa-download"></i></button>
</a>

</div>`;
contactRight.innerHTML = `
<form id="contact-form">
                    <input type="text" name="name" id="contactName" placeholder="your name" required>
                    <input type="text" name="email" id="contactEmail" placeholder="your email" required>
                    <textarea name="message" id="contactMessage"  rows="6"  placeholder="your message" required></textarea>
                    <button type="submit" class="btn btn2">Submit</button>
                    </form>`;
contactRow.appendChild(contactLeft);
contactRow.appendChild(contactRight);
contact.appendChild(contactRow);

/*Post method funtion for contact form */

const contactForm = document.getElementById('contact-form');
const contactName = document.getElementById('contactName');
const contactEmail = document.getElementById('contactEmail');
const contactMessage = document.getElementById('contactMessage');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = contactName.value;
  const email = contactEmail.value;
  const message = contactMessage.value;

  fetch('/api/add/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, message }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response
      console.log(data);
      contactForm.reset();
    })
    .catch((error) => {
      console.log('Error posting messages:', error);
    });
});

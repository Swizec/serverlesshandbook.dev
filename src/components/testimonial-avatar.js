import React from 'react'

const Testimonial = ({text, author, authorImg}) => (
  <div>
    <h2>{text}</h2>
    <img src="../images/First_Web_Server.jpg" />
    <p>
      {author}  - {authorImg}
    </p>
  </div>
)

export default Testimonial;
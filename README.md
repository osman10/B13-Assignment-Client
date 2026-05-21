TutorFinder Client

Frontend client application for TutorFinder — a platform where students can easily find tutors based on hourly fees and connect for learning sessions.

🚀 Features
🎨 Modern and responsive UI
🔍 Browse and search tutors
⚡ Smooth animations with Framer Motion
🖼️ Interactive sliders using SwiperJS
🔔 Beautiful toast notifications with React Toastify
📱 Mobile-friendly design
🌐 Built with Next.js for fast performance
🛠️ Technologies Used
Next.js – React framework
SwiperJS – Slider & carousel functionality
Framer Motion – Animations and transitions
React Toastify – Toast notifications
CSS / Tailwind CSS – Styling
📦 Installation

Clone the repository:

git clone https://github.com/your-username/tutorfinder-client.git

Move into the project directory:

cd tutorfinder-client

Install dependencies:

npm install
⚙️ Environment Variables

Create a .env.local file in the root directory and add:

NEXT_PUBLIC_API_URL=http://localhost:5000
▶️ Run the Development Server
npm run dev


🎞️ SwiperJS Example
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
✨ Framer Motion Example
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
  TutorFinder
</motion.div>
🔔 React Toastify Example
import { toast } from 'react-toastify';

toast.success("Login Successful!");
📌 Future Improvements
Authentication system
Real-time messaging
Tutor booking system
Payment gateway integration
Dark mode support
👨‍💻 Author

Developed by Osman Goni

📄 License

This project is licensed under the MIT License.

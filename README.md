## 🚀 Demo

### Setup

Mac/Linux

```bash
chmod +x setup.sh
./setup.sh
```

Windows

```bash
./windows-setup.sh
```

### 🔑 API Key for Gemini

1. Go to [Get a Gemini Key in Google AI Studio](https://aistudio.google.com/app/apikey?_gl=1*1q04yez*_ga*MTcwMDY5MzEwMS4xNzUwMTU2NDg4*_ga_P1DBVKWT6V*czE3NTAyMjExNjMkbzYkZzEkdDE3NTAyMjE0NzQkajYwJGwwJGgxOTA3MDIwNzQ.) and generate an API key.
2. In your project, create a file named `.env` inside the `/backend` folder.
3. Paste the following line into `.env`, replacing with your actual key:

   ```env
   GEMINI_API_KEY=your-api-key-here
   ```

4. Save the file

### Running the app

yarn start

## Inspiration

The project was inspired by the growing accessibility gap in digital education, where many tools still fail to accommodate diverse learning needs. Students with hearing, visual, or cognitive challenges often face barriers in real-time classroom engagement. With the increasing reliance on technology in education, we saw an urgent need for a more inclusive solution. Our project addresses this by combining live transcription, text-to-speech, and AI support into a seamless, accessible experience.

## What it does

Our solution is an accessible EdTech overlay application that sits on top of a user’s screen and enhances communication between students and educators. It is designed to be inclusive, intuitive and assistive for individuals with various disabilities.
Our app provides:

1. Real-time speech-to-text transcription, allowing users with hearing impairments or attention challenges to read live spoken content as text.
2. Text-to-speech (TTS) playback, assisting users with visual impairments or reading difficulties by reading text aloud.
3. AI task helper, which can help users manage assignments, set reminders, and access learning resources efficiently—supporting students with executive function challenges such as ADHD.
4. A minimal, distraction-free interface with clear navigation, designed to reduce cognitive load and make core functions accessible in just a few steps.
5. Screen reader support, high-contrast display modes, adjustable font sizes, and captioning to cater to users with different levels of visual and hearing ability.
6. Movable and resizable overlay that remains visible and consistent across applications and tabs, offering flexibility without interrupting the learning workflow.
7. Output saving, with optional recording or transcript storage, compliant with local data privacy laws and institutional policies.

Our multifaceted approach ensures a more inclusive digital learning environment for all students, regardless of their unique accessibility needs.

## How we built it

Our application is built using a modern, privacy-conscious, and accessibility-focused tech stack that supports real-time performance, offline capabilities, and intelligent task assistance across platforms:

Frontend:

React powers the user interface, offering a clean, responsive design that emphasizes simplicity and inclusivity.

The interface includes a movable and resizable overlay, high-contrast modes, adjustable text size, and full keyboard navigation, all designed in line with accessibility standards to support users with visual, cognitive, or motor impairments.

Desktop Application Layer:

Electron packages the React frontend into a cross-platform desktop application, providing persistent window overlays that stay accessible across different tabs and applications—ideal for multitasking in educational contexts.

Backend:

Flask acts as the backend framework, handling API routes and facilitating communication between the UI, transcription engine, text-to-speech system, and AI assistant.

It also manages session state, user preferences, and saving or exporting data in compliance with privacy standards.

Real-time Transcription:

We use Vosk Speech Recognition Toolkit for offline, low-latency speech-to-text transcription.

Vosk supports 20+ languages and dialects, allowing continuous, large-vocabulary recognition with support for speaker differentiation and dynamic vocabulary adjustment.

It is resource-efficient and runs locally, ensuring privacy, speed, and reliability—key for use in classrooms and personal devices.

Text-to-Speech (TTS):

Kokoro enables natural-sounding text-to-speech playback, converting written content into audio to assist students with visual impairments, dyslexia, or reading fatigue.

Kokoro integrates into our backend seamlessly, allowing for smooth and low-latency audio output.

AI Task Assistant:

We incorporate Google’s Gemini (via API) as an inbuilt AI helper that assists students with organizing tasks, summarizing content, setting reminders, and answering academic queries.

This assistant is especially helpful for students with ADHD or executive functioning challenges, offering structure, automation, and intelligent support that reduces mental overhead and improves productivity.

The AI is context-aware and accessible through a minimal interface, providing assistance without distraction.

The application is designed to work almost entirely offline. Both the transcription and text-to-speech features run locally, with only the Gemini-powered AI assistant requiring an internet connection. This makes it ideal for secure environments, bandwidth-limited areas, and privacy-sensitive use cases.

## Accomplishments that we're proud of

## Challenges we ran into and what we learned

1. Integrating Real-Time Components Smoothly
   - Challenge: Synchronizing transcription, text-to-speech, and UI rendering in real time without noticeable delay or lag.
   - Learning: We learned to optimize backend processing and minimize latency using asynchronous communication between Flask and the frontend.
2. Working with Offline Speech Tools
   - Challenge: Vosk and Kokoro, while powerful, required fine-tuning for different environments and languages, especially for real-time streaming and natural playback.
   - Learning: We gained a deep understanding of offline speech systems and how to deploy models efficiently in a local setting.
3. Electron + React Integration
   - Challenge: Managing state and communication across Electron and React components, especially for persistent overlays and window control.
   - Learning: We learned how to structure cross-platform desktop apps with Electron effectively while preserving React’s reactivity and modularity.
4. Balancing Simplicity and Functionality
   - Challenge: Designing a UI that was minimal yet flexible enough to handle accessibility features like resizing, high contrast, and screen reader support.
   - Learning: We studied accessibility guidelines (like WCAG 2.1) and tested with real users, learning how to reduce cognitive load and improve UX for neurodiverse users.
5. Limited Resources for Accessibility Testing
   - Challenge: It was difficult to test with a wide range of real users with disabilities due to limited access.
   - Learning: We adapted by consulting accessibility documentation and simulating various impairments (e.g., using screen readers, keyboard-only navigation, or vision filters).
6. Incorporating an External AI (Gemini)
   - Challenge: Gemini requires an internet connection and careful prompt design to be helpful without overwhelming users.
   - Learning: We learned to manage asynchronous API calls gracefully and design the assistant to be context-sensitive, unobtrusive, and practical for users with executive functioning difficulties.
7. Maintaining Offline Compatibility
   - Challenge: Ensuring the app remained usable when disconnected from the internet, despite integrating an online service like Gemini.
   - Learning: We structured the app so that all core features (transcription, TTS, overlay) function fully offline, with clear messaging when AI features are unavailable.

What's next for IncludEd
While our current implementation lays a strong foundation for inclusive education technology, there are several key areas we plan to expand on to further enhance accessibility and usability:

1. AI-Powered Live Sign Language Interpretation

   We aim to integrate real-time sign language interpretation using AI-based motion capture and gesture recognition. Due to the complexity of training and deploying motion models, this feature could not be implemented within the limited timeframe of the hackathon, but it remains a core goal for making content accessible to deaf and hard-of-hearing students.

2. Learning Management System (LMS) Integration

   Future versions of the platform will include seamless integration with popular LMS platforms such as Moodle, Google Classroom, and Canvas. This will allow educators to embed assistive features directly into their teaching environments.

3. Multi-Language Support

   Although Vosk currently supports many languages, future development will focus on optimizing multilingual support, automatic language detection, and region-specific dialect handling to broaden global usability.

4. Mobile and Tablet Versions

   Expanding to iOS and Android platforms would bring the tool to mobile and tablet devices, making it even more accessible for on-the-go learning or students who rely solely on handheld devices.

5. Adaptive Personalization

   We plan to implement user profiling and AI-driven personalization to adapt features (e.g., font size, reading speed, contrast mode, assistant tone) based on individual needs or learning profiles, particularly benefiting neurodiverse users.

6. Accessibility Compliance

   In the long term, we will ensure deeper compliance with global accessibility frameworks such as **WCAG 2.2**, **Section 508 (US)**, and **EN 301 549 (EU)**, to facilitate institutional deployment in schools and universities around the world.

These improvements will allow the tool to scale effectively and offer even more comprehensive support to diverse learners in a wide range of educational environments.

### 🙏 Acknowledgements

This project is built using the NextJS-Electron-Boilerplate by DarkGuy10.
Licensed under the MIT License.

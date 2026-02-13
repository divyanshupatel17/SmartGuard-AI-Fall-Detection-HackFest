# SmartGuard: Unobtrusive Fall Detection for Elderly

| | |
|---|---|
| **Project Name** | SmartGuard |
| **Hackathon** | HackFest 2026 - HealthCare Hackathon |
| **Organizer** | ISBD Labs |
| **Hackathon URL** | [Event Page](https://i-venture.org/hackfest-2026/) |
| **Team Name** | SmartGuard |
| **Team Lead** | Divyanshu Patel |

## 🤖 About The Idea
**SmartGuard** is a passive fall detection system that uses smartphone cameras and AI-powered pose estimation to alert caregivers instantly of elderly falls, **WITHOUT** requiring them to wear any device. It addresses the high refusal rate (70%) of wearable solutions due to discomfort and stigma.

### 🚩 The Problem
- **High Risk**: 500,000+ elderly Indians fall annually, leading to 100,000+ hospitalizations.
- **Adoption Gap**: Existing wearable solutions have <30% adoption because elderly find them uncomfortable, stigmatizing, or hard to remember.
- **Privacy**: Families worry about privacy with camera-based solutions.

### 💡 The Solution
1.  **Non-Intrusive Detection**: Uses the smartphone's camera and **MediaPipe Pose** estimation to monitor the skeleton in real-time.
2.  **Privacy-First**: All processing happens **on-device**. No video is streamed or stored. Works offline.
3.  **Instant Alerts**: Detects sudden falls (height drop + acceleration) and sends immediate alerts via WhatsApp/SMS to caregivers.
4.  **Zero Cost**: Leverages existing smartphones (₹0 hardware cost) vs. expensive wearables.

## 🛠️ Technology Stack
-   **Mobile**: React Native, Expo
-   **AI/Vision**: MediaPipe Pose Estimation, TensorFlow.js, OpenCV
-   **Backend**: Python, Flask, Firebase (Realtime DB, Auth)
-   **Alerts**: Twilio API (WhatsApp/SMS)

---
> *No Wearables. Just Smartphone. Just Safety.*

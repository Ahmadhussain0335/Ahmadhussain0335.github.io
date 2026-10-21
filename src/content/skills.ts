import type { SkillGroup } from "./types";

export const skillGroups: SkillGroup[] = [
  {
    title: "Android",
    skills: ["Kotlin", "Java", "Jetpack Compose", "Coroutines & Flow", "ViewModel", "Room", "WorkManager", "DataStore", "Paging 3", "CameraX", "Material Design 3", "ProGuard / R8"],
  },
  {
    title: "Flutter",
    skills: ["Dart", "BLoC", "GetX", "Provider", "Platform Channels", "CustomPainter / Canvas", "Flutter DevTools", "Responsive & adaptive UI"],
  },
  {
    title: "iOS",
    skills: ["Swift", "SwiftUI", "UIKit", "async/await", "Combine", "XCTest", "Xcode"],
  },
  {
    title: "Architecture",
    skills: ["Clean Architecture", "MVVM", "MVI", "Repository Pattern", "Modular Architecture", "SOLID", "Hilt", "Dagger 2", "Koin"],
  },
  {
    title: "IoT & Automotive",
    skills: ["Bluetooth Low Energy", "GATT", "Secure pairing", "OTA firmware updates", "CAN Bus", "J1939", "OBD-II", "nRF Mesh", "MQTT", "Device provisioning"],
  },
  {
    title: "Networking & Security",
    skills: ["REST", "GraphQL", "WebSocket", "Socket.IO", "Retrofit / OkHttp", "OAuth 2.0", "JWT", "SSL Pinning", "Encrypted storage"],
  },
  {
    title: "Persistence",
    skills: ["Room", "SQLite", "Drift", "Hive", "Realm", "Core Data", "Schema migrations", "Offline-first"],
  },
  {
    title: "Testing & Quality",
    skills: ["JUnit", "Mockito", "MockK", "Espresso", "UI Automator", "Compose UI Testing", "Flutter widget & integration tests", "TDD", "LeakCanary", "Android Profiler"],
  },
  {
    title: "Cloud & Backend",
    skills: ["Firebase (FCM, Auth, Crashlytics, Analytics, Remote Config)", "AWS Cognito", "AWS Amplify", "Stripe", "Google Maps SDK"],
  },
  {
    title: "Release & CI/CD",
    skills: ["Fastlane", "GitHub Actions", "GitLab CI", "Jenkins", "Gradle", "Code signing", "Google Play Console", "App Store Connect", "Phased rollouts"],
  },
];

/** Listed in the CV but not yet used in a shipped project. */
export const exploring = ["Kotlin Multiplatform", "Compose Multiplatform"];

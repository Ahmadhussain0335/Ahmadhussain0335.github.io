import type { Experience } from "./types";

/** In-page anchor for a company's timeline entry, e.g. `experience-mrs-technologies`. */
export function experienceAnchor(company: string) {
  return `experience-${company.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
}

export const experience: Experience[] = [
  {
    company: "MRS Technologies",
    location: "Islamabad, Pakistan",
    domain: "Automotive, industrial electronics and connected IoT products",
    roles: [{ title: "Senior Software Engineer", period: "Apr 2021 – Present" }],
    highlights: [
      "Architect and deliver four production mobile applications for automotive and industrial IoT products, using Flutter/Dart and native Android (Kotlin, Jetpack Compose) on Clean Architecture and MVVM.",
      "Built NX NextHMI, a Flutter vehicle gateway whose UI is generated at runtime from XML device configuration, with real-time BLE/CAN communication bridged through Android and iOS platform channels.",
      "Designed and maintain the BLE connectivity layer: GATT services, secure pairing, reconnection handling and OTA firmware updates, carrying CAN/J1939, OBD-II and nRF Mesh traffic between apps and embedded devices.",
      "Implemented MQTT publish/subscribe for bidirectional real-time telemetry between mobile apps, IoT gateways and connected hardware.",
      "Integrated AWS Cognito and AWS Amplify for OAuth 2.0 authentication, device provisioning and cloud-connected IoT workflows.",
      "Own Google Play and App Store releases end to end: code signing, versioning, phased rollouts and automated builds with Fastlane and GitHub Actions.",
      "Authored and maintain 3,000+ automated unit, widget and UI tests (JUnit, Mockito, Espresso, Flutter test tooling) and promote TDD, SOLID, code review standards and CI/CD across the team.",
    ],
    tech: [
      "Flutter",
      "Dart",
      "Kotlin",
      "Jetpack Compose",
      "BLE / GATT",
      "CAN / J1939",
      "OBD-II",
      "nRF Mesh",
      "MQTT",
      "AWS Cognito",
      "Fastlane",
      "GitHub Actions",
    ],
    projectSlugs: ["nx-nexthmi", "connected-logger-gateway", "mtronic", "mafell"],
  },
  {
    company: "AI Nexus Healthcare",
    location: "Remote, United States",
    domain: "Telemedicine and remote patient monitoring",
    roles: [{ title: "Senior Mobile Developer", period: "Aug 2022 – Mar 2024" }],
    highlights: [
      "Delivered Mia Vitals, a Flutter telemedicine application with 10,000+ active users, built on BLoC and released on Google Play and the App Store.",
      "Implemented real-time biometric monitoring from camera frame streaming, with CameraX and Socket.IO feeding live clinician dashboards.",
      "Secured patient data in transit with SSL certificate pinning, encrypted REST APIs and JWT authentication to support healthcare privacy requirements.",
      "Profiled and optimised the app with Flutter DevTools, reducing memory usage and load times, and kept unit, widget and integration test coverage above 80%.",
      "Integrated Stripe payments with fraud-prevention rules, and Google Maps with custom geofencing for location-aware features.",
    ],
    tech: [
      "Flutter",
      "Dart",
      "BLoC",
      "Socket.IO",
      "CameraX",
      "Stripe",
      "Firebase",
      "Google Maps",
      "SSL Pinning",
      "JWT",
    ],
    projectSlugs: ["mia-vitals"],
  },
  {
    company: "Eikon7 Creative",
    location: "Islamabad, Pakistan",
    domain: "Digital products, food delivery and consumer applications",
    roles: [{ title: "Team Lead, Mobile Development", period: "Oct 2018 – Apr 2021" }],
    highlights: [
      "Led a team of five engineers delivering the FoodRunner ecosystem of Customer, Rider and Restaurant apps, built in native Android (Java) with MVVM.",
      "Managed the release lifecycle: app signing, store listing optimisation, phased rollouts, feature flags through Firebase Remote Config and hotfix management.",
      "Integrated JazzCash, Easypaisa and Bank Alfalah payments, an in-app wallet and an automated rider salary disbursement engine.",
      "Rolled out Firebase FCM, Authentication, Crashlytics, Analytics and Remote Config, with monitoring dashboards and fraud-detection workflows.",
      "Mentored junior developers through code reviews, pair programming and architecture sessions, and defined team standards for MVVM, Clean Architecture, testing and releases.",
    ],
    tech: ["Java", "Android", "MVVM", "Google Maps SDK", "Socket.IO", "Firebase", "Payment gateways"],
    projectSlugs: ["foodrunner"],
  },
  {
    company: "Codemaze (Pvt.) Ltd",
    location: "Rawalpindi, Pakistan",
    domain: "Consumer Android applications",
    roles: [{ title: "Junior Android Developer", period: "May 2017 – Oct 2018" }],
    highlights: [
      "Built consumer Android apps on REST APIs including Google Maps, YouTube and Facebook Graph, using Retrofit 2 and OkHttp 3.",
      "Implemented Firebase Cloud Messaging, background services, AdMob and in-app purchases.",
      "Built XML-based Android interfaces and local persistence with Room and SQLite, including schema migrations across releases.",
      "Configured ProGuard/R8 shrinking and obfuscation for production builds.",
    ],
    tech: ["Java", "Android", "Retrofit 2", "OkHttp 3", "Room", "SQLite", "FCM", "ProGuard / R8"],
  },
];

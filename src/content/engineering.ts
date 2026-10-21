import type { EngineeringNote } from "./types";

export const engineeringPrinciples: EngineeringNote[] = [
  {
    label: "Clean Architecture & MVVM",
    detail: "Clear separation between UI, domain and data layers, with dependency injection (Hilt, Dagger, Koin) so features stay replaceable and testable.",
  },
  {
    label: "Test-driven delivery",
    detail: "Unit, widget and UI tests written alongside features, with 3,000+ automated tests authored across Flutter and native Android projects.",
  },
  {
    label: "Reliable device communication",
    detail: "BLE connections designed around GATT services, secure pairing, reconnection handling and OTA updates, with CAN and MQTT on top.",
  },
  {
    label: "Mobile security",
    detail: "SSL certificate pinning, JWT and OAuth 2.0 authentication, encrypted local storage and R8 obfuscation for production builds.",
  },
  {
    label: "Release engineering",
    detail: "Automated builds with Fastlane and GitHub Actions, managed code signing, versioning and phased rollouts on both stores.",
  },
  {
    label: "Performance",
    detail: "Profiling with Flutter DevTools, Android Profiler and LeakCanary; Crashlytics and ANR analysis to find and fix production issues.",
  },
];

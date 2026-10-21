import type { OpenSourcePackage, OpenSourceRepo } from "./types";

/**
 * Sourced from the GitHub READMEs and the npm / pub.dev registry pages
 * (checked Oct 2026). No download counts or stars: they are small and go stale.
 */
export const packages: OpenSourcePackage[] = [
  {
    name: "ble_keeper",
    kind: "Flutter plugin",
    status: "Beta",
    summary:
      "Keeps a BLE peripheral connected while a Flutter app is in the background, after the OS kills it and after the phone reboots, on Android and iOS, and reports when the OS blocks it instead of failing silently.",
    highlights: [
      "Android: a connectedDevice foreground service owns the GATT connections and restarts after process death, reboot and app updates.",
      "iOS: Core Bluetooth state restoration, so iOS keeps the connection and relaunches the app in the background.",
      "Events reach a background handler in a headless Flutter engine when no UI is running.",
      "Tested on real hardware with a documented checklist: Samsung Galaxy A53 (Android 16) and iPhone 13 (iOS 26.6).",
    ],
    tech: ["Flutter", "Dart", "Kotlin", "Swift", "BLE / GATT", "Core Bluetooth", "Foreground service"],
    license: "BSD-3-Clause",
    links: {
      github: "https://github.com/Ahmadhussain0335/ble_keeper",
      pubDev: "https://pub.dev/packages/ble_keeper",
    },
    install: ["flutter pub add ble_keeper"],
  },
  {
    name: "can_bus_toolkit",
    kind: "Flutter plugin",
    summary:
      "Connects a Flutter app on Android to USB CAN adapters over OTG to monitor and send frames, log in candump format and run OBD-II, UDS and DBC decoding. It grew out of my Android CANBus OTG Debugger.",
    highlights: [
      "PEAK PCAN-USB, tested on a 250 kbit/s bench on Android 16, plus experimental SLCAN (CANable) and gs_usb (candleLight) adapters.",
      "ISO-TP, OBD-II (SAE J1979) and UDS (ISO 14229) clients in pure Dart, with bitrate and addressing detection that listens before it transmits; services that change ECU state need an explicit opt-in.",
      "DBC parsing with Intel and Motorola byte order and multiplexed signals, and candump logging from a connectedDevice foreground service.",
      "A virtual CAN bus and an OBD/UDS ECU simulator, so apps can be built and tested without hardware.",
    ],
    tech: ["Flutter", "Dart", "Kotlin", "USB OTG", "CAN bus", "ISO-TP", "OBD-II", "UDS", "DBC"],
    license: "MIT",
    links: {
      github: "https://github.com/Ahmadhussain0335/can_bus_toolkit",
      pubDev: "https://pub.dev/packages/can_bus_toolkit",
    },
    install: ["flutter pub add can_bus_toolkit"],
  },
  {
    name: "compliance_kit",
    kind: "Flutter & Dart packages",
    status: "Beta",
    summary:
      "Privacy and security controls for Flutter apps that have to meet GDPR, the Cyber Resilience Act, EN 18031 and OWASP MASVS: a PII-redacting logger, GDPR consent, data export and deletion, and app integrity checks, all recording into one audit trail.",
    highlights: [
      "A logger that redacts emails, phone numbers, tokens, API keys, card numbers and IBANs before they reach logs or crash reports; pure Dart, so it also runs on servers.",
      "Granular consent with policy versioning and an accessible consent UI, plus \u201cexport my data\u201d and \u201cdelete my account\u201d.",
      "Play Integrity and App Attest without Firebase, with a reference Dart server that verifies the tokens.",
      "Split into core, logger, GDPR and integrity packages with one umbrella package, so apps add only what they need.",
    ],
    tech: ["Flutter", "Dart", "Kotlin", "Swift", "GDPR", "Play Integrity", "App Attest", "OWASP MASVS"],
    license: "MIT",
    links: {
      github: "https://github.com/Ahmadhussain0335/compliance_kit",
      pubDev: "https://pub.dev/packages/compliance_kit",
    },
    install: ["flutter pub add compliance_kit:^0.1.0-beta.1"],
  },
  {
    name: "mobile-dev-kit",
    kind: "Agent Skills + CLI",
    summary:
      "An EU-ready set of 19 Agent Skills that gives Android, iOS and Flutter teams one standard for code review, security, compliance and release, installable in every major AI coding tool.",
    highlights: [
      "Skills for code review, OWASP MASVS v2 security, accessibility (WCAG 2.2, EN 301 549), CI/CD, store release, testing and performance.",
      "EU compliance gap reports for the Cyber Resilience Act, RED with EN 18031, GDPR and the European Accessibility Act.",
      "Connected-device guidance most packs skip: BLE GATT queues, MTU, bonding, reconnects, framing with CRC and safe firmware updates.",
      "Works in Claude Code, Codex, Gemini CLI, GitHub Copilot, Cursor, Windsurf, Antigravity and ChatGPT, with evals and a format validator.",
    ],
    tech: ["Agent Skills", "Claude Code", "Kotlin", "Swift", "Dart", "OWASP MASVS", "CRA", "EN 18031", "Node.js CLI", "Dart CLI"],
    license: "MIT",
    links: {
      github: "https://github.com/Ahmadhussain0335/mobile-dev-kit",
      npm: "https://www.npmjs.com/package/mobile-dev-kit",
      pubDev: "https://pub.dev/packages/mobile_dev_kit",
    },
    install: ["npx mobile-dev-kit install", "dart install mobile_dev_kit"],
  },
  {
    name: "trackplan",
    kind: "Code generator + CLI",
    summary:
      "Generates type-safe analytics code for Dart, Flutter and TypeScript from one YAML tracking plan, so a misspelled event or a missing parameter becomes a compile error instead of bad data.",
    highlights: [
      "One plan produces both languages with the same event names and payload keys, so dashboards see one event whichever app sent it.",
      "Vendor-neutral adapters for Firebase Analytics, PostHog, Mixpanel, Amplitude or your own API; the generated files have no dependencies.",
      "A CLI to validate the plan with file, line and column errors, fail CI when generated code is out of date, and write an event catalog.",
      "Shared test fixtures and a parity check keep the Dart and TypeScript tools in step; no network calls or telemetry.",
    ],
    tech: ["TypeScript", "Dart", "Node.js CLI", "Dart CLI", "YAML", "Code generation", "JSON Schema"],
    license: "MIT",
    links: {
      github: "https://github.com/Ahmadhussain0335/trackplan",
      npm: "https://www.npmjs.com/package/trackplan",
      pubDev: "https://pub.dev/packages/trackplan",
    },
    install: ["npm install --save-dev trackplan", "dart pub add dev:trackplan"],
  },
  {
    name: "EyeControl",
    kind: "Android app",
    summary:
      "Hands-free phone control with eye and head gestures. On-device ML Kit face detection turns blinks, winks, gaze and head pose into actions such as scroll, tap, back and volume through an Accessibility Service.",
    highlights: [
      "23 eye gestures mapped to 21 phone actions, with per-gesture mapping and a head-driven Face Pointer cursor.",
      "Guided calibration that measures personal blink and head-movement thresholds.",
      "All processing on the device: the app does not request the INTERNET permission.",
      "MVVM with Hilt, Room and DataStore; a camera foreground service keeps detection running outside the app.",
    ],
    tech: ["Kotlin", "Jetpack Compose", "ML Kit", "CameraX", "Accessibility Service", "Hilt", "Room"],
    links: {
      github: "https://github.com/Ahmadhussain0335/EyeMotionDetection",
    },
    screenshots: [
      { src: "/images/projects/eyecontrol/1.png", alt: "EyeControl home screen with eye tracking on, active gesture count and feature shortcuts", width: 1080, height: 2400 },
      { src: "/images/projects/eyecontrol/2.png", alt: "EyeControl gesture mapping list with blink, wink and gaze gestures assigned to actions", width: 1080, height: 2400 },
    ],
  },
];

export const repos: OpenSourceRepo[] = [
  {
    name: "Android-CANBus-OTG-Debugger",
    description: "Android application that interfaces with CAN Bus hardware over USB OTG to monitor, decode and debug CAN messages in real time.",
    language: "Kotlin",
    href: "https://github.com/Ahmadhussain0335/Android-CANBus-OTG-Debugger",
  },
  {
    name: "android-dev-playbook",
    description: "Android developer playbook in 88 Markdown files covering Kotlin, Jetpack Compose, architecture, testing, CI/CD, security and release.",
    href: "https://github.com/Ahmadhussain0335/android-dev-playbook",
  },
  {
    name: "sendmoneyapplication",
    description: "Kotlin money-transfer sample on MVVM and Jetpack Compose, with login and transaction history.",
    language: "Kotlin",
    href: "https://github.com/Ahmadhussain0335/sendmoneyapplication",
  },
];

# Professional Biography

I am a software engineer focused on tooling, platform engineering, automation, and embedded development infrastructure. My strongest areas are legacy compatibility problem-solving, CI/CD automation refactoring, and turning manual engineering workflows into reusable tools.

What distinguishes my work is not just implementation, but how I approach technical decisions. I usually start by tracing a complex issue back to its root cause, then decide whether the right response is a local fix, a workflow redesign, or an architectural change.

One representative example was the AutoOpTune view project at Andes Technology. The product had to support both CentOS 7.4 and Ubuntu 20.04, but no official JCEF binary was compatible with both. I rebuilt the build environment in Docker, manually compiled JCEF, and shipped the feature across both platforms without dropping compatibility commitments.

The same mindset shaped my CI/CD automation work. When GUI automation tests repeatedly failed with `component not found` errors, I traced the issue to a synchronization gap between the test framework and the application's GUI rendering cycle. Instead of patching individual scripts, I redesigned the execution flow around local Jenkins Agent execution and explicit synchronization, removing a recurring source of pipeline instability.

I am also strongest when a problem can be made more scalable through better abstractions or tooling. In Eclipse CDT-related development, I restructured the chip profile model into a layered `TAP > target > core` abstraction so the system could represent more complex SoC topologies and multi-core debugging scenarios. In another case, I built a parser that converted CSR definitions from the AndeStar V5 SPA specification into JSON descriptors, GDB target descriptions, and C header files, reducing a five-day manual task to minutes — and later spec revisions only require rerunning the script.

Outside of my main work, I also build full-stack tools to explore new workflows. In a personal side project, I designed an offline-first PWA, integrated multiple model provider APIs with Function Calling, and built an AI agent workflow that can navigate pages, create trips, and complete geocoding tasks programmatically. I also embedded AI parsing into the document import flow — users upload PDF, Excel, or Word files, and the model extracts structured fields directly into the system, replacing the per-format parsers I would otherwise have written. For me, AI's value is freeing up time from mechanical exploration and information gathering, so I can stay focused on architecture decisions and root-cause analysis.

I am looking for roles where technical depth and execution both matter, especially in tooling, platform engineering, debugging infrastructure, automation, or other engineering environments where systems need to be maintainable, extensible, and reliable over time.

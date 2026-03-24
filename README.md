# AI Game Master

A personalized text-based RPG adventure powered by the Gemini API.

## Outline

1.  **Home Screen**:
    *   Welcomes the player to the AI Game Master experience.
    *   Presents 3 featured scenarios (e.g., Cyberpunk Heist, Fantasy Quest, Sci-Fi Exploration) to jump right into the action.
    *   Provides a "Browse Gallery" option to see more scenarios and genres.

2.  **Gallery Screen**:
    *   Displays a grid of various scenarios and genres.
    *   Allows the player to select a specific setting for their adventure.

3.  **Game Screen**:
    *   The core chat interface where the adventure unfolds.
    *   **Initialization**: Upon starting, the app uses the Gemini API to generate the base context and an immediate quest hook based on the chosen scenario.
    *   **Gameplay Loop**: The player types their actions or responses. The AI Game Master narrates the outcome and presents the next event.
    *   **AI Constraints**: The Game Master is instructed to keep messages short (~5 sentences) and always end with a situation requiring the player's reaction, ensuring high engagement.

## Tech Stack
*   React 19
*   Tailwind CSS v4
*   @google/genai SDK (Gemini 3.1 Flash)
*   Framer Motion (for transitions)
*   React Markdown (for rendering AI responses)

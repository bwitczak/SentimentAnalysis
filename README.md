# Sentiment Analysis Application

This application allows users to analyze the sentiment of text using the Hugging Face Inference API. Users can input text, and the application will display whether the sentiment is positive, neutral, or negative.

## Technologies Used

- **Svelte 5** with TypeScript for the frontend framework
- **SCSS** for styling
- **pnpm** as the package manager
- **Husky** for Git hooks
- **Vitest** for unit testing
- **Hugging Face Inference API** for sentiment analysis

## Getting Started

### Prerequisites

- Node.js (version 20 or higher recommended)
- pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:bwitczak/SentimentAnalysis.git
   cd SentimentAnalysis
   ```

1.5 (Optional) GraphQL version

To get GraphQL version please checkout to `main-graphql`

```bash
   git switch main-graphql
```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env` file or rename `.env.example` in the root directory and add your Hugging Face API token:

   ```
   HF_ACCESS_TOKEN=your_api_key_here
   ```

   To get Hugging Face API token go to tab “Settings” → “Access Tokens" → "Create new token"

### Running the Application

Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:5173/` (or another port if 5173 is already in use).

### Building for Production

```bash
pnpm build
```

The built application will be in the `dist` directory.

### Running Tests

```bash
pnpm test
```

## Project Structure

```
/
├── src/
│   ├── lib/
│   ├── ├── components/        # Reusable Svelte components
│   ├── ├── consts/            # Constant variables
│   ├── ├── icons/             # Icons as Svelte components
│   ├── ├── logic/             # Business logic
│   ├── ├── scss/              # SCSS files
│   ├── ├── stores/            # Svelte stores
│   ├── ├── types/             # Typescript types
│   ├── routes/                # Pages (routing)
│   ├── tests/                 # Test files
├── static/                    # Static assets
└── ... configuration files
```

## Implementation Challenges

### Create modal unit tests

- **Challenge**: Manipulation of modalState to open a modal
- **Solution**: Mock modalState

### Create +server.ts unit tests

- **Challenge**: Problem with mocking HTTP
- **Solution**: Conversation with AI

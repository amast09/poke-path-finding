# Pokemon Path Finder

An app to help Pokemon find their way home.

## Getting Started

1 - Install node 15.0.1 (instructions that follow use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash
```

```
nvm install
```

```
nvm use
```

2 - Install dependencies

```
npm install
```

## To develop locally against the app

```
npm run dev
```

Open http://localhost:3000 in your browser

## Test the App

```
npm test
```

## Build the App for Production

```
npm run build
```

Assets produced assume the app is being hosted at `/`

## Things that I could use more time on

- Adding component tests for Map Size Select component
- Adding component tests for Action Button component
- Adding component tests for Helper Text component
- Reworking PathFinderState in the Path Finder component into a more testable structure (currently more logic than I like)
- Directory structure isn't perfect, might have been nicer to just have it completely flat but also, :shrug:

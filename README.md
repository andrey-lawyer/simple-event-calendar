# Event Calendar App

## Table of Contents

- [Introduction](#introduction)
- [Requirements](#requirements)
- [Technologies](#technologies)
- [Installation](#installation)
- [Structure](#structure)
- [Deployment](#deployment)

## Introduction

This project is a simple event calendar application built with Next.js, Redux, and MongoDB. It allows users to view, create, update, and delete events on a calendar with specific styling and features.

## Requirements

- Conflicting events have the same width and should not overlap.
- The maximum event width is 200px.
- Event background color is #E2ECF5 with #6E9ECF border color.
- Event font is Open Sans, 14px.
- Calendar time font is Open Sans with around 200 font weight, 16px large, 12px small.
- Titles should be one line and should not overflow outside the calendar-event box. If the title is too long to fit, ellipsis (“…”) should be used.
- Events will be between 8 am to 5 pm.
- Calendar will cover only one same day.
- Users can add/remove events from their calendar.
- User should be able to log in and persist his inputs between logins.
- Calendar should be rendered on the server with all events.

## Technologies

- **Next.js Framework:**: A React framework for server-side rendering.
- **Redux:** State management for predictable state changes.
- **MongoDB:** MongoDB: A NoSQL database for storing event data.
- **Tailwind CSS:** A utility-first CSS framework for styling.
- **Formik and Yup:** Used for handling forms and form validation.
- **Axios:** A popular HTTP client for making requests to external APIs.

## Installation

1. **Clone the repo**

```bash
https://github.com/andrey-lawyer/simple-event-calendar
```

2. **Install dependencies** It's recommended to use npm:

```
npm install
```

3. **Create a .env file**

## Structure

The project is structured as follows:

- _components:_ React components used throughout the application.
- _hooks:_ Custom React hooks.
- _pages:_ Next.js pages representing different routes.
- _public:_ Static assets such as images and styles.
- _services:_ Business logic and external service interactions.
- _types_: TypeScript types.

## Deployment

The project is currently deployed on [Vercel](https://simple-event-calendar-gilt.vercel.app)

Feel free to check the live deployment and interact with the application.

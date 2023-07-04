# ![Screenshot 1](assets/Header-Logo.png)

Swapiday is a mobile application that allows travellers to swap their holiday homes with others for free. It helps users save money on accommodations and provides an opportunity to explore different cities and countries.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Video Presentation](#video-presentation)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Many travellers face the challenge of finding affordable accommodations while visiting new cities. Swapiday aims to solve this problem by providing a platform for users to exchange their homes with other travelers for the duration of their holiday. This allows users to save money on accommodations and explore new destinations.

This repository contains the source code for the Swapiday mobile application, built using JavaScript and React Native with Expo. The backend is powered by Firebase, providing a secure and scalable infrastructure for user management and data storage.

## Features

- Browse a list of available houses sorted by rating and positive reviews.
- Use the search option to find houses based on your desired destination and dates.
- View detailed information about each house, including a description, photo gallery, and location on a map.
- Explore the host's profile and connect with them through the in-app chat feature.
- Create a new user account or log in to an existing one.
- Leave reviews and ratings for houses and their owners.
- Easily manage your account, including deleting your account if needed.

## Tech Stack

- <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React Native Logo" height="20px" style="background-color:white;"> React Native (Frontend)
- <img src="https://firebase.google.com/downloads/brand-guidelines/PNG/logo-standard.png" alt="Firebase Logo" height="20px" style="background-color:white;"> Firebase (Backend)
- <img src="https://play-lh.googleusercontent.com/algsmuhitlyCU_Yy3IU7-7KYIhCBwx5UJG4Bln-hygBjjlUVCiGo1y8W5JNqYm9WW3s" alt="Expo Logo" height="20px"> Expo
- <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg" alt="JavaScript Logo" height="20px"> JavaScript

## Installation

To run the Swapiday app locally, follow these steps:

1.  Clone this repository to your local machine.
2.  Install Node.js and npm if you haven't already.
3.  Install Expo CLI globally by running `npm install -g expo-cli`.
4.  Navigate to the project's root directory and run `npm install` to install the dependencies.
5.  Set up a Firebase project and obtain your Firebase configuration details.
6.  Create a `.env` file in the root directory and add your Firebase configuration as environment variables. For example:

            // .env file

            API_KEY=your-api-key
            AUTH_DOMAIN=your-auth-domain
            PROJECT_ID=your-project-id
            ...

7.  Run `npx expo start` to start the Expo development server. If you encounter any connection issues, you can try running `npx expo start --tunnel`. This option sets up a secure tunnel to your local development server, which can help with network connectivity on certain computers.
8.  Scan the QR code with the Expo Go app on your mobile device or use an Android/iOS emulator to launch the app.

## Usage

Once the Swapiday app is running, you can navigate through the various screens to browse available houses, search for specific destinations, view house details, interact with hosts, and manage your account.

Feel free to explore the app's functionality and provide feedback or report any issues through GitHub's issue tracking system.

## Video Presentation

Check out our video presentation to get a closer look at Swapiday:

[![Swapiday Video Presentation](https://i.ytimg.com/an_webp/Wwwftd60e6k/mqdefault_6s.webp?du=3000&sqp=CNOykKUG&rs=AOn4CLDcRebw4Ln6hMznLv6asG3qRDjZaQ))](https://youtu.be/Wwwftd60e6k)

## Screenshots

Here are some screenshots of the Swapiday app:

<p align="center">
  <img src="screenshots/Screenshot1.jpg" alt="Screenshot 1" width="150px">
  <img src="screenshots/Screenshot2.jpg" alt="Screenshot 2" width="150px">
  <img src="screenshots/Screenshot3.jpg" alt="Screenshot 3" width="150px">
  <img src="screenshots/Screenshot11.jpg" alt="Screenshot 11" width="150px">
</p>
<p align="center">
  <img src="screenshots/Screenshot4.jpg" alt="Screenshot 4" width="150px"  style="vertical-align: top;">
  <img src="screenshots/Screenshot5.jpg" alt="Screenshot 5" width="150px"  style="vertical-align: top;">
  <img src="screenshots/Screenshot6.jpg" alt="Screenshot 6" width="150px"  style="vertical-align: top;">
  <img src="screenshots/Screenshot7.jpg" alt="Screenshot 7" width="150px" style="vertical-align: top;">
</p>

<img src="screenshots/Screenshot9.png" alt="Screenshot 9" style="background-color: white;">
<img src="screenshots/Screenshot10.jpg" alt="Screenshot 10">

#

## Swapiday was created by BYTE-BANDITS team as the final project for the Northcoders bootcamp, May 2023.

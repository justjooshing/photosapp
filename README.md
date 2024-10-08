**Unfortunately this project will be abandoned come March 31 2025 due to Google's changes to the PhotosLibrary API restricting access to images to user-selected and session only. [Read more here](https://developers.google.com/photos/support/updates)**

### Overview

PicPurge is a React Native app integrated with Google Photos API, enabling users to sort through similar photos via a swipe interface and see stats like delete rate and expected data savings. The app uses technologies like Expo, React Native, Tamagui, and ReactQuery, with socket.io for server communication.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/justjooshing/photosapp.git picpurge
   cd picpurge
   ```
2. Install dependencies:
   ```bash
   yarn
   ```
3. Run on the web:

   ```bash
   yarn web
   ```

   To run on Android via Android Studio, use:

   ```bash
   yarn android
   ```

   **Note**: The client URL must match the **Authorised Javascript Origins** set up in Google Cloud Console for Google login to work properly. \
   **Note**: Server addresses may also need to be updated in **api/axios/** under `base_url`.

4. **Google Photos API Setup**:

   - You need to configure your project in [Google Cloud Console](https://console.cloud.google.com/).
   - Add **Authorised Javascript Origins** and **Authorised Redirect URIs** to ensure Google login functions properly.

5. **Testing on Google Play**:
   - The app is in closed testing on Google Play and requires 20 testers for public release. To join, email `justjooshing@gmail.com`.

### Technologies

- **React Native / Expo**: For building cross-platform apps.
- **Tamagui**: UI styling framework.
- **ReactQuery**: For managing API state.
- **react-native-mmkv**: Cross-platform storage solution.
- **react-native-reanimated**: For animations and gesture handling.
- **socket.io**: For real-time communication with the backend.

### Common Issues

1. **Google Login Failing**: Make sure the client URL matches **Authorised Javascript Origins** in the Google Cloud Console.
2. **Tunnel Problems**: For Android testing, you may need a hosted API instead of a local tunnel.

### Contributing

Feel free to submit issues, feature requests, and pull requests. Contributions are welcome!

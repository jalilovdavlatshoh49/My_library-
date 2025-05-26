# Library App (React Native + Expo + TypeScript)

Frontend for Library System, fully compatible with [your-backend].

## Features

- Login & Registration (JWT)
- Book list, search (debounce), filter by genre, favorites (badge)
- Add/Edit/Delete book (admin only)
- Image upload with loading indicator
- Profile, logout
- Snackbar/toast for user feedback
- Modern UI with [React Native Paper](https://callstack.github.io/react-native-paper/)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set API URL:**
   - Edit `src/api/api.ts` and set `API_URL` to your backend URL (e.g. `http://192.168.1.5:5000`).

3. **Start the app:**
   ```bash
   npm start
   ```
   - Scan the QR code with Expo Go (Android/iOS), or open in emulator.

## Folder Structure

```
src/
  api/
  components/
  hooks/
  navigation/
  screens/
  store/
  App.tsx
```